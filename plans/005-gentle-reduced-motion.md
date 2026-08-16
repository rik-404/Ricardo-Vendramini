# 005 — Política de reduced-motion gentil (não zerar tudo)

- **Status**: TODO
- **Commit**: `9cb32b3`
- **Severity**: MEDIUM
- **Category**: 6 — Accessibility
- **Estimated scope**: 1 arquivo (CSS)

## Problem

O bloco global de `prefers-reduced-motion` zera **todas** as animações e transições do site — inclusive opacidade e cor, que **ajudam na compreensão** e deveriam permanecer.

`src/index.css:225-232` — atual:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

O `transition-duration: 0.01ms !important` mata o feedback de hover/press em cor, borda e sombra. Reduced motion = **menos e mais suave, não zero** (AUDIT.md §6): manter transições de opacidade/cor, remover movimento (transform).

## Target

Substituir o bloco (linhas 225-232) por:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }

  /* Gentle: keep opacity/color transitions that aid comprehension,
     drop movement (transform-based motion). */
  a, button, .btn, [role="button"],
  .glass-card, .glass-panel,
  [class*="transition-all"],
  [class*="transition-transform"],
  [class*="transition-colors"] {
    transition-property: background-color, border-color, color, box-shadow, opacity !important;
    transition-duration: 150ms !important;
  }

  /* No movement on hover: kill transform-based hovers under reduced motion */
  [class*="hover:scale-"],
  [class*="hover:-translate-y-"],
  [class*="group-hover:scale-"],
  [class*="group-hover:-translate-y-"] {
    transform: none !important;
  }
}
```

Efeito: o `transform` deixa de ser transicionado (nada de slide/scale/parallax), mas hover de cor/borda/sombra e o press de opacidade continuam breves e funcionais.

O bloco do `Book3D` (`index.css:480-488`) já está correto — **não tocar**.

## Repo conventions to follow

- O site já declara os tokens de easing em `:root` (`index.css:16-18`) — mas reduced-motion não usa easing, usa duração 150ms curta.
- `prefers-reduced-transparency: reduce` (`index.css:234-240`) já existe e fica intacto.

## Steps

1. Substituir o bloco `@media (prefers-reduced-motion: reduce)` de `src/index.css:225-232` pelo CSS do Target.

## Boundaries

- NÃO tocar no bloco `@media (prefers-reduced-transparency: reduce)` (`index.css:234-240`).
- NÃO tocar no bloco reduce do Book3D (`index.css:480-488`).
- NÃO alterar nenhum componente JSX neste plano (o plano 009 adiciona as checagens JS).
- Se o código não bater com o citado (drift desde `9cb32b3`), PARE e reporte.

## Verification

- **Mechanical**: `npm run build` sem erro; `grep -c "transition-duration: 0.01ms" src/index.css` retorna 0.
- **Feel check** (DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`):
  - Passe o mouse num card `.glass-card`: a borda muda de cor suavemente (150ms), mas **não** há scale/translate.
  - Clique num botão CTA: o `scale(0.97)` do press **não** anima (sem movimento), mas cores permanecem.
  - Marquee, pulsos, ping e easter eggs ficam estáticos (iteração 1), mas o hover de cor ainda responde.
  - Sem o emulador (motion normal): nada muda no site.
- **Done when**: reduced-motion preserva feedback de cor/opacidade e remove movimento; motion normal intacto.