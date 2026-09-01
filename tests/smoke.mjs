import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const root = new URL('..', import.meta.url);
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const mobile = fs.readFileSync(new URL('../mobile.html', import.meta.url), 'utf8');
const extension = fs.readFileSync(new URL('../enhancements.js', import.meta.url), 'utf8');
const worker = fs.readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
const base = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(match => match[1])
  .sort((a, b) => b.length - a.length)[0];

assert.equal(html, mobile, 'Os dois entrypoints devem permanecer idênticos');
assert.equal((html.match(/<script src="\.\/enhancements\.js"><\/script>/g) || []).length, 1, 'A extensão deve ser carregada uma única vez');
assert.match(worker, /skybound-shell-v2/);
assert.match(worker, /'\.\/enhancements\.js'/);

function makeBrowser() {
  const values = new Map();
  const listeners = new Map();
  const elements = new Map();
  const canvasContext = new Proxy({}, {
    get(target, key) {
      if (key === 'createLinearGradient') return () => ({addColorStop() {}});
      return target[key] || (() => {});
    },
    set(target, key, value) { target[key] = value; return true; }
  });
  class Element {
    constructor(id) {
      this.id = id;
      this._html = '';
      this.classList = {toggle() {}, add() {}, remove() {}};
      this.style = {setProperty() {}};
    }
    get innerHTML() { return this._html; }
    set innerHTML(value) { this._html = String(value); discover(this._html); }
    insertAdjacentHTML(_where, value) { this._html += String(value); discover(value); }
    querySelectorAll() { return []; }
    querySelector() { return null; }
    closest() { return null; }
    getBoundingClientRect() { return {left: 0, width: 360}; }
    getContext() { return canvasContext; }
  }
  function discover(markup) {
    for (const id of ['game', 'hud-score', 'hud-stage']) {
      if (String(markup).includes(`id="${id}"`) && !elements.has(id)) elements.set(id, new Element(id));
    }
  }
  const document = {
    documentElement: new Element('html'),
    body: new Element('body'),
    hidden: false,
    getElementById(id) { return elements.get(id) || null; },
    querySelector() { return null; },
    addEventListener(name, handler, options) {
      const key = `document:${name}`;
      listeners.set(key, [...(listeners.get(key) || []), {handler, capture: options === true || options?.capture === true}]);
    }
  };
  for (const id of ['screen', 'topbar', 'toast']) elements.set(id, new Element(id));
  let frame = 0;
  const context = {
    document,
    window: null,
    navigator: {vibrate() {}, clipboard: {writeText: async () => {}}, share: async () => {}},
    localStorage: {getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, String(value)), removeItem: key => values.delete(key)},
    sessionStorage: {getItem: key => values.get(`session:${key}`) || null, setItem: (key, value) => values.set(`session:${key}`, String(value))},
    requestAnimationFrame(callback) { frame = callback; return 1; },
    cancelAnimationFrame() {},
    performance: {now: () => 0},
    setTimeout() { return 1; },
    clearTimeout() {},
    confirm: () => true,
    console,
    Date,
    Math,
    JSON
  };
  context.window = context;
  context.addEventListener = (name, handler, options) => {
    const key = `window:${name}`;
    listeners.set(key, [...(listeners.get(key) || []), {handler, capture: options === true || options?.capture === true}]);
  };
  function dispatchDocument(name, target) {
    const event = {target, preventDefault() {}, stopImmediatePropagation() { this.stopped = true; }};
    for (const listener of listeners.get(`document:${name}`) || []) {
      if (listener.capture) listener.handler(event);
      if (event.stopped) break;
    }
  }
  return {context, elements, dispatchDocument, get frame() { return frame; }};
}

const browser = makeBrowser();
vm.createContext(browser.context);
vm.runInContext(`${base}\nglobalThis.__skyboundTest={begin:(...args)=>begin(...args),step:()=>update(1),end:reason=>endRun(reason),journey:()=>{screenMode='journey';render()},inspect:()=>({runtime:runtime?{mode:runtime.mode,seed:runtime.seed,goal:runtime.phaseGoal,dailyKind:runtime.dailyKind,duelTicks:runtime.duelTicks,inputs:runtime.inputs.length,hazards:runtime.hazards?.length}:null,player:JSON.parse(JSON.stringify(player)),html:screen.innerHTML})};`, browser.context);
vm.runInContext(extension, browser.context);

const api = browser.context.__skyboundTest;
api.journey();
assert.equal((api.inspect().html.match(/data-journey-phase=/g) || []).length, 60, 'Jornada deve expor 60 fases locais');

api.begin('journey', 0, 0, 1337);
assert.equal(api.inspect().runtime.mode, 'tutorial', 'A primeira Jornada deve começar pelo tutorial');
api.end('complete');
assert.equal(api.inspect().player.tutorialComplete, true, 'Tutorial concluído deve persistir');

api.begin('journey', 0, 0, 1337);
assert.equal(api.inspect().runtime.mode, 'journey', 'Fase deve usar o modo Jornada após o tutorial');
assert.equal(api.inspect().runtime.seed, 1337, 'Fase deve preservar a seed determinística');
assert.equal(api.inspect().runtime.goal, 60, 'Fase deve aplicar a meta determinística');
for (let i = 0; i < 10; i += 1) api.step();
assert.equal(api.inspect().runtime.inputs > 0, true, 'Ticks devem registrar entradas comprimidas');
api.end('complete');
assert.equal(api.inspect().player.journey.completed.includes('0:0'), true, 'Conclusão deve desbloquear a fase seguinte');

api.begin('journey', 1, 0, 2024);
for (let i = 0; i < 10; i += 1) api.step();
assert.equal(api.inspect().runtime.mode, 'journey', 'Capítulos posteriores devem suportar regras e perigos sem falhar');
api.end('fall');

browser.dispatchDocument('click', {closest: selector => selector === '[data-daily-kind]' ? {dataset: {dailyKind: 'training'}} : null});
assert.equal(api.inspect().runtime.mode, 'daily', 'Treino diário deve iniciar a rota diária');
assert.equal(api.inspect().runtime.dailyKind, 'training', 'Treino e tentativa pontuada devem ser distinguíveis');
api.end('complete');
assert.equal(api.inspect().player.dailyChallenge.trainingUsed, true, 'Uso de treino deve persistir no dia');

api.begin('duel', 1, 0, 99);
for (let i = 0; i < 60; i += 1) api.step();
assert.equal(api.inspect().runtime.duelTicks, 60, 'Duelo deve avançar por ticks, não por frames de renderização');
assert.equal(api.inspect().runtime.seed, 99, 'Duelo espelhado deve preservar a seed');

console.log('Smoke test passed: deterministic core, campaign, replay input, and local duel.');
