# 009 — Reduced-motion em JS (canvas/cursor/livro) + gating de hover por ponteiro

- **Status**: TODO
- **Commit**: `9cb32b3`
- **Severity**: MEDIUM
- **Category**: 6 — Accessibility
- **Estimated scope**: 4 componentes + `src/index.css`

## Problem

A política de reduced-motion do plano 005 (CSS) não para **loops rAF em JS** e não resolve **hover falso em touch**. Evidências:

- `src/components/HeroCanvas.jsx:105-177` — rAF full-viewport de partículas/matrix **sempre rodando**, sem check de `prefers-reduced-motion`.
- `src/components/CustomCursor.jsx:42-54` — rAF de `setTrailingPos` a cada frame, sem check (só desliga em touch via `(hover: none)`, `CustomCursor.jsx:12`).
- `src/components/Book3D.jsx:16-22` — `whileHover` spring 3D (rotate/scale/y) sem `useReducedMotion`. (O CSS `index.css:480-488` já zera `transform` no livro, mas o framer seta transform inline que vence.)
- Hovers `hover:scale-*`/`group-hover:scale-*` **sem gating** por ponteiro — touch dispara hover falso no tap. Zero ocorrências de `@media (hover: hover) and (pointer: fine)` no `src/`.

## Target

**1. `src/components/HeroCanvas.jsx`** — no início do `useEffect` (após `const ctx = canvas.getContext('2d');`), adicionar:

```js
const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
```

E, no fim do effect (antes do `render();` na linha 177), substituir:

```js
render();
```

por:

```js
if (reduceMotion) {
  // frame estático: desenha as partículas uma vez, sem loop
  for (let i = 0; i < particles.length; i++) particles[i].draw();
} else {
  render();
}
```

**2. `src/components/CustomCursor.jsx:42-54`** — no effect do trailing, substituir o bloco:

```jsx
useEffect(() => {
  if (isTouch) return;
  let animationFrame;
  const followMouse = () => {
    setTrailingPos((prev) => ({
      x: prev.x + (position.x - prev.x) * 0.2,
      y: prev.y + (position.y - prev.y) * 0.2,
    }));
    animationFrame = requestAnimationFrame(followMouse);
  };
  animationFrame = requestAnimationFrame(followMouse);
  return () => cancelAnimationFrame(animationFrame);
}, [position, isTouch]);
```

por:

```jsx
useEffect(() => {
  if (isTouch) return;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    // sem lag de trailing: o halo acompanha 1:1, sem loop
    setTrailingPos(position);
    return;
  }
  let animationFrame;
  const followMouse = () => {
    setTrailingPos((prev) => ({
      x: prev.x + (position.x - prev.x) * 0.2,
      y: prev.y + (position.y - prev.y) * 0.2,
    }));
    animationFrame = requestAnimationFrame(followMouse);
  };
  animationFrame = requestAnimationFrame(followMouse);
  return () => cancelAnimationFrame(animationFrame);
}, [position, isTouch]);
```

**3. `src/components/Book3D.jsx`** — adicionar `useReducedMotion`:

```jsx
import { motion, useReducedMotion } from 'framer-motion';
```

No corpo do componente (antes do return):

```jsx
const reduceMotion = useReducedMotion();
```

E no `motion.button`/elemento com `whileHover` (linhas 15-22), trocar `whileHover={{ scale: 1.06, rotateX: 4, rotateY: -12, rotateZ: -1, y: -8 }}` por:

```jsx
whileHover={reduceMotion ? undefined : { scale: 1.06, rotateX: 4, rotateY: -12, rotateZ: -1, y: -8 }}
```

**4. `src/index.css`** — adicionar no fim do arquivo (gating de hover em ponteiros grossos):

```css
/* Touch/coarse pointers fire false hovers on tap — gate hover transforms */
@media (hover: none) and (pointer: coarse) {
  [class*="hover:scale-"],
  [class*="hover:-translate-y-"],
  [class*="group-hover:scale-"],
  [class*="group-hover:-translate-y-"] {
    transform: none !important;
  }
}
```

## Repo conventions to follow

- O projeto já usa `window.matchMedia` (`App.jsx:64`, `CustomCursor.jsx:12`) — padrão aceito.
- framer-motion 11 já é dependência (`package.json`), `useReducedMotion` está disponível.
- O CSS de touch-gating segue o mesmo estilo dos blocos `@media` já existentes em `index.css`.

## Steps

1. `HeroCanvas.jsx`: adicionar `reduceMotion` e o frame estático (Steps 1).
2. `CustomCursor.jsx`: substituir o effect do trailing (Step 2).
3. `Book3D.jsx`: import + `useReducedMotion` + `whileHover` condicional (Step 3).
4. `index.css`: adicionar o bloco de gating por ponteiro (Step 4).

## Boundaries

- NÃO alterar a lógica das partículas/cursor além do gate de reduced-motion.
- NÃO tocar nos outros easter eggs (StarWars, TimeTravel, Retro1999) — são raros, o CSS do plano 005 já os estatica.
- Se o código não bater com o citado (drift desde `9cb32b3`), PARE e reporte.

## Verification

- **Mechanical**: `npm run build` sem erro.
- **Feel check**:
  - DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`: o canvas desenha um frame estático (sem partículas se movendo); o cursor perde o arrasto do halo; o hover 3D do livro fica plano.
  - Com motion normal: nada muda (partículas, trailing, livro 3D idênticos).
  - Device mode (touch emulation): tocar num card de skill **não** deixa o card escalado preso (sem hover falso); com mouse, hover funciona normalmente.
- **Done when**: reduced-motion não roda loops rAF; hover transform não dispara em touch.