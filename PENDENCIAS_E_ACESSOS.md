# Pendências, bloqueios e acessos - Jump Mobile

> Documento operacional. Não registrar senhas, tokens, chaves privadas, recibos ou dados pessoais aqui. Guardar segredos em um cofre corporativo e referenciar somente o nome do item.

## 1. Como usar este documento

Atualizar este arquivo em toda reunião de produto/publicação. Cada item precisa de:

- **owner:** uma pessoa responsável, não “equipe”;
- **prazo:** data no formato `AAAA-MM-DD`;
- **status:** `NÃO INICIADO`, `EM ANDAMENTO`, `BLOQUEADO`, `EM VALIDAÇÃO` ou `CONCLUÍDO`;
- **evidência:** link interno para contrato, ticket, configuração ou aprovação;
- **próxima ação:** passo objetivo que move o item;
- **dependência:** pessoa, decisão ou acesso necessário.

Prioridades:

- **P0:** impede teste, submissão, pagamento ou publicação;
- **P1:** risco alto de qualidade, receita, segurança ou prazo;
- **P2:** importante para escala ou operação pós-lançamento;
- **P3:** melhoria sem impacto imediato no lançamento.

## 2. Bloqueios executivos atuais

| ID | Prioridade | Bloqueio | Impacto | Resolução exigida | Critério de desbloqueio | Owner | Prazo | Status |
|---|---|---|---|---|---|---|---|---|
| BLK-001 | P0 | Nome “Doodle Jump” no produto atual | risco de marca e rejeição/remoção | escolher marca original e realizar busca jurídica | nome aprovado, domínio e IDs reservados | A DEFINIR | A DEFINIR | NÃO INICIADO |
| BLK-002 | P0 | Personagens Marvel no seletor atual | uso comercial depende de licença | remover Homem-Aranha, Homem de Ferro, Capitão América e Hulk; criar elenco original | assets, strings e metadata sem personagens de terceiros | A DEFINIR | A DEFINIR | NÃO INICIADO |
| BLK-003 | P0 | Direitos sobre arte, áudio, fonte e código não inventariados | impossibilidade de comprovar titularidade | produzir inventário e contratos de cessão/licença | parecer jurídico e pasta de evidências completos | A DEFINIR | A DEFINIR | NÃO INICIADO |
| BLK-004 | P0 | Não há conta Apple Developer/App Store Connect definida | impede assinatura, TestFlight, IAP e publicação iOS | abrir conta como organização e concluir verificações | Agreements/Tax/Banking ativos | A DEFINIR | A DEFINIR | NÃO INICIADO |
| BLK-005 | P0 | Não há conta Google Play Console definida | impede testes oficiais, Billing e publicação Android | abrir conta de organização e concluir verificação | perfil verificado e payments profile ativo | A DEFINIR | A DEFINIR | NÃO INICIADO |
| BLK-006 | P0 | Entidade jurídica e recebedor não definidos | bloqueia contratos, impostos e repasses | definir empresa, país fiscal, banco e contador | dados aceitos pelas duas lojas | A DEFINIR | A DEFINIR | NÃO INICIADO |
| BLK-007 | P0 | Stack mobile e IDs de pacote não aprovados | bloqueia integrações e builds | aprovar TypeScript/Phaser/Capacitor ou alternativa | prova em Android/iOS e ADR assinado | A DEFINIR | A DEFINIR | NÃO INICIADO |
| BLK-008 | P0 | Backend/hosting e região não definidos | bloqueia conta, economia, pagamentos e 1x1 | escolher provedor, regiões e orçamento | dev/staging/prod provisionados por IaC | A DEFINIR | A DEFINIR | NÃO INICIADO |
| BLK-009 | P0 | Política de privacidade, termos e exclusão inexistentes | rejeição nas lojas e risco LGPD | jurídico redige e produto implementa fluxos | URLs públicas e fluxo testado | A DEFINIR | A DEFINIR | NÃO INICIADO |
| BLK-010 | P0 | Catálogo, preços e benefícios Premium não aprovados | impede configurar IAP | aprovar SKUs, direitos e territórios | catálogo espelhado e validado em sandbox | A DEFINIR | A DEFINIR | NÃO INICIADO |
| BLK-011 | P1 | Escopo e regra final do 1x1 não congelados | risco de reescrita cliente/servidor | aprovar formato espelhado, duração e ranking | GDD e protocolo v1 aprovados | A DEFINIR | A DEFINIR | NÃO INICIADO |
| BLK-012 | P1 | Classificação etária e política para menores indefinidas | muda anúncios, conta e dados | decidir 13+ ou fluxo infantil | parecer e questionários preliminares completos | A DEFINIR | A DEFINIR | NÃO INICIADO |
| BLK-013 | P1 | Orçamento e equipe não aprovados | cronograma de 28 semanas não é executável | definir headcount, fornecedores e teto mensal | responsáveis alocados por fase | A DEFINIR | A DEFINIR | NÃO INICIADO |
| BLK-014 | P1 | Países de soft launch não definidos | impede localização, infraestrutura e aquisição | selecionar mercados por idioma, custo e latência | países, moeda, suporte e metas documentados | A DEFINIR | A DEFINIR | NÃO INICIADO |

## 3. Decisões pendentes

| ID | Decisão | Recomendação inicial | Alternativas | Dados necessários | Decisor | Data limite | Status |
|---|---|---|---|---|---|---|---|
| DEC-001 | Nome e universo visual | marca e elenco 100% originais | licenciar IP formalmente | busca de marca, domínio, custo jurídico | A DEFINIR | A DEFINIR | ABERTA |
| DEC-002 | Engine/cliente | Phaser 3 + TypeScript + Capacitor | engine própria, Godot, Unity | spike em aparelhos, IAP, ads e tamanho | Tech Lead | A DEFINIR | ABERTA |
| DEC-003 | Orientação | retrato bloqueado no gameplay | retrato com menus adaptativos | teste de controle e mídia de loja | Produto/UX | A DEFINIR | ABERTA |
| DEC-004 | Login | convidado + Apple/Google | e-mail/password, passkey | recuperação, suporte, custo | Produto/Segurança | A DEFINIR | ABERTA |
| DEC-005 | Backend | serviço gerenciado + Postgres + Redis | BaaS integral, Kubernetes | capacidade, latência, equipe, custo | Tech Lead | A DEFINIR | ABERTA |
| DEC-006 | Região inicial | próxima do soft launch | multi-região desde início | distribuição de público e p95 | Backend/Produto | A DEFINIR | ABERTA |
| DEC-007 | Rating | Glicko-2 ou Elo calibrado | TrueSkill | simulação e tamanho de população | Game Design/Data | A DEFINIR | ABERTA |
| DEC-008 | Premium | mensal + anual, sem vantagem competitiva | vitalício, passe apenas | pesquisa de preço e valor percebido | Produto/Financeiro | A DEFINIR | ABERTA |
| DEC-009 | Sem anúncios | compra vitalícia separada | somente via Premium | pesquisa e impacto de receita | Produto | A DEFINIR | ABERTA |
| DEC-010 | Ads | rewarded + intersticial com cap | somente rewarded | retenção e eCPM do soft launch | Produto/Data | A DEFINIR | ABERTA |
| DEC-011 | Passe | temporada de 6 a 8 semanas | sem passe no lançamento | capacidade de produção de conteúdo | Produto/Arte | A DEFINIR | ABERTA |
| DEC-012 | Chat | sem chat livre no MVP | reações, chat filtrado | custo de moderação e faixa etária | Trust & Safety | A DEFINIR | ABERTA |
| DEC-013 | Idiomas | PT-BR e EN | ES adicional | mercados de soft/global launch | Produto | A DEFINIR | ABERTA |
| DEC-014 | Aparelho mínimo | definir por teste e mercado | alcance maior com modo 30 FPS | dados de aparelhos e profiling | Tech Lead | A DEFINIR | ABERTA |
| DEC-015 | País fiscal | sede operacional existente | nova entidade | jurídico, contador e sócios | Diretoria | A DEFINIR | ABERTA |

## 4. Matriz de acessos necessários

Aplicar MFA em todas as contas críticas. Preferir contas corporativas nominativas e grupos; não compartilhar usuário/senha. Manter pelo menos dois administradores para continuidade e usar menor privilégio.

### 4.1 Código e entrega

| Sistema | Acesso necessário | Papel mínimo | Uso | Owner primário | Backup | Estado |
|---|---|---|---|---|---|---|
| GitHub/GitLab | organização e repositório | Admin restrito + Write por equipe | código, revisão, releases | A DEFINIR | A DEFINIR | PENDENTE |
| CI/CD | pipelines e secrets protegidos | Maintainer | builds, testes e deploy | A DEFINIR | A DEFINIR | PENDENTE |
| Registro de artefatos | leitura/escrita por CI | Service account | imagens, pacotes e sourcemaps | A DEFINIR | A DEFINIR | PENDENTE |
| Assinatura Android | upload key em cofre | acesso por CI autorizado | AAB de produção | A DEFINIR | A DEFINIR | PENDENTE |
| Assinatura iOS | certificados/perfis via processo gerenciado | App Manager/Developer | archive e distribuição | A DEFINIR | A DEFINIR | PENDENTE |
| Cofre de segredos | vault corporativo | Admin duplo | chaves e tokens | A DEFINIR | A DEFINIR | PENDENTE |

### 4.2 Lojas e pagamentos

| Sistema | Cadastro/acesso | Dependências | Quem deve ter acesso | Estado |
|---|---|---|---|---|
| Apple Developer | organização verificada | entidade, D-U-N-S quando aplicável, contato legal | Account Holder + Admin backup | PENDENTE |
| App Store Connect | app, bundle ID, IAP e assinaturas | Agreements, Tax and Banking | Account Holder, App Manager, Finance, Support | PENDENTE |
| Apple App Store Server API/Notifications | chave e endpoint | backend de produção e URL pública | service account + backend owner | PENDENTE |
| Google Play Console | organização verificada | identidade e taxa de cadastro | Admin + Release Manager backup | PENDENTE |
| Google Payments Profile | merchant e banco | fiscal, banco e beneficiário | Financeiro + Admin | PENDENTE |
| Google Play Billing/RTDN | service account, Pub/Sub e API | projeto cloud vinculado | backend owner com mínimo privilégio | PENDENTE |
| Banco recebedor | conta empresarial | KYC e dados fiscais | Financeiro e representante legal | PENDENTE |
| Contabilidade/fiscal | relatórios e notas aplicáveis | entidade e mercados | Financeiro/contador | PENDENTE |

### 4.3 Infraestrutura e dados

| Sistema | Recursos | Acesso mínimo | Controles | Estado |
|---|---|---|---|---|
| Cloud | projetos dev/staging/prod | grupos separados | MFA, budget alert, audit log | PENDENTE |
| DNS/domínio | domínio principal e subdomínios | DNS editor | registrar lock e renovação automática | PENDENTE |
| Banco de dados | clusters e backups | app role sem DDL em produção | criptografia, PITR, rotação | PENDENTE |
| Redis/filas | instâncias por ambiente | service account | rede privada, TTL e limites | PENDENTE |
| Object storage/CDN | assets, replays e exports | scoped read/write | lifecycle e URLs assinadas | PENDENTE |
| Observabilidade | logs, métricas, traces e alertas | Read para suporte, Admin para SRE | retenção e redaction | PENDENTE |
| Crash reporting | projetos mobile | Developer/Viewer | sourcemaps protegidos | PENDENTE |
| Analytics/warehouse | eventos e dashboards | papéis por finalidade | consentimento, retenção, RBAC | PENDENTE |
| Configuração remota | flags e conteúdo | Editor com dupla aprovação | histórico e rollback | PENDENTE |

### 4.4 Aquisição, anúncios e comunicação

| Sistema | Uso | Requisito | Estado |
|---|---|---|---|
| Rede/mediation de ads | rewarded e intersticial | contrato, app-ads.txt, consentimento, sellers.json | PENDENTE |
| CMP/consentimento | escolhas por região | vendors e textos aprovados | PENDENTE |
| Atribuição mobile | campanhas e deep links | SKAN/AdAttributionKit e Android Privacy Sandbox compatível | PENDENTE |
| Site/landing page | pré-registro, privacidade e suporte | domínio, CMS/hosting e analytics consentido | PENDENTE |
| E-mail transacional | conta, segurança e suporte | domínio autenticado SPF/DKIM/DMARC | PENDENTE |
| Push | notificações opt-in | APNs e FCM | PENDENTE |
| Redes sociais | aquisição e comunidade | contas corporativas, MFA e backup | PENDENTE |
| Suporte | tickets e base de conhecimento | SLA, macros e política de dados | PENDENTE |
| Status page | incidentes públicos | integração monitorada e owner de comunicação | PENDENTE |

### 4.5 Criação e jurídico

| Sistema/material | Necessidade | Evidência esperada | Estado |
|---|---|---|---|
| Ferramenta de design | UI, ícone e screenshots | arquivos-fonte e exportações | PENDENTE |
| Repositório de assets | arte, animação, áudio e fontes | histórico, licença e autor | PENDENTE |
| Biblioteca musical/SFX | trilha e efeitos licenciados/originais | licença comercial e territórios | PENDENTE |
| Contratos de colaboradores | cessão de direitos e confidencialidade | assinatura válida | PENDENTE |
| Registro/busca de marca | nome e logo | parecer e protocolo quando decidido | PENDENTE |
| Política de privacidade | app e site | versão, data e URL | PENDENTE |
| Termos de uso/EULA | conta, conteúdo e competição | versão, data e URL | PENDENTE |
| DPA de fornecedores | tratamento de dados | contrato e subprocessadores | PENDENTE |
| Política de reembolso/suporte | compras digitais | FAQ alinhado às lojas | PENDENTE |

## 5. Segredos e credenciais a provisionar

Não inserir os valores neste arquivo. Para cada item, registrar no cofre: nome, ambiente, owner, data de criação, expiração, escopo, sistema consumidor e procedimento de rotação.

- credenciais de assinatura/release Android;
- credenciais e chaves de distribuição iOS;
- chaves da App Store Server API;
- credenciais da Google Play Developer API;
- tópico/assinatura de RTDN;
- secrets de autenticação e assinatura de sessão;
- chaves de criptografia por ambiente;
- credenciais de banco e Redis;
- tokens de deploy e registry;
- DSN de crash reporting;
- tokens de analytics e configuração remota;
- credenciais de ads e atribuição;
- APNs key e credenciais FCM;
- provedor de e-mail;
- webhook de suporte/status;
- credenciais administrativas de emergência em conta break-glass.

Checklist de controle:

- [ ] ambientes usam chaves diferentes;
- [ ] nenhuma chave de produção está no repositório ou bundle do cliente;
- [ ] CI recebe segredos apenas em branches protegidas;
- [ ] logs removem tokens, recibos, e-mail e identificadores desnecessários;
- [ ] rotação foi executada ao menos uma vez em staging;
- [ ] break-glass exige MFA, gera alerta e tem auditoria;
- [ ] saída de colaborador revoga acessos no mesmo dia;
- [ ] inventário de acesso é revisado trimestralmente.

## 6. Pendências de propriedade intelectual e marca

### P0 antes de qualquer divulgação pública

- [ ] retirar “Doodle Jump” do título, HTML, metadata, repositório público e material promocional;
- [ ] remover Homem-Aranha, Homem de Ferro, Capitão América, Hulk e qualquer desenho reconhecível associado;
- [ ] escolher nome provisório original para desenvolvimento;
- [ ] pesquisar conflito de marca nos países prioritários;
- [ ] verificar disponibilidade de domínio, handles e nomes nas lojas;
- [ ] contratar criação de elenco, logo, UI e ambientes originais;
- [ ] revisar se a mecânica, apresentação e assets não copiam trade dress identificável;
- [ ] documentar autoria e cessão de cada asset;
- [ ] revisar licença de fontes, bibliotecas, sons e ferramentas de IA utilizadas;
- [ ] definir política para uso de material gerado por IA e guardar evidência do processo;
- [ ] remover créditos internos não adequados da versão comercial ou movê-los para tela de créditos aprovada.

Critério de conclusão: parecer jurídico liberando marca e conteúdo comercial, com inventário de licença anexado ao release.

## 7. Pendências técnicas do protótipo

### Arquitetura e código

- [ ] separar HTML, estilo, engine, regras, UI e conteúdo;
- [ ] migrar JavaScript para TypeScript estrito;
- [ ] adotar fixed timestep independente de FPS;
- [ ] trocar números/frames de duração por unidades de simulação documentadas;
- [ ] criar RNG com seed e versionamento;
- [ ] desacoplar renderização da física;
- [ ] definir schema para biomas, inimigos, plataformas e missões;
- [ ] versionar save local e migrações;
- [ ] criar tratamento central de erros e falha segura;
- [ ] retirar dependência de estado global;
- [ ] estabelecer lint, format, testes e revisão de código;
- [ ] incluir avisos/licenças de dependências.

### Mobile

- [ ] provar build Capacitor em Android e iOS;
- [ ] validar orientação, notch e safe area;
- [ ] implementar lifecycle: background, resume, interrupção e memória baixa;
- [ ] decidir controle por arraste, tilt e sensibilidade;
- [ ] adicionar haptics e áudio respeitando modo silencioso;
- [ ] definir download de assets e comportamento offline;
- [ ] medir FPS, memória, pacote, bateria e aquecimento;
- [ ] definir versões mínimas de SO;
- [ ] criar ícones, splash e adaptive icon;
- [ ] implementar deep links e universal/app links;
- [ ] impedir múltiplos submits por toque repetido.

### Qualidade

- [ ] selecionar matriz de aparelhos reais;
- [ ] criar casos para física, colisão, geração e save;
- [ ] criar testes end-to-end do onboarding e primeira partida;
- [ ] testar modo avião, rede ruim e troca de rede;
- [ ] testar idiomas longos e fonte ampliada;
- [ ] auditar contraste, cor, flashes e redução de movimento;
- [ ] definir SLO de crash, ANR, APIs, matchmaking e compra;
- [ ] preparar builds debug internos sem expor menus em produção.

## 8. Pendências de backend e conta

- [ ] definir arquitetura, provedor, região e custos por MAU/CCU;
- [ ] provisionar dev, staging e produção separados;
- [ ] definir IDs opacos de jogador e modelo de conta convidada;
- [ ] implementar Sign in with Apple quando outro login social existir no iOS;
- [ ] implementar login/vínculo Google;
- [ ] definir merge e conflito de contas;
- [ ] criar sessão, refresh, logout global e revogação;
- [ ] modelar perfil, inventário, progresso, missão e entitlement;
- [ ] implementar ledger econômico imutável;
- [ ] construir sync offline idempotente;
- [ ] criar exportação e exclusão de conta;
- [ ] definir backup, PITR, RPO, RTO e ensaio de restauração;
- [ ] implementar rate limit, WAF quando aplicável e validação de schema;
- [ ] criar painel administrativo com RBAC, MFA e auditoria;
- [ ] limitar concessões manuais por cargo e valor;
- [ ] produzir runbook de conta comprometida e saldo incorreto.

## 9. Pendências de pagamentos

### Comercial e fiscal

- [ ] definir entidade recebedora, banco e país fiscal;
- [ ] aceitar contratos pagos da Apple e Google;
- [ ] preencher dados fiscais e bancários;
- [ ] confirmar tributação, contabilização e reconhecimento de receita;
- [ ] definir territórios e moedas;
- [ ] aprovar matriz de SKUs, tiers e nomes localizados;
- [ ] aprovar benefícios, renovação e preço de Premium;
- [ ] definir política de compensação e reembolso fora da loja;
- [ ] configurar alertas de chargeback e anomalia.

### Catálogo mínimo

| SKU lógico | Tipo | Direito | Consumível | Decisão pendente |
|---|---|---|---|---|
| `no_ads_lifetime` | não consumível | remove intersticiais | não | preço e interação com Premium |
| `crystals_small` | consumível | pacote pequeno | sim | quantidade e bônus inicial |
| `crystals_medium` | consumível | pacote médio | sim | quantidade e comunicação de valor |
| `crystals_large` | consumível | pacote grande | sim | limite de gasto e tier |
| `season_pass` | não consumível por temporada | trilha paga atual | não | duração e tratamento no fim |
| `premium_monthly` | assinatura | Premium mensal | recorrente | benefícios e grace period |
| `premium_annual` | assinatura | Premium anual | recorrente | desconto real e migração |

Os IDs finais precisam respeitar convenções e limitações de cada loja. O cliente deve mapear IDs de plataforma para SKUs lógicos no backend.

### Implementação

- [ ] integrar StoreKit 2;
- [ ] integrar versão vigente do Google Play Billing;
- [ ] consultar produtos e preços dinamicamente;
- [ ] validar transações no backend;
- [ ] configurar App Store Server Notifications;
- [ ] configurar Google RTDN e Developer API;
- [ ] garantir idempotência por ID de transação;
- [ ] finalizar/acknowledge somente após fluxo seguro;
- [ ] implementar restore purchases;
- [ ] sincronizar entitlement ao login e foreground;
- [ ] tratar pending, Ask to Buy, grace period, pause, expire, revoke e refund;
- [ ] impedir saldo negativo automático após consumo de compra reembolsada;
- [ ] adicionar suporte com transaction reference segura;
- [ ] criar kill switch por SKU e por plataforma;
- [ ] reconciliar loja versus ledger diariamente.

### Evidências de aceite

- [ ] vídeo e logs de cada cenário sandbox em iOS;
- [ ] vídeo e logs de cada cenário license tester no Android;
- [ ] teste de reinstalação e segundo aparelho;
- [ ] teste de webhook repetido e fora de ordem;
- [ ] teste de queda de rede em cada ponto do fluxo;
- [ ] teste de troca de conta;
- [ ] teste de alteração de preço/SKU indisponível;
- [ ] painel mostra transação sem expor recibo completo;
- [ ] suporte consegue restaurar diagnóstico sem conceder compra manualmente;
- [ ] jurídico/financeiro aprovam textos e relatórios.

## 10. Pendências de anúncios e consentimento

- [ ] escolher mediation/redes por cobertura, privacidade e suporte;
- [ ] mapear SDKs e subprocessadores;
- [ ] definir CMP e fluxo por região;
- [ ] preencher `app-ads.txt` e validar domínio;
- [ ] implementar rewarded com callback idempotente no servidor;
- [ ] implementar cap de intersticial persistente;
- [ ] garantir zero anúncios forçados na primeira sessão e no 1x1;
- [ ] desativar anúncios personalizados quando necessário;
- [ ] bloquear categoria inadequada e definir rating de conteúdo;
- [ ] definir comportamento quando não houver fill;
- [ ] adicionar kill switch global e por placement;
- [ ] medir impacto em retenção, bateria, crash e receita;
- [ ] validar remoção de intersticiais para `no_ads_lifetime` e Premium;
- [ ] manter rewarded opcional, sem criar punição artificial para quem recusa.

## 11. Pendências do multiplayer 1x1

### Produto e regras

- [ ] aprovar casual, ranqueada e sala privada;
- [ ] fixar duração, condição de vitória e desempate;
- [ ] decidir tutorial e requisito de desbloqueio;
- [ ] definir regra de bot e identificação visível;
- [ ] definir reconexão, abandono, AFK e rematch;
- [ ] escolher rating, divisões, reset e recompensa;
- [ ] definir regiões e limite de latência;
- [ ] excluir qualquer benefício pago de gameplay;
- [ ] escrever política de conduta, denúncia e apelação.

### Engenharia

- [ ] portar simulação determinística para componente compartilhável/compatível com servidor;
- [ ] definir tick rate, protocolo e versionamento;
- [ ] implementar WebSocket autenticado;
- [ ] construir matchmaker por região/rating/latência;
- [ ] implementar snapshots, prediction e reconciliation;
- [ ] persistir resultado no servidor com idempotência;
- [ ] proteger rating e recompensa contra replay de request;
- [ ] gravar seed, inputs e resumo de integridade;
- [ ] tratar deploy com partidas em andamento;
- [ ] criar fallback quando matchmaker ou região cair;
- [ ] testar carga a 3 vezes o pico estimado;
- [ ] testar jitter, perda, latência, background e troca de rede.

### Anticheat e trust

- [ ] validar velocidade, posição, input e frequência por tick;
- [ ] criar score de risco e fila de revisão;
- [ ] impedir cliente de declarar vitória, score, moeda ou missão;
- [ ] definir ban temporário, permanente e shadow pool com revisão jurídica;
- [ ] implementar bloqueio e denúncia;
- [ ] manter reações predefinidas e sem chat livre no MVP;
- [ ] criar ferramenta de apelação e desfazer punição;
- [ ] monitorar falsos positivos por versão/aparelho.

## 12. Pendências de conteúdo e live ops

- [ ] aprovar seis biomas originais do lançamento;
- [ ] criar guia visual e sonoro por bioma;
- [ ] produzir 40 fases mínimas para Jornada e especificar as seguintes;
- [ ] validar proceduralmente alcance de toda seed;
- [ ] criar inimigos, plataformas, power-ups e tutoriais;
- [ ] definir 90 dias de missões, desafios e eventos;
- [ ] criar passe gratuito/pago com 50 níveis, se mantido no escopo;
- [ ] simular economia de Fichas e Cristais por 30/90 dias;
- [ ] construir editor ou schemas validados;
- [ ] implementar agendamento, preview, aprovação e rollback;
- [ ] preparar plano de compensação por incidente;
- [ ] localizar PT-BR/EN e revisar linguisticamente;
- [ ] criar conteúdo de emergência que possa substituir evento defeituoso.

## 13. Pendências legais, privacidade e segurança

### Documentos

- [ ] política de privacidade;
- [ ] termos de uso/EULA;
- [ ] política de comunidade e moderação;
- [ ] FAQ de compras, assinatura e restauração;
- [ ] política de exclusão e retenção;
- [ ] contrato/DPA de cada fornecedor;
- [ ] registro de base legal e finalidade por dado;
- [ ] processo de titular: acesso, correção, exportação e exclusão;
- [ ] plano de incidente e notificação;
- [ ] parecer sobre menores e classificação etária.

### Implementação

- [ ] consentimento versionado e revogável;
- [ ] tela de privacidade e exclusão dentro do app;
- [ ] endpoint/página web de exclusão quando exigido;
- [ ] minimização e retenção automática;
- [ ] criptografia, rotação, MFA e RBAC;
- [ ] redaction de logs;
- [ ] revisão de dependências e SBOM por release;
- [ ] testes de abuso de APIs, economia e painel;
- [ ] canal de segurança e processo de divulgação responsável;
- [ ] preencher App Privacy e Data Safety com base no build final, não em intenção futura.

## 14. Pendências de publicação nas lojas

### Identidade e assets

- [ ] nome final e subtítulo;
- [ ] ícone, adaptive icon e splash;
- [ ] screenshots por aparelho/idioma exigido;
- [ ] app preview/gameplay real;
- [ ] descrição curta, longa, keywords e notas;
- [ ] URL de suporte, marketing e privacidade;
- [ ] e-mail e contato telefônico de reviewer;
- [ ] copyright e créditos aprovados.

### Configuração iOS

- [ ] bundle ID e capabilities;
- [ ] certificados/perfis e pipeline de assinatura;
- [ ] Game Center, APNs, Sign in with Apple e universal links quando usados;
- [ ] IAP/subscription groups e metadata;
- [ ] App Privacy, age rating e export compliance;
- [ ] account deletion e reviewer notes;
- [ ] TestFlight internal/external e grupos;
- [ ] resposta de review preparada para login, ads e compras.

### Configuração Android

- [ ] package name definitivo;
- [ ] Play App Signing e upload key guardada;
- [ ] app bundle, tracks e testers;
- [ ] Play Games, FCM, app links e APIs quando usados;
- [ ] produtos, assinaturas, offers e testers de licença;
- [ ] Data Safety, ads declaration, content rating e target audience;
- [ ] acesso ao app, account deletion e política;
- [ ] pre-launch report e device catalog revisados;
- [ ] closed testing/requisitos de publicação aplicáveis à conta atendidos.

### Release

- [ ] versionamento e release notes;
- [ ] feature flags com defaults seguros;
- [ ] backend compatível com versão anterior e seguinte;
- [ ] migração de banco reversível;
- [ ] alertas e dashboards ativos;
- [ ] suporte e plantão escalados;
- [ ] rollout 5% -> 20% -> 50% -> 100% com critérios de pausa;
- [ ] procedimento de retirada de versão e desativação de compra;
- [ ] conteúdo dos próximos 30 dias pronto.

## 15. Materiais que precisam ser fornecidos pelos responsáveis

### Negócio

- razão social, país, endereço e representantes;
- dados fiscais e bancários;
- orçamento de desenvolvimento, cloud, arte, jurídico, QA e mídia;
- países e idiomas prioritários;
- responsável por produto, pagamentos e publicação;
- política de preço, descontos e limite de gasto;
- meta de lançamento e tolerância a atraso/redução de escopo.

### Produto e criação

- nome e universo originais aprovados;
- arquivos-fonte de logo, personagens, UI e animações;
- licenças de áudio, fontes e assets;
- GDD do núcleo, Jornada, Infinito e 1x1;
- catálogo de cosméticos e benefícios Premium;
- calendário de conteúdo de 90 dias;
- textos PT-BR/EN revisados.

### Técnico

- matriz de aparelhos e SO suportados;
- decisão de stack/ADR;
- provedor cloud, regiões e budgets;
- domínio e DNS;
- contas Apple/Google e IDs de app;
- escolha de analytics, crash, ads, atribuição e suporte;
- SLO, RPO/RTO e capacidade projetada;
- política de acesso, on-call e resposta a incidente.

### Jurídico e confiança

- parecer de marca/IP;
- contratos e cessões;
- privacidade, termos e DPA;
- decisão sobre faixa etária;
- matriz de retenção;
- processo de moderação, denúncia e apelação;
- procedimento fiscal e de reembolso.

## 16. Registro de riscos

| ID | Risco | Probabilidade | Impacto | Mitigação | Sinal de gatilho | Owner | Estado |
|---|---|---|---|---|---|---|---|
| RSK-001 | contestação de IP | alta no estado atual | crítico | substituição completa e parecer | notificação/rejeição de metadata | A DEFINIR | ABERTO |
| RSK-002 | port web não sustenta desempenho | média | alto | spike e profiling na fase 0 | FPS/bateria fora do orçamento | A DEFINIR | ABERTO |
| RSK-003 | física diverge no 1x1 | média | crítico | fixed timestep, seed e servidor | divergência de replay > 0,5% | A DEFINIR | ABERTO |
| RSK-004 | população insuficiente para fila ranqueada | alta no início | alto | regiões controladas, casual e bots identificados | p95 de fila > 45 s | A DEFINIR | ABERTO |
| RSK-005 | fraude duplica moeda/compra | média | crítico | ledger, idempotência e validação server-side | emissão sem transação válida | A DEFINIR | ABERTO |
| RSK-006 | monetização reduz retenção | média | alto | cap, holdout e kill switch | queda de coorte/nota | A DEFINIR | ABERTO |
| RSK-007 | conteúdo atrasa lançamento | alta | alto | kit modular, metas por bioma e corte explícito | throughput abaixo do plano | A DEFINIR | ABERTO |
| RSK-008 | custo de backend supera receita | média | alto | budget alert, load test e custo por partida | custo/DAU acima do teto | A DEFINIR | ABERTO |
| RSK-009 | rejeição por privacidade/idade | média | crítico | revisão antes do beta e declarações reais | inconsistência de SDK/formulário | A DEFINIR | ABERTO |
| RSK-010 | dependência de SDK bloqueia atualização | média | médio | adapter interno e fornecedor alternativo | SDK incompatível/política nova | A DEFINIR | ABERTO |
| RSK-011 | assinatura gera reclamação | média | alto | comunicação clara, restore e suporte | cancelamento/reembolso anormal | A DEFINIR | ABERTO |
| RSK-012 | suporte não acompanha lançamento | média | alto | macros, SLA, painel e escala gradual | backlog excede SLA | A DEFINIR | ABERTO |

## 17. Ordem crítica de desbloqueio

1. Definir entidade, owners, orçamento e faixa etária.
2. Remover IP de terceiros e aprovar nome/universo original.
3. Abrir Apple Developer, App Store Connect, Google Play Console e perfis financeiros.
4. Aprovar stack mobile, IDs de pacote, aparelhos mínimos e arquitetura de backend.
5. Provisionar código, CI, cofre, dev/staging/prod, domínio e observabilidade.
6. Entregar núcleo determinístico e vertical slice original em aparelhos reais.
7. Implementar conta, save, ledger, conteúdo e ferramentas operacionais.
8. Aprovar catálogo, preço, Premium, políticas e integrações de pagamento/ads.
9. Entregar 1x1 autoritativo e validar carga/anticheat.
10. Concluir privacidade, suporte, materiais de loja, soft launch e gates de qualidade.
11. Submeter, responder review e executar rollout gradual.

## 18. Checklist de reunião semanal

- [ ] revisar todos os P0 e P1;
- [ ] atribuir owner e data aos itens sem responsável;
- [ ] registrar decisões tomadas e evidência;
- [ ] conferir dependências de acesso com mais de sete dias;
- [ ] revisar custo cloud, pagamentos e aquisição;
- [ ] revisar estabilidade, retenção e economia por coorte;
- [ ] revisar risco de IP, privacidade e loja;
- [ ] confirmar conteúdo das próximas quatro semanas;
- [ ] confirmar readiness de suporte e on-call;
- [ ] atualizar próximo gate e condições que faltam.

## 19. Template para nova pendência

```text
ID:
Título:
Prioridade: P0 | P1 | P2 | P3
Status: NÃO INICIADO | EM ANDAMENTO | BLOQUEADO | EM VALIDAÇÃO | CONCLUÍDO
Owner:
Prazo:
Descrição:
Impacto:
Dependências:
Próxima ação:
Critério de aceite:
Evidência:
Última atualização:
```

## 20. Gate final de liberação

Nenhuma publicação deve ocorrer enquanto houver:

- P0 aberto de propriedade intelectual, pagamento, privacidade ou assinatura;
- segredo de produção fora do cofre;
- compra sem validação server-side e idempotência;
- ausência de restauração/reembolso testado;
- declaração de dados diferente dos SDKs do build;
- conta de reviewer inválida;
- backend sem backup, alertas ou plano de incidente;
- 1x1 aceitando resultado ou recompensa declarados pelo cliente;
- equipe sem acesso de plantão, suporte ou capacidade de pausar rollout;
- conteúdo comercial sem preço local e condições claras.

Exceções precisam de aprovação escrita dos responsáveis por Produto, Engenharia, Jurídico e Financeiro, com risco e prazo de correção documentados.

## 21. Estado após implementação do MVP local

Data do corte: 2026-08-31. Os itens abaixo foram marcados somente quando existe comportamento correspondente no entrypoint `index.html`; integração de produção continua separada.

### Concluído no código local

- [x] Entry point mobile responsivo em `index.html`, com safe area, viewport e navegação inferior.
- [x] Jogo Canvas em retrato com controle por arraste, botões esquerda/direita e teclado de desenvolvimento.
- [x] Fixed timestep limitado, movimento, salto automático, plataformas normais e móveis, coleta e câmera vertical.
- [x] Geração procedural por seed para Jornada, Infinito e Desafio diário.
- [x] Seis zonas originais com progressão de dificuldade e desbloqueio local.
- [x] Metas de altura, partidas e coleta, com progresso persistido no aparelho.
- [x] Recorde, nível, XP, fichas, inventário e cosméticos equipáveis.
- [x] Microtransações visuais representadas por loja local usando fichas; sem atributos pagos.
- [x] Tela de Premium com benefícios claros e ativação explicitamente identificada como `DEMO LOCAL`.
- [x] Modo 1x1 local com seed espelhada, rival fantasma, vitória/derrota e estatísticas.
- [x] Desafio diário com seed baseada na data e objetivo de conclusão.
- [x] Preferências de redução de movimento, alto contraste, haptics e telemetria opcional local.
- [x] Exportação de diagnóstico local e reset de demonstração.
- [x] Consentimento local para telemetria e aviso visível sobre compras de produção pendentes.
- [x] Recompensa de anúncio recompensado em modo demo, com limite diário local e indicação explícita de simulação.
- [x] Compartilhamento nativo do resultado com fallback para copiar, pronto para o loop de captação orgânica.
- [x] Repetição preserva modo e zona da partida anterior no resultado.

### Parcial ou não concluído e mantido como pendência

- [ ] Marca e elenco originais ainda precisam de busca/parecer jurídico, registro e inventário de direitos.
- [ ] A arquitetura ainda é um MVP em HTML/JavaScript; há smoke test e workflow de verificação local, mas migração TypeScript/Phaser/Capacitor e testes de dispositivo permanecem abertos.
- [ ] O duelo é uma simulação local; matchmaking, WebSocket, servidor autoritativo, rating, reconexão e anticheat online permanecem abertas.
- [ ] A loja, Premium, saldo e recompensas são locais; StoreKit, Google Play Billing, recibos, webhooks, restore, renovação e reembolso permanecem abertas.
- [ ] Anúncios reais, mediation, CMP, `app-ads.txt`, consentimento por região e validação de rewarded permanecem abertas.
- [ ] Conta Apple/Google, sync entre aparelhos, exclusão de conta e suporte de produção permanecem abertas.
- [ ] Cloud, banco, Redis, observabilidade, backups, segurança operacional, domínio e publicação nas lojas permanecem abertas.
- [ ] Política de privacidade, termos, classificação etária, DPA, Data Safety e App Privacy ainda exigem revisão jurídica e publicação.

### Gate local alcançado

- [x] O usuário consegue abrir o entrypoint, iniciar uma partida, mover o personagem, alcançar uma meta ou cair, receber resultado e persistir progresso.
- [x] O usuário consegue navegar por Jornada, Estilo, Perfil e Configurações sem depender de serviço externo.
- [x] O usuário consegue testar uma proposta de Premium e cosméticos sem que a demonstração alegue ter processado pagamento real.
- [x] O usuário consegue iniciar um duelo 1x1 local e ver claramente que não é matchmaking online.

O gate de publicação global continua bloqueado pelos itens P0/P1 acima e não deve ser marcado como concluído neste documento.

## 22. Atualização técnica local — 2026-08-31

O checklist detalhado de implementação está em `CHECKLIST_IMPLEMENTACAO.md`. Esta atualização não fecha nenhum bloqueio de publicação: ela registra somente mudanças observáveis na demonstração local.

- [x] O loop do MVP passou a usar timestep fixo de 60 Hz, com acumulador limitado e renderização desacoplada.
- [x] Cada execução local preserva seed, versão do RNG/gerador, entradas comprimidas e resumo de replay para diagnóstico.
- [x] A Jornada inicia por um tutorial local; foram adicionadas missões semanais, resgate explícito de recompensas, conquistas e progresso de passe gratuito local.
- [x] A Jornada local possui seis capítulos com dez fases cada, regras de plataforma variadas, perigos sinalizados, modificador diário e duelo local cronometrado.
- [x] Preferências locais incluem volumes separados, escala de UI e alternância PT-BR/EN; a revisão linguística final e o áudio/arte licenciados continuam pendentes de produção.
- [x] O ciclo de vida trata `visibilitychange`, perda de foco e cancelamento de ponteiro para pausar ou liberar controles com segurança.
- [x] O cache offline inclui os dois entrypoints e a extensão de regras/metajogo.
- [x] `README.md` não identifica mais o produto como clone de uma marca de terceiros.

Permanece bloqueado, sem exceção, tudo que dependa de marca/licenças, contas de loja, serviço externo, dados reais, jurídico, aparelhos reais ou aprovação humana. Os itens correspondentes já estão abertos nas seções 2 a 20 deste arquivo.
