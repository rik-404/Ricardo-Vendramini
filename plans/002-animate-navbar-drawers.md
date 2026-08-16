# 002 — Animar gaveta de utilitários e menu mobile do Navbar

- **Status**: TODO
- **Commit**: `9cb32b3`
- **Severity**: HIGH
- **Category**: 8 — Missed opportunities (UI espacial teleporta)
- **Estimated scope**: 1 arquivo, ~2 blocos JSX + 1 import

## Problem

A "gaveta" de utilitários e o menu mobile usam classes do Tailwind v4 / plugin `tailwindcss-animate` que **não existem** neste projeto (Tailwind 3.4.17, `plugins: []` em `tailwind.config.js:63`). As classes são inertes — a UI aparece e some **instantaneamente**, sem história de origem e sem saída.

Código atual em `src/components/Navbar.jsx:331-332`:

```jsx
{utilitiesOpen && (
  <div className="absolute right-0 top-full mt-2 w-64 chpw-drawer rounded-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-150 shadow-xl">
```

E `src/components/Navbar.jsx:371-372`:

```jsx
{mobileOpen && (
  <div className="lg:hidden chpw-drawer border-t hdr-drawer-divider px-6 py-5 animate-in slide-in-from-top duration-200">
```

Confirmado: `grep -r "fade-in\|slide-in-from\|animate-in" src/` só encontra `.animate-infinite-marquee` (outra coisa) e essas duas linhas. Nenhum keyframe correspondente existe.

`src/components/Navbar.jsx:1-4` não importa framer-motion — será preciso adicionar.

## Target

Substituir as duas gavetas por `AnimatePresence` + `motion.div`, escalando **da origem do gatilho** (canto superior direito para a gaveta; topo-centro para o menu mobile), `ease-out` forte, com exit espelhado.

**1. Import** — em `src/components/Navbar.jsx:1-4`:

```jsx
import { motion, AnimatePresence } from 'framer-motion';
```

**2. Gaveta de utilitários** (`Navbar.jsx:331-332`):

```jsx
<AnimatePresence>
  {utilitiesOpen && (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
      style={{ transformOrigin: 'top right' }}
      className="absolute right-0 top-full mt-2 w-64 chpw-drawer rounded-2xl p-2 shadow-xl"
    >
```

**3. Menu mobile** (`Navbar.jsx:371-372`):

```jsx
<AnimatePresence>
  {mobileOpen && (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="lg:hidden chpw-drawer border-t hdr-drawer-divider px-6 py-5"
    >
```

O conteúdo interno de ambas (os filhos) permanece **intocado** — só muda o wrapper e suas classes.

## Repo conventions to follow

- A curva `cubic-bezier(0.23, 1, 0.32, 1)` é o token `--ease-out` do projeto (`src/index.css:16`); no framer-motion usa-se o array `[0.23, 1, 0.32, 1]`.
- As demais gavetas/panels do site usam `initial={{ opacity: 0, y: N }}` + AnimatePresence (ex.: `SkillsSection.jsx:119-124`) — mesmo padrão.
- Gavetas ancoradas no trigger devem escalar do trigger (regra do AUDIT.md §3); o wrapper é `absolute right-0 top-full`, então `transform-origin: top right` é a origem correta.

## Steps

1. Adicionar o import de `{ motion, AnimatePresence }` em `Navbar.jsx`.
2. Substituir o bloco `{utilitiesOpen && (<div …>)}` de `Navbar.jsx:331-332` pelo wrapper `AnimatePresence` + `motion.div` do Target (fechar com `</motion.div>` e `</AnimatePresence>`).
3. Substituir o bloco `{mobileOpen && (<div …>)}` de `Navbar.jsx:371-372` pelo wrapper `AnimatePresence` + `motion.div` do Target.
4. Manter todos os filhos exatamente como estão.

## Boundaries

- NÃO mexer em nada além dos dois wrappers e do import.
- NÃO usar `x`/`y` shorthands em `transform` final? Não — aqui `y` é aceitável por ser motion de entrada one-shot e curto; mantenha `y`/`scale` (padrão do resto do site).
- NÃO adicionar dependências novas.
- Se o código não bater com o citado (drift desde `9cb32b3`), PARE e reporte.

## Verification

- **Mechanical**: `npm run build` sem erro.
- **Feel check**:
  - Clique na engrenagem: a gaveta escala do canto do botão (origem top-right), não do centro.
  - Clique repetidamente na engrenagem: a animação **retargeta** do estado atual (nunca reinicia do zero).
  - Feche: a saída espelha a entrada (`scale 0.97 + opacity 0 + y -8`).
  - No DevTools (Animations, playback 10%): o scale começa em 0.97 e vai a 1 com curva ease-out; sem cortes.
  - No mobile (responsivo), abra o hambúrguer: o menu desliza de cima com fade 0.2s e sai pelo mesmo caminho.
- **Done when**: nenhuma das duas gavetas aparece/desaparece instantaneamente.