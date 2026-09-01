/* Skybound local MVP extensions: deterministic simulation, progression and mobile lifecycle. */
(() => {
  'use strict';
  const SIM_VERSION = 'skybound-sim-2';
  const RNG_VERSION = 'lcg32-v1';
  const TICK_MS = 1000 / 60;
  const MAX_SIM_STEPS = 6;
  const WEEKLY_TEMPLATE = [
    {id:'weekly_runs',text:'Complete 12 partidas',goal:12,reward:120},
    {id:'weekly_height',text:'Alcance 900 m no total',goal:900,reward:140},
    {id:'weekly_coins',text:'Colete 60 fichas',goal:60,reward:100},
    {id:'weekly_journey',text:'Conquiste 3 metas de Jornada',goal:3,reward:130},
    {id:'weekly_daily',text:'Complete 2 desafios diários',goal:2,reward:110},
    {id:'weekly_duel',text:'Jogue 3 duelos locais',goal:3,reward:100},
    {id:'weekly_win',text:'Vença 1 duelo local',goal:1,reward:130},
    {id:'weekly_style',text:'Equipe um visual',goal:1,reward:70}
  ];
  function dayKey(){return new Date().toISOString().slice(0,10)}
  function weekKey(){const d=new Date(),day=(d.getUTCDay()+6)%7;d.setUTCDate(d.getUTCDate()-day);return d.toISOString().slice(0,10)}
  function mixSeed(...values){let value=2166136261;values.join(':').split('').forEach(char=>{value=Math.imul(value^char.charCodeAt(0),16777619)});return value>>>0}
  function ensureMetaState(){
    player.version=Math.max(2,Number(player.version)||1);
    player.missionClaimed=Array.isArray(player.missionClaimed)?player.missionClaimed:[];
    player.weeklyDate=player.weeklyDate||'';player.weekly=Array.isArray(player.weekly)?player.weekly:[];
    if(player.weeklyDate!==weekKey()||player.weekly.length!==WEEKLY_TEMPLATE.length){player.weeklyDate=weekKey();player.weekly=WEEKLY_TEMPLATE.map(m=>({...m,progress:0}));player.weeklyClaimed=[]}
    player.weeklyClaimed=Array.isArray(player.weeklyClaimed)?player.weeklyClaimed:[];
    player.badges=Array.isArray(player.badges)?player.badges:[];
    player.replays=Array.isArray(player.replays)?player.replays.slice(-10):[];
    player.pass={...{season:'horizonte-01',xp:0,level:1,claimed:[]},...(player.pass||{})};
    player.runSerial=Number.isFinite(player.runSerial)?player.runSerial:0;
    player.tutorialComplete=Boolean(player.tutorialComplete);
    player.rewarded=player.rewarded||{date:'',count:0};
  }
  function addProgress(id,amount){const mission=player.weekly.find(item=>item.id===id);if(mission)mission.progress=Math.min(mission.goal,mission.progress+amount)}
  function awardBadges(){[['first_flight','Primeiro voo',player.stats.runs>=1],['cloud_reader','Leitor de nuvens',player.best>=120],['sky_scout','Explorador celeste',player.unlockedStage>=2],['duelist','Duelo aceito',player.stats.duels>=1],['collector','Colecionador',player.owned.length>=3]].forEach(([id,name,earned])=>{if(earned&&!player.badges.some(b=>b.id===id))player.badges.push({id,name,at:new Date().toISOString()})})}
  function recordInput(r){const input=`${r.left?-1:r.right?1:0}:${Math.round(r.targetX/4)}`,last=r.inputs[r.inputs.length-1];if(last&&last.input===input)last.ticks+=1;else r.inputs.push({tick:r.tick,input,ticks:1})}
  function claimMission(id,weekly){const list=weekly?player.weekly:player.missions,claimed=weekly?player.weeklyClaimed:player.missionClaimed,mission=list.find(item=>item.id===id);if(!mission||mission.progress<mission.goal||claimed.includes(id))return;claimed.push(id);player.coins+=mission.reward;player.pass.xp+=12;player.pass.level=Math.min(50,Math.floor(player.pass.xp/100)+1);savePlayer();track('mission_progress',{mission:id,delta:mission.reward,origin:weekly?'weekly_claim':'daily_claim'});showToast(`+${mission.reward} fichas resgatadas.`);render()}

  const originalRenderHome=renderHome;
  renderHome=function enhancedRenderHome(){
    originalRenderHome();ensureMetaState();
    [...screen.querySelectorAll('.mission')].forEach((node,index)=>{const mission=player.missions[index];if(mission&&mission.progress>=mission.goal&&!player.missionClaimed.includes(mission.id))node.querySelector('div:nth-child(2)')?.insertAdjacentHTML('beforeend',`<button class="button small" style="margin-top:8px" data-claim-mission="${mission.id}">Resgatar +${mission.reward} ◆</button>`)});
    const ready=player.weekly.filter(m=>m.progress>=m.goal&&!player.weeklyClaimed.includes(m.id)).length;
    screen.insertAdjacentHTML('beforeend',`<section class="card" style="margin-top:14px"><div class="section-head" style="margin:0 0 9px"><h3>Rota semanal</h3><small>${player.weekly.filter(m=>m.progress>=m.goal).length}/8 metas</small></div>${player.weekly.slice(0,3).map(m=>`<p style="color:var(--muted);font-size:12px;margin-top:7px">${m.text} · ${Math.min(m.progress,m.goal)}/${m.goal}${m.progress>=m.goal&&!player.weeklyClaimed.includes(m.id)?` <button class="button small" data-claim-weekly="${m.id}">+${m.reward} ◆</button>`:''}</p>`).join('')}${ready?'<p style="margin-top:9px;color:var(--sun);font-size:12px">Há recompensas semanais prontas.</p>':''}</section><section class="card" style="margin-top:11px"><div class="section-head" style="margin:0 0 8px"><h3>Passe Horizonte</h3><small>nível ${player.pass.level}/50 · demo local</small></div><div class="progress"><i style="width:${player.pass.xp%100}%"></i></div><p style="margin-top:8px;color:var(--muted);font-size:12px">Trilha gratuita local; a trilha paga exige catálogo validado pelo backend.</p></section>`);
  };
  const originalRenderProfile=renderProfile;
  renderProfile=function enhancedRenderProfile(){originalRenderProfile();ensureMetaState();screen.insertAdjacentHTML('beforeend',`<div class="section-head"><h2>Conquistas</h2><small>${player.badges.length} desbloqueadas</small></div><div class="card">${player.badges.length?player.badges.map(b=>`<p style="margin-top:7px">✦ <b>${b.name}</b></p>`).join(''):'<p style="color:var(--muted);font-size:12px">Continue jogando para desbloquear suas primeiras conquistas.</p>'}</div><div class="section-head"><h2>Replays locais</h2><small>${player.replays.length}/10</small></div><div class="card"><p style="color:var(--muted);font-size:12px">Cada replay guarda seed, versão do gerador e entradas comprimidas. Eles são diagnósticos locais, não placar online.</p></div>`)};

  begin=function deterministicBegin(mode,stageIndex=0,phaseIndex=0,forcedSeed){
    ensureMetaState();if(mode==='journey'&&!player.tutorialComplete)mode='tutorial';
    let seed=forcedSeed;
    if(seed===undefined){if(mode==='daily')seed=dailySeed();else if(mode==='infinite'){player.runSerial+=1;seed=mixSeed('infinite',player.runSerial);savePlayer()}else seed=mixSeed(mode,stageIndex,phaseIndex,SIM_VERSION)}
    lastRunConfig={mode,stageIndex,phaseIndex,seed};screenMode='game';renderGameShell(mode,stageIndex);
    const canvas=document.getElementById('game');
    runtime={mode,stageIndex,phaseIndex,seed,generatorVersion:SIM_VERSION,rngVersion:RNG_VERSION,rand:seeded(seed),canvas,ctx:canvas.getContext('2d'),width:360,height:640,frame:0,tick:0,accumulator:0,camera:0,maxY:480,lastPlatformY:570,platforms:[],particles:[],coins:[],hazards:[],targetX:180,left:false,right:false,paused:false,score:0,collected:0,inputs:[],opponent:mode==='duel'?{progress:0}:null,player:{x:168,y:480,vx:0,vy:0,w:PLAYER_W,h:PLAYER_H}};
    runtime.platforms.push({x:125,y:570,w:110,h:13,type:'start',phase:0});generatePlatforms(22);track('run_start',{mode,stage:stageIndex,seed,generatorVersion:SIM_VERSION});lastFrame=performance.now();raf=requestAnimationFrame(loop);
  };
  const originalUpdate=update;
  update=function deterministicUpdate(dt){if(!runtime)return;runtime.tick+=1;recordInput(runtime);originalUpdate(dt);if(!runtime)return;const r=runtime;if(r.mode==='tutorial'&&r.score>=48)endRun('complete');if(r.mode==='journey'){const landed=r.platforms.find(pl=>Math.abs((r.player.y+r.player.h)-pl.y)<1&&r.player.vy<0);if(landed?.type==='elastic')r.player.vy=JUMP*1.14}};
  loop=function fixedStepLoop(now){if(!runtime)return;const elapsed=Math.min(250,Math.max(0,now-lastFrame));lastFrame=now;if(!runtime.paused){runtime.accumulator=Math.min(TICK_MS*MAX_SIM_STEPS,runtime.accumulator+elapsed);let steps=0;while(runtime&&runtime.accumulator>=TICK_MS&&steps<MAX_SIM_STEPS){update(1);if(runtime)runtime.accumulator-=TICK_MS;steps+=1}if(runtime)draw()}if(runtime)raf=requestAnimationFrame(loop)};
  const originalEndRun=endRun;
  endRun=function savedReplayEndRun(reason){
    if(!runtime)return;const r=runtime,replay={id:`${r.seed}-${Date.now()}`,seed:r.seed,mode:r.mode,stage:r.stageIndex,score:r.score,collected:r.collected,reason,generatorVersion:r.generatorVersion,rngVersion:r.rngVersion,ticks:r.tick,inputs:r.inputs};
    originalEndRun(reason);ensureMetaState();player.replays.push(replay);player.replays=player.replays.slice(-10);if(r.mode==='tutorial'&&reason==='complete')player.tutorialComplete=true;addProgress('weekly_runs',1);addProgress('weekly_height',r.score);addProgress('weekly_coins',r.collected);if(r.mode==='journey'&&reason==='complete')addProgress('weekly_journey',1);if(r.mode==='daily'&&reason==='complete')addProgress('weekly_daily',1);if(r.mode==='duel'){addProgress('weekly_duel',1);if(player.stats.wins>0)addProgress('weekly_win',1)}player.pass.xp+=Math.min(20,3+Math.floor(r.score/30));player.pass.level=Math.min(50,Math.floor(player.pass.xp/100)+1);awardBadges();savePlayer();
  };
  document.addEventListener('click',event=>{
    const action=event.target.closest('[data-action]')?.dataset.action;
    if(action==='retry'){event.preventDefault();event.stopImmediatePropagation();begin(lastRunConfig.mode,lastRunConfig.stageIndex,lastRunConfig.phaseIndex,lastRunConfig.seed);return}
    if(action==='rewarded-demo'){event.preventDefault();event.stopImmediatePropagation();ensureMetaState();if(player.rewarded.date!==dayKey())player.rewarded={date:dayKey(),count:0};if(player.rewarded.count>=1){showToast('Recompensa diária já usada.');return}player.rewarded.count+=1;player.coins+=10;savePlayer();track('ad_result',{placement:'result',mode:'demo',idempotencyKey:`rewarded:${dayKey()}`});showToast('Recompensa demo concedida.');return}
    const daily=event.target.closest('[data-claim-mission]');if(daily){claimMission(daily.dataset.claimMission,false);return}
    const weekly=event.target.closest('[data-claim-weekly]');if(weekly){claimMission(weekly.dataset.claimWeekly,true);return}
    const cosmetic=event.target.closest('[data-cosmetic]');if(cosmetic){addProgress('weekly_style',1);savePlayer()}
  },true);
  document.addEventListener('pointerup',()=>{if(runtime){runtime.left=false;runtime.right=false}});
  document.addEventListener('pointercancel',()=>{if(runtime){runtime.left=false;runtime.right=false}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&runtime&&!runtime.paused){runtime.paused=true;showToast('Partida pausada enquanto o app está em segundo plano.')}});
  window.addEventListener('blur',()=>{if(runtime&&!runtime.paused)runtime.paused=true});
  window.addEventListener('error',()=>{if(runtime){runtime.paused=true;showToast('A partida foi pausada com segurança.')}});

  // Jornada completa: seis capítulos com dez fases cada. A ordem de desbloqueio
  // é local e sequencial para manter o onboarding legível e sem monetização.
  function ensureJourney(){
    player.journey=player.journey||{};
    player.journey.completed=Array.isArray(player.journey.completed)?player.journey.completed:[];
    player.journey.stars=player.journey.stars&&typeof player.journey.stars==='object'?player.journey.stars:{};
  }
  function journeyKey(stage,phase){return `${stage}:${phase}`}
  function journeyProgress(){
    ensureJourney();
    const complete=new Set(player.journey.completed);
    let next=0;
    while(next<STAGES.length*10&&complete.has(journeyKey(Math.floor(next/10),next%10)))next+=1;
    return next;
  }
  function phaseGoal(stage,phase){return 60+stage*12+phase*5}
  const defaultJourneyRender=renderJourney;
  renderJourney=function campaignJourneyRender(){
    ensureJourney();
    const next=journeyProgress(),complete=new Set(player.journey.completed);
    const chapters=STAGES.map((stage,stageIndex)=>{
      const done=[...complete].filter(id=>id.startsWith(`${stageIndex}:`)).length;
      const phases=Array.from({length:10},(_,phaseIndex)=>{
        const flat=stageIndex*10+phaseIndex,key=journeyKey(stageIndex,phaseIndex),isDone=complete.has(key),unlocked=flat<=next;
        const stars=player.journey.stars[key]||0;
        return `<button class="tag" style="min-height:39px;justify-content:center;${isDone?'border-color:var(--mint);color:var(--mint)':''}" data-journey-phase="${stageIndex}:${phaseIndex}" ${unlocked?'':'disabled'} aria-label="${stage.name}, fase ${phaseIndex+1}${isDone?', concluída':''}">${isDone?`${'★'.repeat(stars||1)} ${String(phaseIndex+1).padStart(2,'0')}`:String(phaseIndex+1).padStart(2,'0')}</button>`;
      }).join('');
      return `<section class="card" style="margin-top:12px;background:linear-gradient(145deg,${stage.bg[0]},${stage.bg[1]})"><div style="display:flex;justify-content:space-between;gap:10px"><div><div class="eyebrow">Capítulo ${String(stageIndex+1).padStart(2,'0')}</div><h3 style="margin-top:5px">${escapeHtml(stage.name)}</h3><p style="color:rgba(255,255,255,.75);font-size:12px;margin-top:4px">${escapeHtml(stage.hazard)} · ${done}/10 fases</p></div><span class="tag">${done===10?'dominado':'rota'}</span></div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:7px;margin-top:13px">${phases}</div></section>`;
    }).join('');
    screen.innerHTML=`<div class="screen-title"><button class="back" data-action="home">‹</button><div><div class="eyebrow">Mapa de ascensão</div><h2>Jornada · ${next}/60</h2></div></div><p class="lede">Cada capítulo tem dez fases curtas, uma regra de navegação e metas de habilidade. Nenhuma fase ou meta exige compra.</p>${!player.tutorialComplete?'<div class="notice" style="margin-top:14px">A primeira tentativa é um tutorial seguro. Conclua-o para abrir a rota.</div>':''}${chapters}`;
  };
  const shellWithCampaign=renderGameShell;
  renderGameShell=function campaignGameShell(mode,stageIndex){
    shellWithCampaign(mode,stageIndex);
    if(mode==='journey'||mode==='tutorial'){
      const phase=lastRunConfig.phaseIndex||0;
      document.querySelector('.game-hud .stage-name')?.insertAdjacentHTML('afterend',`<small style="color:var(--muted);font-size:9px">${mode==='tutorial'?'TUTORIAL':'FASE '+(phase+1)+' · META '+phaseGoal(stageIndex,phase)+' m'}</small>`);
    }
  };
  const deterministicBegin=begin;
  begin=function campaignBegin(mode,stageIndex=0,phaseIndex=0,forcedSeed){
    deterministicBegin(mode,stageIndex,phaseIndex,forcedSeed);
    if(!runtime)return;
    runtime.phaseGoal=runtime.mode==='journey'?phaseGoal(stageIndex,phaseIndex):runtime.mode==='tutorial'?48:Infinity;
    runtime.dailyModifier=runtime.mode==='daily'?['Vento lateral','Plataformas frágeis','Gravidade leve'][runtime.seed%3]:null;
    runtime.hazards=runtime.hazards||[];
    if(runtime.dailyModifier)document.querySelector('.game-hud .stage-name')?.insertAdjacentHTML('afterend',`<small style="color:var(--coral);font-size:9px">${runtime.dailyModifier}</small>`);
  };
  const proceduralGenerate=generatePlatforms;
  generatePlatforms=function variedGenerate(count){
    const r=runtime,before=r?.platforms.length||0;
    proceduralGenerate(count);
    if(!r)return;
    const vocab=[['elastic','wind'],['elastic','fragile'],['fragile','alternating'],['conveyor','temporary'],['portal','gravity'],['rhythm','wind']][Math.min(5,r.stageIndex)];
    r.platforms.slice(before).forEach((platform,index)=>{
      if(platform.type==='moving')return;
      const roll=r.rand();
      if(roll<.12)platform.type=vocab[0];
      else if(roll<.22)platform.type=vocab[1];
      if(platform.type==='portal')platform.portalX=(platform.x+130+(index%2)*60)%300;
      if(platform.type==='conveyor')platform.direction=index%2?1:-1;
      if(r.stageIndex>0&&r.rand()<.14)r.hazards.push({x:Math.max(20,Math.min(340,platform.x+platform.w/2+(r.rand()-.5)*80)),y:platform.y-36,phase:r.rand()*6,speed:.018+r.rand()*.018,r:10});
    });
  };
  const fixedUpdate=update;
  update=function rulesetUpdate(dt){
    const r=runtime;
    if(!r)return;
    r.platforms.forEach(platform=>{
      if(platform.type==='alternating'){
        platform.active=Math.floor(r.tick/75+platform.phase)%2===0;
        if(!platform.active){platform.hiddenY=platform.y;platform.y=9999}
      }
    });
    const priorOpponent=r.opponent?.progress;
    fixedUpdate(dt);
    if(!runtime)return;
    r.platforms.forEach(platform=>{if(platform.hiddenY!==undefined){platform.y=platform.hiddenY;delete platform.hiddenY}});
    const p=r.player,landed=r.platforms.find(platform=>Math.abs(p.y+p.h-platform.y)<1&&p.vy<0);
    if(landed){
      r.landings=(r.landings||0)+1;
      if(landed.type==='elastic')p.vy=JUMP*1.18;
      if(landed.type==='conveyor')p.vx+=landed.direction*1.5;
      if(landed.type==='wind')p.vx+=Math.sin(r.tick*.08+landed.phase)*.7;
      if(landed.type==='portal'&&!landed.used){p.x=landed.portalX;landed.used=true;burst(p.x+p.w/2,p.y+p.h,'#c0a4ff')}
      if((landed.type==='fragile'||landed.type==='temporary')&&!landed.breakAt)landed.breakAt=r.tick+(landed.type==='fragile'?18:42);
    }
    r.platforms=r.platforms.filter(platform=>!platform.breakAt||r.tick<platform.breakAt);
    if(r.dailyModifier==='Vento lateral')p.vx+=Math.sin(r.tick*.055)*.12;
    if(r.dailyModifier==='Gravidade leve'&&p.vy>0)p.vy-=.08;
    r.hazards.forEach(hazard=>{hazard.x+=Math.sin(r.tick*hazard.speed+hazard.phase)*.7});
    const collision=r.hazards.some(h=>Math.abs((p.x+p.w/2)-h.x)<p.w/2+h.r&&Math.abs((p.y+p.h/2)-h.y)<p.h/2+h.r);
    if(collision)return endRun('hazard');
    if(r.mode==='journey'&&r.score>=r.phaseGoal)return endRun('complete');
    if(r.mode==='duel'){
      r.duelTicks=(r.duelTicks||0)+1;
      r.opponent.progress=Math.min(1,(priorOpponent||0)+.000155+((r.seed+r.duelTicks*17)%11)*.000004);
      if(r.duelTicks>=5400)return endRun('timeout');
    }
  };
  const gameDraw=draw;
  draw=function variantsDraw(){
    gameDraw();
    const r=runtime;if(!r)return;
    const ctx=r.ctx;
    r.platforms.forEach(platform=>{
      if(!['fragile','elastic','conveyor','portal','wind','rhythm'].includes(platform.type))return;
      const y=platform.y-r.camera;if(y<-20||y>650)return;
      ctx.save();ctx.globalAlpha=.9;ctx.fillStyle=platform.type==='fragile'?'#ff846d':platform.type==='portal'?'#c0a4ff':'#ffd166';ctx.font='bold 9px sans-serif';ctx.textAlign='center';
      const symbol={fragile:'×',elastic:'↟',conveyor:'⇢',portal:'◌',wind:'≈',rhythm:'♪'}[platform.type];ctx.fillText(symbol,platform.x+platform.w/2,y+10);ctx.restore();
    });
    r.hazards.forEach(h=>{const y=h.y-r.camera;if(y<-20||y>660)return;ctx.save();ctx.fillStyle='#ff846d';ctx.globalAlpha=.9;ctx.beginPath();ctx.arc(h.x,y,h.r,0,Math.PI*2);ctx.fill();ctx.fillStyle='#101522';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.fillText('!',h.x,y+3);ctx.restore()});
    if(r.mode==='duel'){const label=document.getElementById('hud-score');if(label)label.textContent=`${r.score} m · ${Math.max(0,90-Math.floor((r.duelTicks||0)/60))} s`}
  };
  const replayEndRun=endRun;
  endRun=function campaignEnd(reason){
    const r=runtime;
    replayEndRun(reason);
    if(!r)return;
    if(r.mode==='journey'&&reason==='complete'){
      ensureJourney();const key=journeyKey(r.stageIndex,r.phaseIndex);
      if(!player.journey.completed.includes(key))player.journey.completed.push(key);
      savePlayer();
    }
  };
  document.addEventListener('click',event=>{
    const phase=event.target.closest('[data-journey-phase]');
    if(!phase)return;
    event.preventDefault();event.stopImmediatePropagation();
    const [stageIndex,phaseIndex]=phase.dataset.journeyPhase.split(':').map(Number);
    if(stageIndex*10+phaseIndex<=journeyProgress())begin('journey',stageIndex,phaseIndex);
  },true);
  function ensureDailyChallenge(){
    const today=dayKey();
    if(!player.dailyChallenge||player.dailyChallenge.date!==today)player.dailyChallenge={date:today,trainingUsed:false,scoredAttempts:0,best:0};
  }
  const campaignDailyRender=renderDaily;
  renderDaily=function limitedDailyRender(){
    ensureDailyChallenge();
    const daily=player.dailyChallenge,seed=dailySeed(),modifier=['Vento lateral','Plataformas frágeis','Gravidade leve'][seed%3];
    screen.innerHTML=`<div class="screen-title"><button class="back" data-action="home">‹</button><div><div class="eyebrow">Mesma rota para todos</div><h2>Desafio diário</h2></div></div><div class="card" style="margin-top:17px"><div class="eyebrow">seed ${seed}</div><h3 style="margin-top:5px">${modifier}</h3><p class="lede" style="margin-top:5px">Uma rota determinística, sem venda de tentativas e sem vantagem de equipamento.</p><div class="grid two" style="margin-top:14px"><div><div class="eyebrow">melhor local</div><h2>${daily.best} m</h2></div><div><div class="eyebrow">pontuadas</div><h2>${daily.scoredAttempts}/3</h2></div></div></div><div class="section-head"><h2>Metas</h2><small>reinicia diariamente</small></div><div class="grid">${missionsHtml()}</div><div class="grid two" style="margin-top:15px"><button class="button secondary" data-daily-kind="training" ${daily.trainingUsed?'disabled':''}>${daily.trainingUsed?'Treino usado':'Treinar 1x'}</button><button class="button" data-daily-kind="scored" ${daily.scoredAttempts>=3?'disabled':''}>Tentativa pontuada</button></div><p style="color:var(--muted);font-size:12px;margin-top:11px">O placar deste MVP é local. Placar global e replay moderável dependem do backend autoritativo.</p>`;
  };
  let requestedDailyKind=null;
  function startDaily(kind){
    ensureDailyChallenge();
    const daily=player.dailyChallenge;
    if(kind==='training'&&daily.trainingUsed){showToast('Treino diário já usado.');return}
    if(kind==='scored'&&daily.scoredAttempts>=3){showToast('Limite diário de tentativas pontuadas atingido.');return}
    if(kind==='training')daily.trainingUsed=true;else daily.scoredAttempts+=1;
    requestedDailyKind=kind;savePlayer();begin('daily',stageFor(player.best));
  }
  const dailyAwareBegin=begin;
  begin=function beginWithDailyLimits(mode,stageIndex=0,phaseIndex=0,forcedSeed){
    dailyAwareBegin(mode,stageIndex,phaseIndex,forcedSeed);
    if(runtime&&runtime.mode==='daily'){runtime.dailyKind=requestedDailyKind||'scored';requestedDailyKind=null;}
  };
  const starsEndRun=endRun;
  endRun=function objectivesEndRun(reason){
    const r=runtime;
    starsEndRun(reason);
    if(!r)return;
    if(r.mode==='journey'&&reason==='complete'){
      ensureJourney();
      const stars=Math.min(3,1+(r.collected>=2?1:0)+((r.landings||0)>=4?1:0));
      const key=journeyKey(r.stageIndex,r.phaseIndex);
      player.journey.stars[key]=Math.max(player.journey.stars[key]||0,stars);
      savePlayer();
    }
    if(r.mode==='daily'){
      ensureDailyChallenge();
      player.dailyChallenge.best=Math.max(player.dailyChallenge.best,r.score);
      savePlayer();
    }
  };
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-daily-kind]');
    if(!button)return;
    event.preventDefault();event.stopImmediatePropagation();startDaily(button.dataset.dailyKind);
  },true);
  function ensureExperiencePrefs(){
    player.prefs=player.prefs||{};
    player.prefs.effectsVolume=Number.isFinite(player.prefs.effectsVolume)?player.prefs.effectsVolume:.65;
    player.prefs.musicVolume=Number.isFinite(player.prefs.musicVolume)?player.prefs.musicVolume:.35;
    player.prefs.uiVolume=Number.isFinite(player.prefs.uiVolume)?player.prefs.uiVolume:.5;
    player.prefs.language=player.prefs.language==='en'?'en':'pt-BR';
    player.prefs.uiScale=Number.isFinite(player.prefs.uiScale)?Math.max(.9,Math.min(1.2,player.prefs.uiScale)):1;
    player.prefs.tilt=Boolean(player.prefs.tilt);
    player.prefs.sensitivity=Number.isFinite(player.prefs.sensitivity)?Math.max(.5,Math.min(1.5,player.prefs.sensitivity)):1;
  }
  let audioContext=null;
  function tone(kind='effect'){
    ensureExperiencePrefs();
    const volume=kind==='ui'?player.prefs.uiVolume:player.prefs.effectsVolume;
    if(!volume||!window.AudioContext&&!window.webkitAudioContext)return;
    try{
      audioContext=audioContext||new (window.AudioContext||window.webkitAudioContext)();
      if(audioContext.state==='suspended')audioContext.resume();
      const oscillator=audioContext.createOscillator(),gain=audioContext.createGain();
      oscillator.type=kind==='ui'?'sine':'triangle';oscillator.frequency.value=kind==='ui'?520:300;
      gain.gain.setValueAtTime(Math.min(.08,volume*.08),audioContext.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audioContext.currentTime+.07);
      oscillator.connect(gain).connect(audioContext.destination);oscillator.start();oscillator.stop(audioContext.currentTime+.075);
    }catch(_){}
  }
  const hapticWithSound=haptic;
  haptic=function accessibleHaptic(pattern){hapticWithSound(pattern);tone('effect')};
  const defaultSettingsRender=renderSettings;
  renderSettings=function experienceSettingsRender(){
    defaultSettingsRender();ensureExperiencePrefs();
    const p=player.prefs;
    screen.insertAdjacentHTML('beforeend',`<div class="section-head"><h2>Áudio, controle e idioma</h2></div><div class="card"><label style="display:block;padding:8px 0">Efeitos <input style="float:right;width:46%" data-volume="effectsVolume" type="range" min="0" max="1" step=".05" value="${p.effectsVolume}"></label><label style="display:block;padding:8px 0">Música <input style="float:right;width:46%" data-volume="musicVolume" type="range" min="0" max="1" step=".05" value="${p.musicVolume}"></label><label style="display:block;padding:8px 0">Interface <input style="float:right;width:46%" data-volume="uiVolume" type="range" min="0" max="1" step=".05" value="${p.uiVolume}"></label><label style="display:block;padding:8px 0">Sensibilidade <input style="float:right;width:46%" data-sensitivity type="range" min=".5" max="1.5" step=".05" value="${p.sensitivity}"></label><label style="display:block;padding:8px 0">Tamanho da UI <input style="float:right;width:46%" data-volume="uiScale" type="range" min=".9" max="1.2" step=".05" value="${p.uiScale}"></label><button class="button secondary small" style="margin-top:9px" data-tilt>${p.tilt?'Inclinação ativa':'Ativar inclinação'}</button><div style="display:flex;gap:8px;margin-top:11px"><button class="button small ${p.language==='pt-BR'?'':'secondary'}" data-language="pt-BR">Português</button><button class="button small ${p.language==='en'?'':'secondary'}" data-language="en">English</button></div></div>`);
  };
  const ENGLISH_COPY=[
    ['Jogar jornada','Play campaign'],['Infinito','Endless'],['Desafio diário','Daily challenge'],['Duelo 1x1','1v1 duel'],['Missões de hoje','Today’s missions'],['Seu salto','Your flight'],['Jornada','Campaign'],['Estilo','Style'],['Perfil','Profile'],['Configurações','Settings'],['Voltar ao início','Back home'],['Tentar de novo','Try again'],['Compartilhar resultado','Share result'],['Recompensa de anúncio demo concedida.','Demo ad reward granted.'],['Zona conquistada','Zone cleared'],['Salto encerrado','Run complete'],['Vitória no duelo','Duel victory'],['Quase lá','Close one'],['Partidas concluídas','Runs completed'],['Reduzir movimento','Reduce motion'],['Alto contraste','High contrast'],['Resposta tátil','Haptics'],['Telemetria opcional','Optional analytics'],['Recomeçar demo','Reset demo'],['Dados','Data'],['Rota semanal','Weekly route'],['Conquistas','Achievements'],['Replays locais','Local replays'],['mesma rota para todos','same route for everyone'],['Tentativa pontuada','Scored attempt'],['Treinar 1x','Train once'],['Mapa de ascensão','Ascent map'],['Capítulo','Chapter'],['Fase','Stage'],['Metas','Goals'],['Meta','Goal']
  ];
  function applyLanguage(){
    ensureExperiencePrefs();
    document.documentElement.lang=player.prefs.language;
    document.documentElement.style.setProperty('--skybound-ui-scale',player.prefs.uiScale);
    document.getElementById('app')?.style.setProperty('font-size',`${15*player.prefs.uiScale}px`);
    if(player.prefs.language!=='en')return;
    let markup=screen.innerHTML;
    ENGLISH_COPY.forEach(([from,to])=>{markup=markup.split(from).join(to)});
    screen.innerHTML=markup;
  }
  const renderWithLanguage=render;
  render=function localizedRender(){renderWithLanguage();applyLanguage()};
  const shellWithLanguage=renderGameShell;
  renderGameShell=function localizedShell(mode,stageIndex){shellWithLanguage(mode,stageIndex);applyLanguage()};
  const resultWithLanguage=renderResult;
  renderResult=function localizedResult(data){resultWithLanguage(data);applyLanguage()};
  document.addEventListener('input',event=>{
    const control=event.target.closest('[data-volume]');
    if(!control)return;
    ensureExperiencePrefs();player.prefs[control.dataset.volume]=Number(control.value);savePlayer();applyLanguage();tone('ui');
  },true);
  document.addEventListener('input',event=>{
    const control=event.target.closest('[data-sensitivity]');
    if(!control)return;
    ensureExperiencePrefs();player.prefs.sensitivity=Number(control.value);savePlayer();tone('ui');
  },true);
  document.addEventListener('click',event=>{
    const choice=event.target.closest('[data-language]');
    if(!choice)return;
    event.preventDefault();event.stopImmediatePropagation();ensureExperiencePrefs();player.prefs.language=choice.dataset.language;savePlayer();tone('ui');render();
  },true);
  document.addEventListener('click',async event=>{
    const control=event.target.closest('[data-tilt]');
    if(!control)return;
    event.preventDefault();event.stopImmediatePropagation();
    const sensor=window.DeviceOrientationEvent;
    if(!sensor){showToast('Inclinação não disponível neste aparelho.');return}
    try{
      if(typeof sensor.requestPermission==='function'&&await sensor.requestPermission()!=='granted'){showToast('Permissão de inclinação não concedida.');return}
      ensureExperiencePrefs();player.prefs.tilt=!player.prefs.tilt;savePlayer();showToast(player.prefs.tilt?'Inclinação ativada.':'Inclinação desativada.');render();
    }catch(_){showToast('Não foi possível ativar a inclinação.')}
  },true);
  window.addEventListener('deviceorientation',event=>{
    if(!runtime||!player.prefs?.tilt||!Number.isFinite(event.gamma))return;
    runtime.targetX=Math.max(0,Math.min(360,180+event.gamma*10*player.prefs.sensitivity));
  });
  function routeDeepLink(){
    if(!window.location)return;
    const route=(window.location.hash||'').replace('#','').toLowerCase();
    if(['home','journey','shop','profile','daily'].includes(route)){screenMode=route;render()}
  }
  window.addEventListener('hashchange',routeDeepLink);
  ensureMetaState();ensureExperiencePrefs();savePlayer();routeDeepLink();render();
})();
