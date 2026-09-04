# Doodle Jump — Arquitetura e Roadmap até a Publicação

> Documento de referência do projeto em `/root/dev/work/jump`.
> Estado em **2026-09-04** (commit `7dbf0ed`) · Versão no ar: <https://denissmoreira.github.io/jump/>

## 1. Visão geral

| Item | Descrição |
|---|---|
| Gênero | Endless jumper vertical (clone de Doodle Jump) |
| Stack | HTML + CSS + JavaScript puro, Canvas 2D — **arquivo único** `index.html` (~3.090 linhas) |
| Dependências / build | Nenhuma. Roda abrindo o arquivo no navegador; publicado como estático no GitHub Pages |
| Resolução lógica | 400 × 600 px (independe do CSS scaling; DPR até 2× para telas retina) |
| Objetivo | Testar o que um modelo quantizado (`qwen3.8-27b@Q4_K_XL`) produz a partir de prompts: um jogo completo refinado iteração a iteração via prompt (ver `README.md`) |

**Princípios de design**

1. **Single-file, sem build** — nenhum bundler, nenhum asset externo; toda a arte é procedural em canvas.
2. **Tuning declarativo** — a dificuldade vive em tabelas de dados (`STAGES`, `ENEMY_KINDS`), não em lógica espalhada. Adicionar uma fase = adicionar uma linha na tabela.
3. **Fixed timestep** — simulação a 60 Hz independentemente da taxa do display; renderização desacoplada por acumulador.

## 2. Estrutura do arquivo

O arquivo único é organizado em seções sequenciais (linhas aproximadas nesta data):

| Seção | Linhas | Responsabilidade |
|---|---:|---|
| Shell HTML + CSS | 1–75 | Página, título, barra de dicas e crédito do modelo; tema escuro com gradiente |
| Canvas e constantes de tuning | 77–101 | Tamanho lógico (400×600), constantes físicas, chaves de `localStorage` |
| Fases (`STAGES`) | 103–146 | Tabela das 16 fases: altitude, gaps, probabilidades, céu e tema da plataforma |
| Tipos de monstro (`ENEMY_KINDS`) | 148–159 | 9 tipos com `minStage` (primeira fase em que podem nascer) |
| Estado | 160–228 | Estado global mutável: máquina de estados, entidades, timers, cenário parallax |
| Helpers | 229–300 | `clamp`, `rand`, mixagem de cor hex, `roundRect`, AABB, storage seguro |
| Céu (blend) | 301–339 | Interpolação contínua do céu entre fases (`skyT`) |
| Partículas (efeitos) | 340–391 | Explosões e chamas do foguete (espaço de mundo) |
| Partículas ambiente | 392–539 | Atmosfera por fase em tela (16 tipos: folhas, neve, brasas, poeira estelar…) |
| Setup / geração | 540–858 | Inicialização do cenário, `generatePlatform`, `reset`, `die`, persistência de pontuação e compartilhamento do resultado |
| Update (simulação) | 859–1125 | Física, colisões, IA dos monstros, câmera, culling/geração por tick |
| Drawing | 1126–2674 | Toda a renderização: fundo, parallax, plataformas, monstros, personagem e HUD |
| Telas de menu | 2675–2893 | Menu principal, seleção de personagem, como jogar, pausa, game over e banner de fase |
| Input | 2894–3041 | Teclado, mouse e toque; hit-testing dos menus em coordenadas do canvas |
| Escala + loop + boot | 3042–3087 | `fitCanvas` (DPR), game loop de timestep fixo e chamadas iniciais |

## 3. Arquitetura de runtime

### 3.1 Game loop — timestep fixo

```
requestAnimationFrame(loop)
  dt = clamp(time - lastTime, máx 100 ms)   // proteção contra troca de aba
  accumulator += dt
  while (accumulator >= 16,67 ms): update()  // simulação a exatamente 60 Hz
  draw()                                      // renderização uma vez por frame
```

- `STEP = 1000/60`; o contador `tick` só avança quando não está pausado — todas as animações derivam dele (senos, piscar de olhos), então a pausa congela tudo.
- Timers que rodam em todos os estados exceto `paused`: screen shake, banner de fase, feedback de compartilhamento, pulso do score e partículas ambiente.

### 3.2 Máquina de estados

```
 boot ──► start ◄──────────────┐
            │  ▲                │
   JOGAR    │  │ PERSONAGEM     │ ESC / voltar
            ▼  │                │
        playing ◄──────── customize
            │  ▲             (grade de personagens)
            │  │ P/ESC       │
            ▼  │              │
          paused ──► CONTINUAR | REINICIAR | MENU PRINCIPAL
            │
   queda / monstro
            ▼
         dying (55 frames, rotação + gravidade ×1,3)
            │
            ▼
        gameover ──ESPAÇO/clique──► startGame()
                  └──S────────────► shareResult()
```

`start` também acessa `help` (como jogar). O estado é uma única string: `'start' | 'help' | 'customize' | 'playing' | 'paused' | 'dying' | 'gameover'`.

### 3.3 Física e colisão

| Constante | Valor | Efeito |
|---|---:|---|
| `GRAVITY` | 0,5 px/f² | Gravidade |
| `JUMP_VELOCITY` | −12 px/f | Pulo em plataforma (apex ≈ **144 px**) |
| `SPRING_VELOCITY` | −20 px/f | Mola (apex ≈ 400 px) |
| `ROCKET_VY` / `ROCKET_TIME` | −15 px/f · 95 f | Voo do foguete (~1,6 s); ignora plataformas e dá invencibilidade |
| `STOMP_VELOCITY` | −15 px/f | Rebound ao pisar em monstro (apex ≈ 225 px) |
| `EXTRA_JUMP_VELOCITY` | −16,5 px/f | Pulo extra da coleta azul (apex ≈ 272 px); cargas acumulam |
| `MOVE_SPEED` / `MOUSE_SPEED` | 5 / 7 px/f | Teclado vs. arraste |
| `METER_SCALE` | 10 px/m | Conversão do score: `score = ⌊(H−140−highestY)/10⌋` |

**Invariante central:** `gapMax < MAX_JUMP_HEIGHT (144 px)` em toda fase — senão o gap seria impossível de cruzar. Todas as fases respeitam (máximo atual: 142 px).

- **Plataformas one-way**: colisão só caindo (`vy > 0`) e sem foguete, com verificação de varredura (`prevFeet ≤ p.y+1 ∧ feet ≥ p.y`) para evitar túnel. A mola ativa se o centro do personagem estiver a menos de 16 px do centro da plataforma.
- **Plataformas quebradiças**: ao pisar, tremem por 14 frames e depois quebram, caindo com gravidade própria (0,32).
- **Plataformas móveis**: oscilação senoidal em torno de `baseX` (`range` 30–90 px; velocidade × `moveMult` da fase).
- **Wrap-around nas bordas**: o personagem sai de um lado e entra no outro. Alguns monstros usam `wrapEnemy`; outros rebatem nas bordas (slime, aranha, robô, alien).
- **Câmera só sobe**: `cameraY = min(cameraY, character.y − 0,4H)`. Cair abaixo da visão (`character.y − cameraY > H+60`) encerra a partida.

### 3.4 Geração procedural

`generatePlatform(topY)` caminha para cima a partir da plataforma mais alta e é chamado todo tick até haver conteúdo uma tela acima da câmera (guard de 500 iterações). Para cada nova plataforma:

1. **Gap** `rand(gapMin, gapMax)` e x uniforme — ambos vindos da tabela da fase correspondente à altitude.
2. **Tipo especial** (só acima da zona segura `y < H−160`): quebradiça 13% → mola (`S.spring`) → móvel (`S.moving`).
3. **Monstro** (só `y < H−320`, probabilidade `S.enemy`): tipo sorteado entre os com `minStage ≤ fase atual`; posicionado entre esta plataforma e a anterior; ajustes de tamanho/velocidade por tipo (morcego ×1,25, OVNI ×1,5, cometa ×1,7…).
4. **Coletável** (cadeia else-if, cada um com zona segura própria): foguete (`y < H−400`, prob. `S.pickup`) → pulo extra (`×0,65`) → escudo (`×0,45`).

O conteúdo abaixo da visão é cortado a cada tick (`y > cameraY + H + 120`), então os arrays permanecem bounded independentemente da altitude atingida.

### 3.5 Fases e progressão de dificuldade

A dificuldade é função pura da altitude (score em metros). Cada fase define gaps, probabilidades, faixa de velocidade dos inimigos, tema das plataformas e céu:

| # | Fase | Início (m) | Gap (px) | Chance de monstro | Vel. monstros | Deco plataforma |
|--:|---|---:|---|---:|---|---|
| 1 | Prado | 0 | 50–96 | 0% | — | grass |
| 2 | Floresta | 250 | 54–106 | 0% | — | leaf |
| 3 | Montanhas | 600 | 58–114 | 7% | 1,2–2,4 | snow |
| 4 | Cavernas | 1000 | 62–120 | 10% | 1,5–3,0 | crystal |
| 5 | Vulcão | 1500 | 66–128 | 13% | 1,8–3,4 | lava |
| 6 | Espaço | 2000 | 70–132 | 16% | 2,0–3,8 | spark |
| 7 | Planeta | 3000 | 74–138 | 19% | 2,2–4,2 | alien |
| 8 | Nebulosa | 4000 | 78–142 | 22% | 2,4–4,6 | nebula |
| 9 | Oceano Celeste | 5500 | 78–138 | 23% | 2,5–4,8 | coral |
| 10 | Metrópole Neon | 7000 | 80–140 | 25% | 2,7–5,0 | circuit |
| 11 | Templo Solar | 8800 | 82–142 | 27% | 2,8–5,2 | rune |
| 12 | Vazio Quântico | 11000 | 84–142 | 29% | 3,0–5,4 | void |
| 13 | Selva Bioluminescente | 13500 | 82–140 | 30% | 3,1–5,5 | bio |
| 14 | Fortaleza de Gelo | 16000 | 84–142 | 31% | 3,2–5,7 | ice |
| 15 | Deserto de Vidro | 18800 | 86–142 | 32% | 3,4–5,9 | glass |
| 16 | Tempestade Eterna | 22000 | 86–142 | 34% | 3,6–6,2 | storm |

- Entrar numa fase nova dispara o banner “FASE N DE 16” (140 frames, fade in/out).
- O céu é **interpolado continuamente** entre fases vizinhas (`skyT`), então a transição de bioma é suave e não abrupta; as nuvens desaparecem ao se aproximar do espaço.

### 3.6 Monstros

| Monstro | Primeira fase | Comportamento (em `update`) |
|---|---|---|
| 🕷️ Aranha | Floresta (2) | Rasteja lateral balançando na teia; contato = **preso por 4 s** (`webTimer`), não é morte |
| 🦖 Pterodáctilo | Montanhas (3) | Voo horizontal contínuo com wrap-around da tela |
| 🟢 Slime | Montanhas (3) | Patrulha lateral e pula no lugar entre duas alturas; grace de 24 frames ao entrar na tela |
| 🦇 Morcego | Cavernas (4) | Cruzamento rápido com bob senoidal |
| 👻 Fantasma | Cavernas (4) | Semitransparente, persegue o jogador horizontalmente (lerp no `vx`) |
| 🛸 OVNI | Espaço (6) | Rápido, oscilação vertical forte e luzes piscando |
| 🤖 Robô | Planeta (7) | Patrulha horizontal, virando nas bordas da tela |
| 👽 Alien | Planeta (7) | Pula na direção do jogador entre um salto e outro (reaponta a cada pouso) |
| ☄️ Cometa | Nebulosa (8) | Rastro rápido em diagonal com cauda brilhante e grande oscilação vertical |

**Regras de interação** (em ordem de prioridade):

1. **Pisão (stomp)**: caindo (`vy > 0`) com os pés acima da faixa superior do monstro → rebound `STOMP_VELOCITY`, monstro derrotado, partículas + shake. Monstro vira trampolim.
2. **Escudo** (coleta lilás): absorve um encontro inteiro — inclusive a teia da aranha — e é consumido. Booleano por design: não acumula.
3. **Aranha**: prende por 4 s (`webTimer = 240`), com contagem regressiva no HUD; sem morte.
4. **Demais casos**: `die('enemy', kind)` → estado dying; o histórico registra a causa e qual monstro matou.

### 3.7 Coletáveis

| Tipo | Visual | Efeito |
|---|---|---|
| Foguete | 🚀 | Voo de 95 frames a −15 px/f; ignora plataformas; invencível contra monstros |
| Pulo extra | Seta azul (↟) | +1 carga, **acumulável**; gasta com ESPAÇO/clique/toque na subida ou descida; não funciona durante foguete ou teia |
| Escudo | Gema lilás (◈) | Bloqueia um hit de monstro; indicador no HUD |

### 3.8 Pipeline de renderização

Ordem de desenho em `draw()` (espaço de mundo dentro de um `save/restore` que aplica o screen shake):

1. Céu — gradiente vertical com cores interpoladas por `skyT`
2. Nuvens distantes → nuvens próximas (parallax)
3. Partículas ambiente da fase atual (folhas, neve, brasas, poeira estelar…)
4. Plataformas (+ molas), culladas para o viewport ± margem
5. Coletáveis → monstros
6. Personagem (squash & stretch em pouso/pulo; pisca a cada ~2–5 s)
7. Partículas de efeito (bursts, chamas do foguete)

Depois, em espaço de tela: vinheta, HUD (pílula do score com pulso a cada 10 m, recorde, contagem da teia, badges de pulo extra/escudo e rótulo “FASE N · nome”), banner de fase.

O cenário parallax por fase é pré-gerado no boot (`initScenery`): árvores (Floresta), cristas duplas de montanha (Montanhas), vulcões (Vulcão), planetas/lua/nebulosa (Espaço), torres de cristal (Planeta), nuvens de gás (Nebulosa) e paredes + gemas das cavernas — cada um com fator de parallax vertical próprio e janela de fade ligada a `skyT`.

### 3.9 Personagens

`CHARACTERS`: 9 personagens desenhados proceduralmente por `drawDoodler` (paleta/estilo por personagem): DOODLER, HOMEM-ARANHA, HOMEM DE FERRO, CAPITÃO AMÉRICA e HULK (Marvel) + LUNA, MAYA, SOL e ÍRIS. A seleção é uma grade de cards (5 colunas), navegável por teclado ou toque; o preview central renderiza a 2,15×. O personagem escolhido fica registrado no histórico de partidas.

### 3.10 Input

| Controle | Contexto | Ação |
|---|---|---|
| `←`/`→`, `A`/`D` | playing | Mover (define o modo teclado) |
| Arraste do mouse / toque | playing | Personagem segue o ponteiro (`MOUSE_SPEED`) |
| `ESPAÇO` / clique / tap | playing | Gasta uma carga de pulo extra |
| `ESPAÇO` / `Enter` / tap | Menus e game over | Confirma a opção destacada / reinicia |
| `↑↓`/`WS` | Menus, grade de personagens | Navegar (com wrap na grade) |
| `P` / `ESC` | playing/paused/help/customize | Pausar/continuar; voltar das telas |
| `S` | gameover | Compartilhar o resultado |

Os menus usam hit-testing em coordenadas do canvas (`menuPointer`), então clique e toque seguem o mesmo caminho. `touchstart`/`touchmove` usam `{passive:false}` + `preventDefault` para bloquear scroll/zoom (reforçado por CSS `touch-action:none`).

### 3.11 Persistência e compartilhamento

- **localStorage**: `doodle-jump-best-score` (número) e `doodle-jump-score-history` (JSON, últimas 10 partidas: `{score, stage, character, cause, at}`). No load, o recorde é recalculado como `máx(valor salvo, histórico)`.
- **Compartilhamento** (`shareResult`, tecla `S` ou botão no game over): screenshot síncrono do canvas → `File` PNG (“doodle-jump-recorde-Nm.png”) e cadeia de fallback:
  1. `navigator.share` (com a imagem, se `canShare`)
  2. Clipboard com imagem (`ClipboardItem`)
  3. Clipboard com texto (score + fase + recorde + URL)
  4. `window.prompt` como último recurso

  Cancelamento do usuário (`AbortError`) é silencioso; o feedback aparece na tela (“Print do recorde compartilhado!” etc.).

## 4. Invariantes e restrições de design

1. **Single-file, sem build** — filosofia declarada no README; qualquer mudança deve manter `index.html` autocontido (sem dependências, assets ou etapa de build).
2. **`gapMax < 144 px`** (`MAX_JUMP_HEIGHT`) em toda fase — senão o gap fica impossível de cruzar.
3. **Crédito exato**: o rodapé deve ler `qwen3.8-27b@Q4_K_XL` (nome corrigido no commit `e2c2b4f`; parte do teste Q4).
4. **Coordenadas lógicas 400×600** — toda a matemática de gameplay usa pixels lógicos; DPR/CSS scaling é apenas apresentação (`fitCanvas`, DPR limitado a 2).
5. **Zonas seguras na geração** — sem monstros acima de `y < H−320` e coletáveis só acima dos limiares próprios: o início da partida deve ser sempre justo.

## 5. Roadmap até a publicação

### 5.1 Marcos (histórico do git)

**Fase 1 — Fundação e primeira publicação (2026-08-29)**

| Commit | Marco |
|---|---|
| `0fe2108` | Versão inicial: loop central — física, plataformas, molas, foguete, wrap-around, score/recorde |
| `1f844e3` / `e2c2b4f` | Crédito do modelo no rodapé + correção do nome (`qwen3.8-27b@Q4_K_XL`) |
| `aaf11a8` | README com link do GitHub Pages e contexto do teste Q4 → **projeto vai ao ar** em denissmoreira.github.io/jump/ |
| `3294f77` | Monstros com comportamentos próprios: slime, morcego, fantasma e OVNI |
| `a8a3523` | Ambiente visual: cenário parallax por fase, sol/lua e partículas |
| `e50440f` | Menu principal (jogar/personagem/como jogar) e pausa (`P`/`ESC`) com continuar/reiniciar/menu |

**Fase 2 — Expansão de conteúdo (2026-08-29 → 30)**

| Commit | Marco |
|---|---|
| `3329d76` | Fases Planeta e Nebulosa + robô, alien e cometa |
| `363f511` | Menu de seleção de personagens Marvel (Homem-Aranha, Homem de Ferro, Capitão América, Hulk) |
| `c530fae` | Menus selecionáveis por clique/toque — suporte mobile completo |
| `341bc58` | Aranha (teia = 4 s preso) e plataforma quebradiça |

**Fase 3 — Sistemas e retenção (2026-09-01)**

| Commit | Marco |
|---|---|
| `63e1256` | Pulo duplo: coletável de pulo extra acumulável + novas personagens (Luna, Maya, Sol, Íris) |
| `fba4121` | Histórico de partidas (últimas 10), coletável de escudo e pisão em monstros como trampolim |
| `adc442e` | Indicadores do HUD simplificados + compartilhamento com print do recorde (Web Share/clipboard) |
| `6c8ca05` | Quatro fases com novos biomas: Oceano Celeste, Metrópole Neon, Templo Solar e Vazio Quântico |

**Fase 4 — Escopo final e publicação atual (2026-09-02 → 04)**

| Commit | Marco |
|---|---|
| `6685758` | Expansão para **16 fases** (+ Selva Bioluminescente, Fortaleza de Gelo, Deserto de Vidro e Tempestade Eterna) — versão pública atual |
| `7dbf0ed` | `.qwen/` no gitignore (configuração local da ferramenta fora do repositório) |

### 5.2 Pipeline de publicação (GitHub Pages)

O repositório `DenisSMoreira/jump` serve o site direto da branch `main`; não há CI — a verificação é manual e faz parte de todo ciclo de mudança:

```bash
# 1. Editar index.html (arquivo único — nada para buildar)

# 2. Extrair o JS e validar sintaxe
awk '/<script>/{f=1;next}/<\/script>/{f=0}f' index.html > /tmp/game.js
node --check /tmp/game.js

# 3. Smoke test headless (vm + Proxy ctx stub em /tmp/smoke.js)
node /tmp/smoke.js   # precisa stubar createLinearGradient e createRadialGradient

# 4. Commit em pt-BR ("Verbo: descrição") e push
git commit -m "..." && git push origin main

# 5. Poll do build do Pages até "built" (~15 s × 3)
gh api repos/DenisSMoreira/jump/pages/builds/latest --jq .status

# 6. Conferir o site ao vivo com um marcador do código novo
curl -s https://denissmoreira.github.io/jump/ | grep '<marcador>'
```

Uma mudança só é considerada concluída quando o passo 6 confirma o novo código no site publicado — não apenas commitada.

### 5.3 Pendências conhecidas (manutenção)

- **README desatualizado em relação ao jogo**: cita “8 fases” e a tabela de monstros não inclui a aranha; a tela de ajuda do jogo já diz 16.
- **Seleção de personagem não persiste** no `localStorage` — volta para DOODLER ao recarregar.
- **Harness de smoke em `/tmp`** (efêmero, fora do versionamento) — precisa ser recriado se a máquina for resetada.
- **Sem CI**: sintaxe/smoke/verificação ao vivo dependem do loop manual acima.
