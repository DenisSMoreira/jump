# Roadmap de produto e engenharia - Jump Mobile

> Documento de planejamento. Prazos, preços e metas são hipóteses iniciais e devem ser validados antes de virar compromisso comercial.

## 1. Objetivo do produto

Transformar o protótipo web atual em um jogo mobile original, publicável e operável no Android e iOS, com:

- aquisição mensurável de novos jogadores;
- experiência gratuita completa e sustentável;
- anúncios com frequência controlada e opção de remoção;
- microtransações exclusivamente visuais;
- acesso Premium com benefícios claros, sem vantagem competitiva;
- fases variadas, objetivos, desafios recorrentes e progressão de longo prazo;
- partidas 1x1 justas, ranqueadas e casuais;
- pagamentos nativos, restauração de compras e tratamento de reembolsos;
- telemetria, suporte, segurança, privacidade e operação contínua após a publicação.

### Resultado esperado

Ao final deste roadmap, o produto deve estar disponível na App Store e Google Play, com backend de produção, catálogo comercial, painel operacional, monitoramento, atendimento ao jogador e um calendário de conteúdo para os primeiros 90 dias.

### Princípios obrigatórios

1. **Propriedade intelectual original:** trocar nome, personagens, identidade visual, sons e qualquer referência protegida antes do primeiro teste público.
2. **Free-to-play justo:** toda mecânica que influencia uma partida deve estar disponível em condições iguais. Dinheiro compra aparência, conveniência não competitiva e conteúdo de apresentação.
3. **Mobile primeiro:** interface, controles, desempenho, consumo de bateria, interrupções e sessões curtas são requisitos de produto.
4. **Servidor autoritativo no 1x1:** o cliente envia comandos; o servidor valida estado, resultado e recompensas.
5. **Métricas com consentimento:** cada evento precisa ter objetivo, política de retenção e respeito a LGPD/GDPR e às regras das lojas.
6. **Lançamento por gates:** uma etapa só avança quando os critérios objetivos de saída forem atendidos.

## 2. Estado atual e lacunas

O projeto atual é um protótipo em um único `index.html`, executado em Canvas 2D, com resolução lógica de 400 x 600. Já existem:

- movimento por teclado, mouse e toque;
- salto automático e progressão vertical;
- plataformas normais, móveis e molas;
- foguete, inimigos e coleta de itens;
- oito ambientes progressivos: Prado, Floresta, Montanhas, Cavernas, Vulcão, Espaço, Planeta e Nebulosa;
- menu inicial, ajuda, seleção de personagem, pausa e game over;
- pontuação, recorde local e dificuldade crescente.

As principais lacunas são:

- marca e personagens não licenciados;
- arquitetura monolítica sem módulos, testes ou pipeline de build;
- física dependente de frames, inadequada para aparelhos de taxas diferentes;
- persistência apenas local e sem conta do jogador;
- ausência de economia, inventário, missões e progressão persistente;
- ausência de backend, multiplayer, anticheat e recuperação de estado;
- ausência de compras nativas, anúncios, consentimento e validação de recibos;
- ausência de acessibilidade, localização, telemetria e monitoramento;
- ausência dos materiais e processos exigidos pelas lojas.

## 3. Público e posicionamento

### Público primário

- jogadores casuais de 13 anos ou mais;
- sessões de 2 a 8 minutos;
- preferência por controle simples, progresso visível e personalização;
- consumo por descoberta orgânica, vídeos curtos, indicação e loja de aplicativos.

### Público secundário

- jogadores competitivos que buscam partidas rápidas 1x1;
- colecionadores de cosméticos;
- criadores de conteúdo interessados em desafios, temporadas e placares.

### Proposta de valor

Um jogo de escalada vertical rápido, preciso e expressivo, no qual cada tentativa muda de ritmo, a personalização é visível e o 1x1 transforma habilidade individual em disputa direta sem pay-to-win.

### Decisão sobre faixa etária

Planejar o produto para **13+** no lançamento. Se a estratégia exigir público infantil, será necessário redesenhar anúncios, consentimento, conta, chat, coleta de dados e compras conforme COPPA, LGPD para crianças e políticas específicas das lojas. Essa mudança não deve ser feita implicitamente.

## 4. Loops do jogo

### Loop de 10 segundos

1. Ler a próxima formação de plataformas.
2. Posicionar o personagem durante o salto.
3. Evitar ameaça ou coletar bônus.
4. Aterrissar e receber resposta visual, sonora e tátil.

### Loop de uma partida

1. Selecionar modo, personagem e cosméticos.
2. Jogar uma rota procedural com objetivos secundários.
3. Encerrar por queda, conclusão ou resultado do duelo.
4. Receber pontuação, experiência, moeda gratuita e progresso de missão.
5. Comparar resultado, resgatar recompensas e iniciar nova partida.

### Loop diário

1. Receber três missões diárias, com uma troca gratuita.
2. Jogar modos solo ou 1x1.
3. Completar o desafio diário com seed igual para todos.
4. Resgatar sequência diária sem punição excessiva por perda de um dia.
5. Consultar loja, eventos e progresso do passe.

### Loop de temporada

1. Subir divisões competitivas.
2. Avançar no passe gratuito e no passe cosmético pago.
3. Completar coleção temática e metas sazonais.
4. Participar de eventos de tempo limitado.
5. Receber recompensas conforme maior divisão e participação, não apenas volume de gasto.

## 5. Modos de jogo

### 5.1 Jornada solo

- sequência de capítulos com biomas e regras próprias;
- cada capítulo possui 10 fases: 7 normais, 2 desafios e 1 confronto final;
- três metas por fase, sempre possíveis sem pagamento;
- checkpoint apenas entre fases, nunca vendido no meio de uma tentativa;
- dificuldade calibrada por telemetria, sem manipulação individual para induzir compra.

Exemplos de metas:

- alcançar a saída;
- terminar acima de uma pontuação;
- coletar três fragmentos;
- não usar mola ou foguete;
- derrotar ou evitar determinado inimigo;
- terminar dentro do tempo;
- sofrer no máximo um impacto.

### 5.2 Infinito clássico

- progressão procedural contínua;
- recorde pessoal, semanal e por amigos;
- seed rotativa semanal para comparação justa;
- recompensas com limite diário para impedir farming automatizado;
- placares enviados ao backend com validação de plausibilidade.

### 5.3 Desafio diário e semanal

- mesma seed, regras e personagem-base para todos;
- modificadores como gravidade, plataformas frágeis, visibilidade reduzida e perseguição;
- uma tentativa de treino e tentativas pontuadas limitadas por dia, sem venda de tentativas competitivas;
- replay resumido dos melhores resultados para moderação e compartilhamento.

### 5.4 Eventos

- eventos de 3 a 14 dias;
- mapa, objetivos e cosméticos temáticos;
- retorno futuro claramente informado para evitar pressão enganosa;
- tabela de conteúdo configurada remotamente, sem exigir nova versão do aplicativo.

### 5.5 Partida 1x1

#### Casual

- matchmaking por região, latência e faixa ampla de habilidade;
- não altera ranking;
- permite bots identificados quando o tempo de fila ultrapassar o limite configurado;
- oferece revanche por consentimento dos dois jogadores.

#### Ranqueada

- temporadas de 6 a 8 semanas;
- rating interno com divisões públicas;
- partidas com seed, física e regras idênticas;
- equipamentos e cosméticos não alteram atributos;
- abandono, desconexão e empate possuem regras previsíveis;
- acesso inicial condicionado ao tutorial e a um número mínimo de partidas solo.

#### Sala privada

- código curto e link de convite;
- sem recompensa competitiva ou progressão explorável;
- opções de seed, duração e modificador;
- recurso liberado para todos; Premium pode ter histórico ampliado e mais presets, nunca exclusividade para jogar com amigos.

#### Formato recomendado para o MVP

- dois jogadores correm simultaneamente em instâncias espelhadas da mesma fase;
- duração máxima de 90 segundos;
- vence quem alcançar primeiro a meta ou estiver mais alto ao final;
- obstáculos compartilhados não são usados no primeiro lançamento;
- posição do adversário é exibida como fantasma e marcador lateral;
- comandos são enviados ao servidor em ticks; snapshots corrigem divergência;
- resultado e recompensa são calculados no servidor.

Esse formato reduz problemas de colisão entre jogadores e mantém a competição legível mesmo com latência móvel.

## 6. Variações de fases e desafios

### Kit de peças por bioma

Cada bioma deve definir:

- paleta, iluminação, fundo e música;
- conjunto de plataformas;
- dois elementos ambientais;
- dois inimigos comuns e um raro;
- um modificador de física ou navegação;
- um objetivo de coleção;
- uma fase final com padrão reconhecível;
- parâmetros de dificuldade e acessibilidade.

### Conteúdo de lançamento recomendado

| Bioma original | Mecânica principal | Perigo | Desafio final |
|---|---|---|---|
| Jardins Suspensos | plataformas móveis simples | rajadas laterais | corrida contra vento crescente |
| Bosque Luminoso | cipós e plataformas elásticas | criaturas que bloqueiam visão | rota de lanternas em sequência |
| Picos de Vidro | superfícies que quebram | queda de fragmentos sinalizada | subida sem reutilizar plataforma |
| Forja Abissal | correntes e elevadores | zonas de calor intermitentes | alternância entre áreas seguras |
| Estação Orbital | gravidade por setores | drones em rotas previsíveis | mudança controlada de gravidade |
| Arquipélago Celeste | portais curtos | nuvens que ocultam plataforma | seleção rápida de rotas paralelas |

### Tipos de plataforma

- estática;
- horizontal e vertical;
- frágil, com sinal visual antes de quebrar;
- temporária;
- esteira;
- alternada por cor;
- portal de entrada e saída;
- elástica;
- com vento localizado;
- que aparece por ritmo, com alternativa visual para jogadores sem áudio.

### Modificadores reutilizáveis

- gravidade leve ou pesada;
- câmera acelerada;
- perseguição vertical;
- névoa com alcance mínimo garantido;
- coleta em ordem;
- plataforma instável;
- sem power-up;
- combo por aterrissagens perfeitas;
- tempo regressivo;
- rota única versus múltiplas rotas.

### Regras de geração procedural

- toda sequência precisa ser validada como alcançável pela simulação;
- dificuldade cresce por vocabulário e combinação, não apenas por velocidade;
- não criar morte inevitável fora da tela;
- garantir área segura após tutorial de uma nova mecânica;
- registrar seed, versão do gerador e parâmetros em cada partida;
- permitir desabilitar remotamente uma combinação defeituosa.

## 7. Progressão, metas e recompensas

### Progressão de conta

- nível de conta concede moeda gratuita, cosméticos básicos e recursos de apresentação;
- nenhum nível aumenta velocidade, salto ou resistência em partidas competitivas;
- desbloqueios de modo são usados apenas para onboarding e prevenção de abuso;
- XP é concedida por conclusão, habilidade e diversidade de modos, com limite antifarming.

### Missões

- três diárias, oito semanais e quatro sazonais de longo prazo;
- missões devem aceitar múltiplos modos quando possível;
- evitar metas que exijam compra, assistir anúncio ou usar item pago;
- progresso calculado no servidor para contas online;
- uma troca diária gratuita; trocas adicionais apenas com moeda gratuita e limite baixo;
- recuperação de recompensa quando a partida terminou offline e foi sincronizada depois.

### Conquistas

- domínio de cada bioma;
- marcos de altura e precisão;
- coleções e variedade de personagens originais;
- sequência de vitórias com teto para não incentivar manipulação;
- conquistas sociais sem exigir spam de convites;
- integração opcional com Game Center e Google Play Games.

### Passe de temporada

- trilha gratuita completa e trilha paga predominantemente cosmética;
- 50 níveis em uma temporada de 6 a 8 semanas;
- compra retroativa concede itens já alcançados;
- exibir data de término e conteúdo antes da compra;
- não vender níveis no primeiro lançamento; reavaliar apenas após estudo de impacto;
- recompensas não reclamadas seguem regra pública e consistente.

## 8. Economia e monetização

### 8.1 Moedas

**Moeda gratuita - Fichas**

- obtida em partidas, missões, passe gratuito e eventos;
- usada para cosméticos comuns, rotações e itens de perfil;
- possui limites diários de ganho apenas onde houver risco de automação;
- saldo e razão de cada transação ficam em ledger no servidor.

**Moeda premium - Cristais**

- comprada por IAP ou concedida explicitamente em campanhas e suporte;
- usada em cosméticos premium e passe de temporada;
- não compra atributos, rating, vitórias, tentativas ranqueadas ou matchmaking favorável;
- saldo separado por plataforma quando as regras exigirem.

### 8.2 Microtransações visuais

Catálogo permitido:

- personagens originais e variações de roupa;
- cores, texturas e trilhas de salto;
- animações de entrada, vitória e derrota;
- efeitos de aterrissagem;
- molduras, títulos, emblemas e fundos de perfil;
- reações predefinidas e moderadas;
- temas de menu e música, respeitando acessibilidade;
- pacotes sazonais e passe cosmético.

Regras comerciais:

- mostrar preço final na moeda local;
- oferecer visualização 360 graus ou teste no menu antes da compra;
- indicar claramente compatibilidade e raridade;
- evitar caixas pagas aleatórias no lançamento;
- não usar contagem regressiva falsa, desconto permanente ou preço de referência artificial;
- registrar versão, SKU, preço, origem e recibo de cada compra;
- permitir restaurar itens em nova instalação após autenticação.

### 8.3 Modelo gratuito com anúncios

- **rewarded video:** opcional, após partida, para duplicar Fichas dentro de um limite diário;
- **rewarded video:** opcional para uma continuação em modos solo não competitivos, no máximo uma por partida;
- **intersticial:** somente em transições naturais, nunca durante controle ativo;
- iniciar com frequência máxima de um intersticial a cada três partidas e intervalo mínimo de 180 segundos;
- nunca exibir intersticial em tutorial, primeira sessão, compra, tela de consentimento ou partida 1x1;
- remover anúncios forçados para Premium e para a compra vitalícia “Sem anúncios”;
- anúncios recompensados permanecem opcionais para quem os quiser, inclusive Premium;
- banner ads não são recomendados por prejudicar área útil e precisão do controle;
- aplicar consentimento, classificação etária e tratamento de anúncios não personalizados quando exigido.

### 8.4 Acesso Premium

Modelo recomendado: assinatura mensal e anual, com teste apenas se a loja e a operação estiverem prontas para comunicar renovação e cancelamento com clareza.

Benefícios Premium propostos:

- remoção de anúncios intersticiais;
- conjunto cosmético exclusivo enquanto a assinatura estiver ativa;
- uma entrega mensal de Cristais claramente informada;
- dois presets adicionais de aparência;
- histórico ampliado de partidas e estatísticas pessoais;
- opções extras de personalização de sala privada;
- fila de suporte identificada, sem promessa de resultado diferente;
- acesso antecipado de 48 horas a eventos não competitivos;
- bônus de XP de conta limitado a desbloqueios cosméticos, sem impacto no rating.

Premium **não pode** oferecer:

- salto, velocidade, colisão ou power-up melhor;
- multiplicador de rating;
- tentativas extras em competição limitada;
- prioridade de matchmaking que prejudique usuários gratuitos;
- imunidade a regras, moderação ou cooldown;
- conteúdo necessário para completar o jogo base.

### 8.5 Hipóteses de preço

Os valores abaixo são ponto de partida para pesquisa, não decisão final:

| Oferta | Hipótese inicial no Brasil | Observação |
|---|---:|---|
| Sem anúncios, vitalício | R$ 14,90 a R$ 24,90 | remove apenas intersticiais |
| Pacote pequeno de Cristais | R$ 4,90 a R$ 7,90 | primeira compra acessível |
| Pacote médio | R$ 19,90 a R$ 29,90 | destacar valor sem preço enganoso |
| Pacote grande | R$ 49,90 a R$ 79,90 | incluir limite de gasto responsável |
| Passe de temporada | R$ 19,90 a R$ 29,90 | somente cosméticos e conveniência neutra |
| Premium mensal | R$ 14,90 a R$ 24,90 | benefícios recorrentes claros |
| Premium anual | 7 a 9 mensalidades | economia real explicitada |

Validar tiers e impostos diretamente no App Store Connect e Google Play Console. Não codificar preço no cliente.

### 8.6 Metas econômicas e guardrails

Monitorar:

- conversão de pagantes por coorte;
- receita média por usuário e por pagante;
- receita de anúncios por usuário ativo diário;
- taxa de compra por SKU;
- renovação, cancelamento, grace period e reembolso de Premium;
- emissão versus consumo de Fichas e Cristais;
- concentração de receita e limites de gasto;
- retenção comparada entre pagantes e não pagantes;
- impacto de cada oferta em reclamações, abandono e notas da loja.

Guardrails:

- nenhuma oferta pode piorar retenção D1 ou avaliação da loja de forma material;
- compras falhas não podem remover saldo do jogador;
- toda concessão paga precisa ser idempotente;
- reembolso deve revogar apenas o direito correspondente, sem saldo negativo automático;
- crianças e contas de idade desconhecida recebem tratamento conservador.

## 9. Captação e crescimento

### 9.1 Preparação de marca

- nome original pesquisável e registrável;
- ícone legível em tamanho pequeno;
- personagem-símbolo original e reconhecível em silhueta;
- paleta e linguagem visual consistentes;
- kit de capturas, vídeo, logo, fontes e guia de tom;
- domínio, landing page, e-mails de suporte e política de privacidade.

### 9.2 Canais orgânicos

- vídeos de 6 a 20 segundos com falhas, salvamentos e disputas apertadas;
- desafios semanais compartilháveis por seed;
- cartões de resultado sem dados pessoais;
- programa de criadores com códigos apenas de atribuição, sem bônus competitivo;
- Discord ou comunidade equivalente com moderação e regras;
- página de pré-registro com benefício cosmético disponível também depois por outra via;
- ASO localizado em português e inglês no lançamento.

### 9.3 Loops de indicação

- convite por link universal/deep link;
- recompensa cosmética ou Fichas após o convidado concluir onboarding e duas sessões válidas;
- limite de recompensas por período;
- antifraude por conta, dispositivo, IP com cautela e sinais agregados;
- nenhuma exigência de acessar contatos;
- opção de bloquear convites e excluir vínculo.

### 9.4 Mídia paga

- começar somente após retenção e estabilidade atingirem o gate de soft launch;
- testar criativos por tema, não apenas por pequenas variações;
- atribuição com SKAdNetwork/AdAttributionKit no iOS e solução compatível no Android;
- campanhas separadas por país, sistema, versão e público;
- teto de gasto diário e kill switch;
- otimizar por jogador retido ou comprador, não por instalação barata;
- calcular LTV conservador antes de escalar.

### 9.5 ASO e reputação

- título e descrição sem usar marcas de terceiros;
- vídeo que represente gameplay real;
- screenshots por benefício: controle, mundos, personalização, 1x1 e eventos;
- prompt de avaliação somente após momento positivo e nunca após derrota ou falha de compra;
- responder avaliações críticas com SLA e registrar temas recorrentes;
- experimentos de página da loja com uma hipótese por rodada.

## 10. Métricas e eventos

### North star

**Partidas válidas concluídas por jogador ativo semanal**, segmentadas por solo e 1x1.

### Metas iniciais para soft launch

Essas metas são referências para decisão e devem ser ajustadas por mercado:

- tutorial concluído por pelo menos 75% das novas instalações válidas;
- retenção D1 >= 30%, D7 >= 10% e D30 >= 4%;
- pelo menos 3 partidas na primeira sessão mediana;
- crash-free users >= 99,5%;
- ANR no Android abaixo do limite de má qualidade do Google Play;
- p95 de entrada em partida solo < 2 segundos em aparelho mínimo suportado;
- p95 de matchmaking 1x1 < 45 segundos nas regiões ativas;
- partidas 1x1 concluídas sem desconexão >= 95%;
- diferença de resultado cliente/servidor < 0,5%;
- nota média >= 4,2 após volume representativo;
- taxa de reembolso e reclamação de compra dentro dos limites das lojas.

### Taxonomia mínima de eventos

| Evento | Campos essenciais |
|---|---|
| `app_open` | versão, plataforma, país, origem |
| `consent_updated` | versão do texto, escolhas, região |
| `tutorial_step` | etapa, resultado, duração |
| `run_start` | modo, seed, bioma, loadout cosmético |
| `run_end` | motivo, duração, altura, score, versão do gerador |
| `mission_progress` | missão, delta, origem |
| `matchmaking_start` | modo, região, rating bucket |
| `match_found` | espera, latência estimada, bot identificado |
| `pvp_end` | resultado, duração, desconexão, divergência |
| `ad_offer` | posição, formato, elegibilidade |
| `ad_result` | rede, resultado, recompensa idempotente |
| `store_view` | origem, catálogo, experimento |
| `purchase_start` | SKU, preço local, origem |
| `purchase_result` | SKU, resultado, erro normalizado |
| `entitlement_changed` | direito, motivo, origem do servidor |
| `support_opened` | categoria, tela, sem conteúdo sensível |

Não enviar nome, e-mail, token, recibo completo, texto de chat ou identificador publicitário sem necessidade e consentimento válido.

## 11. Arquitetura técnica recomendada

### Cliente

- TypeScript;
- Phaser 3 ou camada própria pequena sobre Canvas, com preferência por Phaser para cenas, input, áudio e escala;
- Vite para build;
- Capacitor para Android/iOS;
- plugins nativos mantidos para IAP, ads, notificações, deep links e haptics;
- estado de UI separado do estado determinístico da partida;
- configuração remota com cache e valores seguros embutidos;
- assets versionados, atlas de textura e áudio comprimido por plataforma.

### Por que esta rota

Ela aproveita a lógica e experiência já existentes em JavaScript, reduz o custo do primeiro port e permite publicar binários nativos. Se profiling comprovar limites graves de desempenho ou de plugins, reavaliar engine nativa antes do 1x1, não no meio da publicação.

### Estrutura sugerida

```text
src/
  app/              bootstrap, navegação e ciclo de vida
  game/
    core/           simulação determinística e regras
    scenes/         menu, jornada, infinito, duelo
    entities/       personagem, plataforma, inimigo, pickup
    generation/     seeds, biomas e validação de rotas
    rendering/      sprites, partículas, câmera e HUD
    input/          toque, teclado de desenvolvimento e acessibilidade
  meta/             conta, inventário, missões, passe e loja
  services/         API, auth, analytics, ads, IAP, notificações
  ui/               componentes e design tokens
  config/           conteúdo local e defaults remotos
server/
  gateway/          sessão, autenticação, rate limit
  player/           perfil, progresso e inventário
  economy/          ledger, catálogo, recompensas e entitlements
  matchmaker/       filas, rating e salas
  simulation/       validação autoritativa do 1x1
  liveops/          eventos, missões e configuração
  webhooks/         Apple, Google e provedores
```

### Backend

- API versionada e autenticada;
- banco relacional para conta, inventário, entitlements e ledger;
- Redis ou equivalente para fila, presença, locks e sessões curtas;
- WebSocket para 1x1;
- armazenamento de objetos para replays compactos e conteúdo operacional;
- jobs idempotentes para recibos, reembolso, missões e temporada;
- ambientes separados: desenvolvimento, staging e produção;
- infraestrutura como código e backups testados;
- região inicial definida por público e latência, com plano de expansão.

### Conta e identidade

- permitir começar como convidado;
- gerar ID interno opaco no primeiro uso;
- oferecer vínculo com Apple e Google;
- exigir vínculo antes de recurso social sensível ou recuperação entre aparelhos;
- suportar merge seguro de conta convidada;
- oferecer restauração, exportação e exclusão;
- não depender exclusivamente de identificador do dispositivo.

### Determinismo e física

- fixed timestep independente da taxa de renderização;
- RNG com seed explícita e versão do algoritmo;
- input registrado por tick;
- física sem dependência de `Date.now()` ou FPS;
- tolerâncias numéricas documentadas entre cliente e servidor;
- replay local capaz de reproduzir uma partida a partir de seed e inputs.

### Operação e observabilidade

- logs estruturados com correlation ID;
- métricas de API, fila, WebSocket, compra e economia;
- crash reporting com release e sourcemaps protegidos;
- alertas por SLO, não por qualquer erro isolado;
- painel de receita sem expor recibos ou dados pessoais;
- kill switches para ads, loja, SKU, evento, matchmaking e recompensa;
- runbooks para incidente de compra, duplicação de saldo e queda do PvP.

## 12. Pagamentos e direitos digitais

### Fontes de compra

- StoreKit 2 no iOS;
- Google Play Billing na versão exigida no momento da publicação;
- compras digitais não devem usar checkout externo dentro do app, salvo programa/regra expressamente aplicável e validada por jurídico;
- webhooks/Server Notifications da Apple e Real-time Developer Notifications do Google;
- endpoint de backend para validar transação e conceder entitlement.

### Fluxo obrigatório

1. Cliente solicita produtos da loja e exibe preço retornado pela própria loja.
2. Jogador confirma no sheet nativo.
3. Cliente recebe transação e envia prova ao backend.
4. Backend valida com Apple/Google, verifica ambiente, SKU, conta e duplicidade.
5. Backend registra transação imutável e concede o direito de forma idempotente.
6. Cliente sincroniza entitlements e finaliza/acknowledges a compra.
7. Notificações posteriores atualizam renovação, grace period, cancelamento e reembolso.

### Casos que precisam de teste explícito

- compra aprovada, recusada, cancelada e pendente;
- perda de conexão antes e depois da confirmação;
- toque duplicado e callback repetido;
- compra em sandbox versus produção;
- restauração em novo aparelho;
- troca de conta no mesmo aparelho;
- assinatura expirada, renovada, em grace period, pausada e reembolsada;
- compra Ask to Buy no iOS;
- compra pendente no Google Play;
- SKU removido ou preço alterado;
- webhook fora de ordem;
- concessão já realizada;
- exclusão de conta com obrigação fiscal de retenção.

### Modelo de dados mínimo

- `store_transaction_id` único;
- plataforma, ambiente, SKU e tipo de produto;
- player ID interno;
- horário da loja e horário de processamento;
- status normalizado;
- entitlement concedido e período de validade;
- transação original para assinaturas;
- referência de reembolso/revogação;
- payload original criptografado ou referência segura, com retenção definida;
- trilha de auditoria administrativa.

## 13. Segurança, privacidade e confiança

### Segurança

- segredos somente em secret manager e CI protegido;
- TLS em trânsito e criptografia de dados sensíveis em repouso;
- rotação de chaves e menor privilégio;
- rate limit por rota, conta e sinais de dispositivo;
- validação de schema em toda entrada;
- catálogo, recompensa e preço nunca confiados ao cliente;
- painel administrativo com MFA, RBAC e auditoria;
- dependências monitoradas e processo de atualização;
- plano de resposta a incidente e canal de reporte de vulnerabilidade.

### Anticheat

- servidor decide resultado, rating, moeda e missão;
- plausibilidade de movimento e cadência por tick;
- assinatura/versionamento do build e bloqueio remoto de versões vulneráveis;
- detecção gradual: observar, limitar, revisar e só então punir;
- separar fila de suspeitos sem revelar regra de detecção;
- apelação e reversão administrativa;
- não usar sinais invasivos ou coleta excessiva no dispositivo.

### Privacidade

- inventário de dados e base legal por finalidade;
- consentimento granular onde necessário;
- política de privacidade acessível antes e depois do cadastro;
- Data Safety do Google e App Privacy da Apple coerentes com SDKs reais;
- exclusão de conta dentro do app e página web de solicitação quando exigida;
- prazo de retenção e anonimização;
- contratos/DPA com fornecedores;
- fluxo de incidente e comunicação;
- revisão específica para menores e idade desconhecida.

### Social e moderação

No MVP, não incluir chat livre. Usar reações predefinidas, bloqueio, denúncia por categorias e nome público gerado/moderado. Chat livre adicionaria moderação 24/7, filtros, evidência, apelação e riscos incompatíveis com o primeiro lançamento.

## 14. UX mobile, acessibilidade e qualidade

### Controles

- oferecer arraste relativo e inclinação como opções, com arraste como padrão;
- calibração e sensibilidade configuráveis;
- zonas de toque sem depender do tamanho visual do botão;
- feedback tátil configurável;
- pausa automática ao perder foco em modo solo;
- regra explícita de reconexão em 1x1;
- suporte a safe areas, notch, barras e orientações definidas.

### Acessibilidade

- contraste compatível com WCAG para UI fora da ação;
- não depender apenas de cor;
- redução de movimento, shake e flashes;
- controle de volume separado para música, efeitos e interface;
- legendas/texto para pistas sonoras;
- tamanho de UI escalável;
- modo de alto contraste para plataformas e inimigos;
- linguagem simples e localização sem texto rasterizado;
- haptics opcionais, nunca única forma de feedback.

### Orçamento de desempenho

- 60 FPS estáveis no aparelho mínimo; modo 30 FPS eficiente se necessário;
- memória máxima definida após escolher matriz de aparelhos;
- pacote inicial pequeno, com conteúdo posterior sob demanda quando viável;
- carregamento inicial p95 < 5 segundos em rede móvel mediana;
- nenhuma alocação grande no loop principal;
- consumo de bateria medido em sessão de 20 minutos;
- degradação visual automática, não de regra física.

### Matriz mínima

- Android: aparelhos de entrada, intermediários e topo, múltiplas GPUs e versões suportadas;
- iOS: aparelho mínimo suportado, aparelho com notch e geração atual;
- redes: Wi-Fi, 4G/5G, alta latência, jitter, perda e troca de rede;
- estados: pouca bateria, pouco armazenamento, interrupção, ligação, background e retomada;
- contas: convidado, vinculada, infantil quando aplicável, banida, excluída e com compra pendente.

## 15. Roadmap por fases

Estimativa-base: **28 semanas até lançamento global**, assumindo equipe mínima de 2 clientes/gameplay, 2 backend, 1 game designer, 1 artista/animador, 1 UI/UX, QA compartilhado, produto/live ops e apoio jurídico/financeiro. Uma equipe menor deve reduzir escopo ou ampliar prazo.

### Fase 0 - definição, marca e viabilidade (semanas 1-2)

Entregas:

- nome temporário e processo de escolha de marca original;
- inventário de propriedade intelectual e plano de substituição;
- público, classificação etária e países do soft launch;
- P&L preliminar, orçamento de infraestrutura e aquisição;
- decisão de stack e prova curta de Capacitor + Phaser em aparelho real;
- cadastro de IDs de pacote provisórios;
- mapa de dados e fornecedores candidatos;
- especificação do MVP e lista explícita do que fica fora.

Gate de saída:

- nenhuma dependência de marca/personagem de terceiro para o vertical slice;
- stack roda no Android e iOS com input, áudio, suspensão e retomada;
- owner e orçamento aprovados;
- riscos críticos do documento de pendências têm responsável.

### Fase 1 - fundação mobile e port do núcleo (semanas 3-6)

Entregas:

- projeto TypeScript modular;
- fixed timestep e RNG por seed;
- cenas de bootstrap, menu, jogo, pausa e resultado;
- controles touch e inclinação configuráveis;
- escala responsiva, safe areas e orientação;
- áudio, haptics, ciclo de vida e salvamento local versionado;
- pipeline CI com builds internos assinados;
- telemetria essencial e crash reporting em ambiente de desenvolvimento;
- personagem e um bioma inteiramente originais.

Gate de saída:

- partida reproduzível com mesma seed e inputs;
- 30 minutos sem crescimento anormal de memória;
- 60 FPS no aparelho Android mínimo selecionado;
- retomada não duplica recompensa nem corrompe save;
- build interno instalável pelos canais oficiais de teste.

### Fase 2 - vertical slice de produto (semanas 7-10)

Entregas:

- onboarding completo;
- Jornada com um capítulo de 10 fases;
- Infinito clássico;
- três personagens originais e conjunto básico de cosméticos;
- conta convidada, vínculo Apple/Google e sync de progresso;
- backend de perfil, save e configuração remota;
- missões diárias em versão inicial;
- acessibilidade e localização PT-BR/EN desde a base;
- protótipo de loja sem dinheiro real.

Gate de saída:

- novos jogadores concluem tutorial sem assistência em teste moderado;
- progresso restaura em segundo aparelho;
- nenhuma compra simulada altera regra da partida;
- eventos críticos aparecem corretamente no funil.

### Fase 3 - conteúdo e metajogo (semanas 11-15)

Entregas:

- pelo menos quatro biomas finalizados e dois em produção;
- 40 fases de Jornada e gerador procedural validado;
- missões diárias, semanais e conquistas;
- nível de conta, inventário, Fichas e ledger;
- desafio diário por seed;
- passe de temporada sem compra habilitada;
- notificações opt-in e deep links;
- ferramentas internas para editar catálogo, missão, fase e evento;
- painel de atendimento para consultar conta e conceder compensação auditada.

Gate de saída:

- economia passa por simulação de 30 e 90 dias;
- nenhuma seed conhecida gera rota impossível;
- conteúdo pode ser ativado/desativado sem nova versão;
- save offline reconcilia sem duplicação.

### Fase 4 - monetização e pagamentos (semanas 16-19)

Entregas:

- SDK de anúncios com consentimento e kill switch;
- rewarded e intersticial nos pontos definidos;
- produtos IAP consumíveis, não consumíveis e assinatura;
- validação de recibo e webhooks no backend;
- restauração, reembolso, grace period e compra pendente;
- loja final, visualização de cosméticos e histórico de transação;
- Premium e “Sem anúncios”;
- limites de oferta, frequência e gasto;
- políticas, termos, suporte e FAQ de cobrança.

Gate de saída:

- matriz completa de compras passa em sandbox nas duas plataformas;
- callback repetido não duplica entitlement;
- preço sempre vem da loja;
- compra restaurada funciona após reinstalação;
- kill switch desativa cada superfície comercial.

### Fase 5 - multiplayer 1x1 (semanas 20-23)

Entregas:

- simulação autoritativa e protocolo versionado;
- casual, ranqueada e sala privada;
- matchmaking por rating, região e latência;
- reconexão, abandono, empate e bot identificado;
- rating, divisões e recompensas sazonais;
- ghost do adversário e placar legível;
- replay compacto, detecção de plausibilidade e denúncia;
- testes de carga, perda de pacote e atualização incompatível.

Gate de saída:

- resultado é consistente entre servidor e clientes;
- p95 de latência e matchmaking atende região de teste;
- nenhuma recompensa depende do valor informado pelo cliente;
- queda de um serviço degrada para solo sem corromper conta;
- capacidade suporta pelo menos 3 vezes o pico projetado de soft launch.

### Fase 6 - alpha, soft launch e balanceamento (semanas 24-26)

Entregas:

- alpha fechado com equipe, convidados e criadores sob acordo;
- TestFlight e trilhas de teste do Google Play;
- soft launch em um ou dois mercados coerentes com idioma e infraestrutura;
- testes de onboarding, preço, anúncio e dificuldade com guardrails;
- correções de estabilidade e aparelhos;
- treinamento de suporte, moderação e incidentes;
- validação de retenção, economia e custos de servidor.

Gate de saída:

- metas mínimas de estabilidade atendidas por duas versões consecutivas;
- retenção e conclusão de tutorial atingem patamar de decisão;
- pagamentos, anúncios e exclusão de conta funcionam em produção limitada;
- suporte responde dentro do SLA;
- incidentes críticos possuem runbook e owner.

### Fase 7 - submissão e lançamento global (semanas 27-28)

Entregas:

- página de loja, screenshots, preview, classificação e declarações de dados;
- revisão final jurídica, fiscal e de SDKs;
- contas de reviewer e instruções de acesso;
- rollout gradual: 5%, 20%, 50% e 100%, condicionado a métricas;
- campanha orgânica e mídia paga limitada;
- evento de lançamento e calendário dos primeiros 30 dias;
- sala de acompanhamento de incidentes e relatórios diários.

Gate de conclusão:

- aprovação nas duas lojas;
- crash-free, ANR, backend, pagamentos e avaliação dentro dos guardrails;
- rollback/pausa de rollout testados;
- plantão e comunicação de incidentes ativos;
- conteúdo dos próximos 30 dias pronto.

## 16. Plano de operação pós-lançamento

### Primeiros 7 dias

- acompanhar crash, ANR, login, fila, compra e webhooks em tempo quase real;
- congelar mudanças econômicas não emergenciais;
- corrigir somente problemas críticos com rollout controlado;
- responder avaliações e tickets de cobrança prioritariamente;
- publicar status quando incidente afetar compras ou acesso.

### Dias 8 a 30

- primeiro desafio semanal e evento curto;
- ajuste de onboarding e dificuldade baseado em coortes;
- primeira rotação de loja previamente preparada;
- relatório de fraude, reembolso e saúde da economia;
- retrospectiva de lançamento e decisão de mídia paga.

### Dias 31 a 60

- início da primeira temporada completa;
- novo bioma ou pacote substancial de fases;
- melhoria do matchmaking por distribuição real de rating;
- experimentos de aquisição somente após estabilidade;
- revisão de preço e valor de Premium sem retirar direitos comprados.

### Dias 61 a 90

- torneio assíncrono ou evento comunitário;
- expansão de idioma/país condicionada a suporte e localização;
- avaliação de guildas, espectador ou obstáculos compartilhados como pesquisa, não compromisso;
- roadmap público resumido para a comunidade;
- revisão trimestral de privacidade, custos e fornecedores.

### Cadência contínua

- hotfix: apenas estabilidade, segurança e bloqueio comercial;
- semanal: missão, desafio, rotação e comunicação;
- quinzenal: patch de balanceamento e qualidade;
- temporada: conteúdo, passe, ranking e campanha;
- trimestral: revisão de arquitetura, privacidade, preços e portfolio de SDKs.

## 17. Backlog de epics e critérios de aceite

### EPIC-01 - identidade original

- nome, personagens, arte, música e narrativa sem material de terceiros;
- busca de marca e parecer jurídico documentados;
- arquivos-fonte e licenças armazenados;
- termos de cessão assinados por colaboradores;
- nenhuma string ou metadata antiga no binário e nas lojas.

### EPIC-02 - núcleo determinístico

- simulação em fixed timestep;
- seed e versão registradas;
- replay produz mesmo resultado dentro de tolerância;
- render pode operar a taxa diferente da simulação;
- regras cobertas por testes automatizados de colisão, salto e geração.

### EPIC-03 - shell mobile

- Android/iOS instalam por canais internos;
- safe areas e lifecycle corretos;
- input touch calibrado;
- deep links, notificações e permissões explicados no contexto;
- app inicia offline e informa limites de rede.

### EPIC-04 - conta e save

- convidado joga sem cadastro obrigatório;
- vínculo preserva o save existente;
- conflito de save apresenta regra segura;
- restauração e exclusão funcionam;
- tokens são renovados e revogados com segurança.

### EPIC-05 - conteúdo

- editor/schema valida cada fase;
- fases possuem meta, dificuldade e acessibilidade;
- gerador rejeita rota impossível;
- conteúdo tem versionamento e rollback;
- localização não quebra layout.

### EPIC-06 - economia

- ledger imutável com razão e referência;
- transação é idempotente;
- cliente nunca define saldo;
- suporte concede compensação com limite e auditoria;
- dashboard detecta emissão anormal.

### EPIC-07 - loja e Premium

- catálogo vem do backend e preço vem da loja;
- preview corresponde ao item entregue;
- direitos persistem após reinstalação;
- assinatura mostra duração, renovação e cancelamento;
- ausência de Premium não bloqueia competição justa.

### EPIC-08 - anúncios

- consentimento aplicado antes de inicialização quando necessário;
- primeira sessão não tem intersticial;
- cap funciona entre sessões;
- recompensa é concedida uma vez após confirmação;
- falha do provedor não impede jogar.

### EPIC-09 - 1x1

- mesmas seed e regras;
- servidor calcula resultado e rating;
- reconexão e abandono documentados;
- versão incompatível não entra na mesma partida;
- carga e fraude monitoradas.

### EPIC-10 - live ops

- evento pode ser agendado, pausado e revertido;
- dupla aprovação para mudanças de preço ou economia;
- preview em staging;
- timezone explícito em início e fim;
- configuração inválida cai para default seguro.

### EPIC-11 - dados e experimentos

- dicionário de eventos versionado;
- consentimento filtra coleta;
- cada experimento tem hipótese, owner, métrica e guardrail;
- usuário permanece na mesma variante;
- resultado é analisado por coorte, sem p-hacking.

### EPIC-12 - publicação e suporte

- metadata e política refletem o aplicativo real;
- conta de reviewer funciona;
- FAQ de compra, restauração e exclusão publicada;
- suporte possui IDs de diagnóstico sem acesso a segredo;
- rollout e rollback têm responsáveis.

## 18. Fora do escopo do primeiro lançamento

- chat de texto ou voz;
- troca de itens entre jogadores;
- marketplace com dinheiro real;
- clãs/guildas;
- modo espectador ao vivo;
- obstáculos enviados diretamente ao oponente;
- cross-play com desktop/console;
- criação pública de fases;
- loot boxes pagas;
- NFTs, tokens negociáveis ou blockchain;
- vantagens de gameplay vendidas.

Esses itens só devem entrar após justificativa de produto, análise de segurança/moderação e impacto operacional.

## 19. Definição de pronto para publicação

O jogo só está pronto quando:

- propriedade intelectual e contratos estão liberados;
- builds de produção são reproduzíveis e assinados com acesso controlado;
- privacidade, termos, classificação e declarações das lojas conferem com o binário;
- compras, restauração, renovação e reembolso funcionam ponta a ponta;
- conta, exportação e exclusão estão operacionais;
- solo funciona com degradação aceitável durante indisponibilidade do backend;
- 1x1 falha com mensagem clara e sem perda indevida;
- suporte, incidentes, backups e recuperação foram ensaiados;
- métricas mínimas do soft launch foram atingidas ou houve decisão formal de exceção;
- conteúdo dos 30 dias seguintes está pronto e dos 60 dias seguintes está especificado;
- há owner de produto, engenharia, economia, segurança, suporte e publicação durante o rollout.
