# Doodle Jump

Um clone do clássico **Doodle Jump** em um único arquivo `index.html` — HTML + CSS + JavaScript puro, sem dependências nem build.

## ▶️ Jogar online

👉 **[https://denissmoreira.github.io/jump/](https://denissmoreira.github.io/jump/)** (GitHub Pages)

## Como jogar

| Ação | Controles |
|---|---|
| Mover | `←` `→` ou `A` / `D`, ou arraste (mouse/toque) |
| Começar / recomeçar | `ESPAÇO` ou toque na tela |
| Pulo extra | `ESPAÇO`, clique ou toque durante o jogo (com cargas coletadas) |

- **Molas** te lançam mais alto.
- **Foguetes** dão voo temporário — e invencibilidade contra monstros.
- **Setas azuis** acumulam pulos extras; gaste com `ESPAÇO`, clique ou toque.
- **Escudos lilás** bloqueiam um encontro com monstro.
- **Pise nos monstros** para usá-los de trampolim.
- **Aranhas** te prendem na teia por 4 s; **plataformas quebradiças** desmoronam após o pouso.
- As bordas da tela são contínuas: você atravessa de um lado ao outro.

## Fases e monstros

A dificuldade cresce com a altitude, em 16 fases (Prado → Floresta → Montanhas → Cavernas → Vulcão → Espaço → Planeta → Nebulosa → Oceano Celeste → Metrópole Neon → Templo Solar → Vazio Quântico → Selva Bioluminescente → Fortaleza de Gelo → Deserto de Vidro → Tempestade Eterna), cada uma com céu, plataformas e inimigos próprios:

| Monstro | Comportamento | Aparece a partir de |
|---|---|---|
| 🕷️ Aranha | Rasteja na teia; prende você por 4 s | Floresta |
| 🦖 Pterodáctilo | Voo horizontal contínuo | Montanhas |
| 🟢 Slime | Pula no lugar entre duas alturas | Montanhas |
| 🦇 Morcego | Rápido, voa em zigue-zague | Cavernas |
| 👻 Fantasma | Semitransparente, persegue você horizontalmente | Cavernas |
| 🛸 OVNI | Rápido com oscilação vertical forte e luzes piscando | Espaço |
| 🤖 Robô | Patrulha horizontal, virando nas bordas da tela | Planeta |
| 👽 Alien | Pula na sua direção entre um salto e outro | Planeta |
| ☄️ Cometa | Rastro rápido em diagonal com cauda brilhante | Nebulosa |

## 🧪 Teste de prompt em modelo quantizado Q4

Este jogo foi gerado a partir de **prompts** enviados ao modelo `qwen3.8-27b@Q4_K_XL` — uma versão **quantizada em Q4** (GGUF, K-quants) de um modelo com 27 bilhões de parâmetros. O objetivo do projeto é testar o que um modelo quantizado consegue produzir: um jogo completo e funcional (física, colisão, renderização em canvas, dificuldade progressiva, responsividade mobile), refinado iteração a iteração via prompt.

### Vantagens da quantização Q4

- **Muito menos memória**: um modelo de 27B em precisão completa (FP16) ocupa ~54 GB; em Q4_K_XL cai para ~16 GB — cabe numa GPU de consumo com 16 GB de VRAM, ou até roda em CPU/RAM comum.
- **Roda localmente**: sem API, sem custo por token e sem enviar seus dados para terceiros — privacidade total.
- **Inferência mais rápida**: menos bytes lidos da memória a cada token significa respostas mais rápidas e menor consumo de energia.
- **Qualidade próxima do original**: os K-quants usam precisão mista (blocos com mais bits onde o modelo é mais sensível), então a perda em relação ao modelo completo é pequena para a maioria das tarefas — inclusive geração de código, como este jogo demonstra.
- **Democratiza modelos grandes**: quem não tem acesso a datacenter consegue usar modelos de fronteira no próprio hardware.

## Rodando localmente

Basta abrir o `index.html` em qualquer navegador moderno:

```bash
# ou sirva com um servidor simples
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## 📐 Arquitetura e roadmap

Documentação detalhada da arquitetura do jogo e do histórico de desenvolvimento até a publicação: [`docs/arquitetura-e-roadmap.md`](docs/arquitetura-e-roadmap.md).
