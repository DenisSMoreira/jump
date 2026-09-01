# Checklist de implementação — Skybound Mobile

Atualizado em 2026-08-31. Este checklist separa o que foi implementado e testável no repositório do que exige contas, infraestrutura, validação jurídica ou aprovação externa. A lista operacional completa de bloqueios está em `PENDENCIAS_E_ACESSOS.md`.

## Experiência jogável local

- [x] Identidade local original: Skybound // Ascensão, seis biomas e três avatares cosméticos sem nomes de franquias no entrypoint.
- [x] Tela mobile em retrato, safe areas, navegação por toque, arraste relativo, inclinação opcional com permissão, sensibilidade, botões de direção e teclado de desenvolvimento.
- [x] Pausa segura em perda de foco/background; pointer cancel libera os controles.
- [x] Jogo solo, Infinito, Jornada, desafio diário e duelo local de seed espelhada claramente identificado como offline.
- [x] Tutorial obrigatório e Jornada com seis capítulos de dez fases cada (60 fases locais), com desbloqueio sequencial e metas sem pagamento.
- [x] Plataformas móveis, elásticas, frágeis, temporárias, esteiras, portais, vento, alternância e ritmo; perigos sinalizados e modificadores diários locais.
- [x] Duelo local possui corrida de 90 segundos, rival fantasma determinístico e resultado sem qualquer alegação de matchmaking online.
- [x] Geração procedural por seed, RNG versionado e metadados de seed/versão em cada execução.
- [x] Simulação em timestep fixo de 60 Hz, desacoplada da taxa de renderização e limitada contra espiral de atualização.
- [x] Registro comprimido de entradas, últimos dez replays locais e exportação de diagnóstico.
- [x] Save local versionado, recorde, XP, nível, desbloqueio de zonas, inventário e cosmético equipado.
- [x] Três missões diárias resgatáveis, oito missões semanais, conquistas e passe gratuito local de 50 níveis.
- [x] Fichas ganhas apenas por jogo/objetivos; cosméticos não alteram física, salto, velocidade, rating ou matchmaking.
- [x] Premium e anúncio recompensado explicitamente simulados, com recompensa persistente limitada a uma por dia.
- [x] Consentimento local para telemetria, redução de movimento, alto contraste, haptics, volumes separados e tamanho de UI configuráveis.
- [x] Preferência de idioma PT-BR/EN com localização local das superfícies principais; revisão linguística de produção permanece pendente.
- [x] Compartilhamento nativo com fallback para cópia, deep links por hash e PWA com cache offline do shell e extensão.

## Arquivos e qualidade local

- [x] `index.html` e `mobile.html` apontam para a mesma extensão de regras e metajogo.
- [x] `enhancements.js` concentra o timestep fixo, ciclo de vida, progressão adicional e replay sem alterar o protótipo base.
- [x] `sw.js` cacheia os dois entrypoints e a extensão para abertura offline.
- [x] Manifest e ícone PWA presentes.
- [x] Smoke test em Node exercita tutorial, campanha, replay por tick, capítulo com perigos, desafio diário e duelo local determinístico.
- [x] `npm run verify` valida sintaxe e smoke test; workflow de CI é executável no repositório remoto.
- [x] Documentação do repositório deixa de apresentar o produto como clone de uma marca de terceiros.

## Dependências externas não simuláveis neste repositório

- [ ] Busca/registro de marca, inventário de licenças e parecer jurídico — `PENDENCIAS_E_ACESSOS.md`, BLK-001 a BLK-003 e seção 6.
- [ ] Contas Apple/Google, assinatura de binários, TestFlight/Play Console e configuração de loja — BLK-004, BLK-005 e seção 14.
- [ ] Backend autoritativo, autenticação, sync entre aparelhos, ledger, banco, Redis e observabilidade — BLK-008 e seções 7/8.
- [ ] StoreKit, Google Play Billing, recibos, webhooks, restauração, reembolso e catálogo com preço local — BLK-010 e seção 9.
- [ ] Mediation/CMP, anúncios reais, consentimento regional e `app-ads.txt` — seção 10.
- [ ] Matchmaking, WebSocket, servidor autoritativo, rating, reconexão, carga e anticheat online — BLK-011 e seção 11.
- [ ] Política de privacidade, termos, classificação, DPA, Data Safety/App Privacy, exportação e exclusão de conta em produção — BLK-009/012 e seção 13.
- [ ] QA em aparelhos reais, métricas de soft launch, suporte, plantão, conteúdo de 30/60/90 dias e submissão global — seções 7, 12, 14 e 20.

Nenhum item acima deve ser tratado como implementado pela demonstração local. O gate de publicação permanece bloqueado até que a evidência exigida em `PENDENCIAS_E_ACESSOS.md` exista.
