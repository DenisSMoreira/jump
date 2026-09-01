# Skybound // Ascensão

Um MVP original de ascensão vertical para mobile em `index.html`, com Canvas, progresso local e funcionamento offline. Não usa arte, personagens ou nomes de franquias de terceiros.

## ▶️ Jogar online

👉 **[https://denissmoreira.github.io/jump/](https://denissmoreira.github.io/jump/)** (GitHub Pages)

## Como jogar

| Ação | Controles |
|---|---|
| Mover | Arraste no Canvas, botões de direção ou `←` / `→` (`A` / `D` no desenvolvimento) |
| Inclinação | Ative em Configurações; o navegador pedirá a permissão quando necessária |
| Pausar | Botão de pausa, `Esc`, ou mudança para segundo plano |

- O personagem salta automaticamente.
- As bordas são contínuas, então é possível atravessar de um lado ao outro.
- O jogo pausa automaticamente em segundo plano.

## Conteúdo do MVP local

O jogo inclui Jornada com 60 fases locais (seis capítulos de dez), Infinito, desafio diário e duelo 1x1 local. Duelos locais são explicitamente uma simulação offline: não há matchmaking nem ranking de produção.

| Capítulo | Mecânica de navegação | Perigo |
|---|---|---|
| Jardins Suspensos | plataformas elásticas e vento | rajadas laterais |
| Bosque Luminoso | plataformas frágeis | perigos móveis |
| Picos de Vidro | alternância e rotas | fragmentos sinalizados |
| Forja Abissal | esteiras e plataformas temporárias | calor intermitente |
| Estação Orbital | portais e gravidade leve | drones locais |
| Arquipélago Celeste | plataformas por ritmo | nuvens e vento |

## Estado e validação

O progresso é armazenado apenas no navegador neste MVP. A extensão adiciona save versionado, sementes determinísticas, replay local compacto, missões, conquistas, preferências de acessibilidade, idiomas PT-BR/EN e cache PWA.

As integrações de conta, backend autoritativo, pagamentos, anúncios reais, privacidade de produção e publicação em lojas não são simuladas. Consulte [CHECKLIST_IMPLEMENTACAO.md](CHECKLIST_IMPLEMENTACAO.md) e [PENDENCIAS_E_ACESSOS.md](PENDENCIAS_E_ACESSOS.md) para o estado correto.

Execute a verificação local com:

```bash
node tests/smoke.mjs
```

## Rodando localmente

Basta abrir o `index.html` em qualquer navegador moderno:

```bash
# ou sirva com um servidor simples
python3 -m http.server 8000
# depois acesse http://localhost:8000
```
