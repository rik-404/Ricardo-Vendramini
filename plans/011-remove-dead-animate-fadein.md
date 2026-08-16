# 011 — Remover classe morta `animate-fadeIn`

- **Status**: TODO
- **Commit**: `9cb32b3`
- **Severity**: LOW
- **Category**: 7 — Cohesion & tokens (dead code)
- **Estimated scope**: 1 arquivo, 1 linha

## Problem

`src/components/AchievementsModal.jsx:247` usa `animate-fadeIn`, mas **não existe** `@keyframes fadeIn` em `src/index.css`, `tailwind.config.js` nem inline. A classe é um no-op — a revelação da dica não anima (e parece que deveria).

```jsx
<div className="mt-2 p-2.5 rounded-xl bg-black/60 border border-amber-500/30 flex items-start justify-between gap-2 animate-fadeIn">
```

## Target

Remover a classe morta, deixando:

```jsx
<div className="mt-2 p-2.5 rounded-xl bg-black/60 border border-amber-500/30 flex items-start justify-between gap-2">
```

É um painel de dica funcional pequeno (no-purpose para animar); a revelação instantânea está correta.

## Repo conventions to follow

- Nenhum outro ponto do site usa `animate-fadeIn` (grep confirmou).
- Painéis de dica/hint não animam em outros modais (ex.: `AchievementsModal.jsx:240-245`).

## Steps

1. `src/components/AchievementsModal.jsx:247`: remover `animate-fadeIn` do className.

## Boundaries

- NÃO adicionar o keyframe `fadeIn` (não vale o motion num hint).
- NÃO tocar no resto do arquivo.
- Se o código não bater com o citado (drift desde `9cb32b3`), PARE e reporte.

## Verification

- **Mechanical**: `npm run build` sem erro; `rg -c "animate-fadeIn" src/` → 0.
- **Feel check**: abrir um hint de conquista revelado — painel aparece (sem regressão); nada de comportamento estranho.
- **Done when**: a classe morta não existe mais.