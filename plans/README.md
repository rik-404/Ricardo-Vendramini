# Planos de Motion — Ricardo Vendramini Portfolio

Auditoria `improve-animations` sobre o commit `9cb32b3`. Cada plano é auto-contido (valores exatos, arquivos e passos) e pode ser executado por qualquer agente.

## Ordem de execução recomendada

Ordem por alavancagem (impacto ÷ esforço), respeitando dependências.

| # | Plano | Severity | Status | Depends on |
| --- | --- | --- | --- | --- |
| 001 | Reviver AchievementToast (montar na raiz) | HIGH | TODO | — |
| 002 | Animar gaveta + menu mobile do Navbar | HIGH | TODO | — |
| 004 | Entrada/saída do Terminal modal | HIGH | TODO | — |
| 003 | Ease-out nos drawers de detalhe (+ remover `height`) | HIGH | TODO | — |
| 005 | Política de reduced-motion gentil (CSS) | MEDIUM | TODO | — |
| 006 | `transition: all`/`transition-all` → tokens nomeados | MEDIUM | TODO | — |
| 008 | Hovers ≤300ms + cover-shine via transform | MEDIUM | TODO | 006 (mesmos classNames) |
| 007 | Press feedback em `<a>` e cards clicáveis | MEDIUM | TODO | — |
| 009 | Reduced-motion em JS + gating de hover por ponteiro | MEDIUM | TODO | 005 (complementar) |
| 010 | Limitar blur 24px e parar interpolação no scroll | LOW | TODO | 006 (troca `transition-all` do header) |
| 011 | Remover classe morta `animate-fadeIn` | LOW | TODO | — |
| 012 | TimeTravel: barras via `scaleX` | LOW | TODO | — |

## Dependências entre planos

- **006 → 008**: 006 e 008 tocam os mesmos classNames (ex.: `AboutSection.jsx:75`, `Footer.jsx:54`, `BooksSection.jsx:48`). Executar **juntos ou na ordem 006→008** para evitar conflito de edição na mesma linha.
- **006 → 010**: 010 troca `transition-all` do header — aplicar depois do 006 (que faz a troca de `transition-all` → `transition-[…]` no mesmo elemento).
- **005 → 009**: 005 é o CSS global; 009 adiciona as checagens JS que o 005 não cobre. Complementares, executáveis em qualquer ordem.
- **002/003/004**: independentes entre si, todos tocam framer-motion — sem conflito de arquivos (002=Navbar, 003=SkillsSection/TechLab/AllSkillsModal, 004=App+TerminalSection).

## Como executar

Cada plano contém: Problem (código atual verbatim + arquivo:linha), Target (código exato), Repo conventions (exemplar), Steps (edit por edit), Boundaries (o que NÃO tocar) e Verification (mecânico + feel-check).

Se um passo não bater com o código encontrado (drift desde o commit estampado no plano), **pare e reporte** em vez de improvisar.