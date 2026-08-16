# 007 — Press feedback em `<a>`-botões e cards clicáveis

- **Status**: TODO
- **Commit**: `9cb32b3`
- **Severity**: MEDIUM
- **Category**: 3 — Physicality & origin (feedback)
- **Estimated scope**: 1 arquivo (CSS)

## Problem

A regra global de press `scale(0.97)` só cobre `button, .btn, [role="button"]` (`src/index.css:38-44`). Os **CTAs são `<a>`** e os **cards clicáveis são `<div>`** — ao pressionar, não há feedback:

- `HeroSection.jsx:56` (pill da empresa), `:113/:121` (CTAs "learn story"/"projects")
- `ContactSection.jsx:48` (WhatsApp) e `:65-111` (5 cards sociais)
- `Footer.jsx:68,95,115,169` (brand + action buttons + ícones)
- `ProjectModal.jsx:259` (Launch Live App), `BooksSection.jsx:83` (título `<h3 onClick>`), `:128,140`
- `BookModal.jsx:108,120`, `AllProjectsModal.jsx:140`, `AllSkillsModal.jsx:177`, `AllCertificatesModal.jsx:159`, `CertificatesSection.jsx:84`, `SkillsSection.jsx:74` (cards `<div onClick>`)

A filosofia de design engineering diz: feedback de press aplica-se a **qualquer elemento pressionável** (`transform: scale(0.97)` no `:active`, sutil 0.95–0.98).

## Target

Estender a regra base de `src/index.css:38-44` para cobrir `a[href]` e elementos com `cursor-pointer` (os cards clicáveis e CTAs):

```css
/* Emil Design Eng: Global Instant Active Press Feedback */
button, .btn, [role="button"], a[href], [class*="cursor-pointer"] {
  transition: transform 140ms var(--ease-out), background-color 150ms ease, border-color 150ms ease, color 150ms ease, box-shadow 150ms ease;
}

button:active, .btn:active, [role="button"]:active,
a[href]:active, [class*="cursor-pointer"]:active {
  transform: scale(0.97) !important;
}
```

Nota: onde o elemento já tem `transition-colors`/`transition-transform`/`transition-all`, a classe utilitária vence a regra base (camada utilities > base) e o press ainda anima via transform.

## Repo conventions to follow

- A regra já existe para botões (`index.css:38-44`) — isto é uma extensão, não um padrão novo.
- Curva `--ease-out` já em uso no `:root`.
- Cards com `onClick` já carregam `cursor-pointer` em todos os casos listados (verificado nos arquivos acima).

## Steps

1. Em `src/index.css`, substituir as linhas 38-44 pelo CSS do Target.

## Boundaries

- NÃO mexer em componentes.
- NÃO remover `!important` do `:active` (é o que garante o press sobre inline styles do framer, ex.: o `motion.a` do hero pill).
- NÃO aplicar press em `a` sem que sejam pressionáveis (todos os `a[href]` do site são CTAs/navegação — scale 0.97 é sutil e aceitável).
- Se o código não bater com o citado (drift desde `9cb32b3`), PARE e reporte.

## Verification

- **Mechanical**: `npm run build` sem erro.
- **Feel check**:
  - Pressione (sem soltar) o CTA "learn story": escala 0.97 em ~140ms ease-out, volta ao soltar.
  - Pressione um card de skill/projeto do marquee: feedback idêntico.
  - Pressione um link do nav: press sutil (140ms), sem travar.
  - No mobile (touch), o tap dispara o press; com `prefers-reduced-motion: reduce` (plano 005) o movimento some mas a cor permanece.
- **Done when**: todo elemento clicável (a, button, div com onClick) responde ao press.