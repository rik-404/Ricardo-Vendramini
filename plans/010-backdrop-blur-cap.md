# 010 — Limitar blur do backdrop e parar interpolação de blur no scroll

- **Status**: TODO
- **Commit**: `9cb32b3`
- **Severity**: LOW
- **Category**: 5 — Performance
- **Estimated scope**: `src/components/Navbar.jsx`

## Problem

Dois custos de `backdrop-filter` acima do recomendado (blur >20px é caro, especialmente no Safari; interpolar blur em scroll custa frames):

**1. `src/components/Navbar.jsx:496-500`** — gaveta com blur 24px:

```css
.chpw-drawer {
  background: rgba(7, 12, 9, 0.92);
  border: 1px solid rgba(0, 255, 136, 0.18);
  backdrop-filter: blur(24px);
}
```

**2. Header** — `Navbar.jsx:450-459` alterna `backdrop-filter: blur(8px)` (top) → `blur(20px)` (scrolled), e o `<header>` tem `transition-all duration-300` (`Navbar.jsx:239`). O blur é **interpolado a cada tick de scroll**, que é caro.

## Target

**1. `Navbar.jsx:499`** — `blur(24px)` → `blur(20px)`:

```css
.chpw-drawer {
  background: rgba(7, 12, 9, 0.92);
  border: 1px solid rgba(0, 255, 136, 0.18);
  backdrop-filter: blur(20px);
}
```

**2. `Navbar.jsx:239`** — remover `backdrop-filter` da transição do header (só bg/borda/sombra interpolam):

```jsx
className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 chpw-header ${
  headerLight ? 'chpw-header-light' : ''
} ${scrolled ? 'chpw-header-scrolled' : 'chpw-header-top'}`}
```

O blur passa a trocar de 8px→20px sem interpolação (mudança discreta no limiar do scroll — aceitável e barato). Mantém `duration-300` para bg/borda/sombra.

## Repo conventions to follow

- Os tokens de superfície translúcida do site usam `blur(20px)` (`src/index.css:139-140` `.glass-panel`/`.glass-card`) — alinhar com 20px.
- Classes arbitrárias Tailwind `transition-[…]` já são usadas (plano 006).

## Steps

1. `Navbar.jsx:499`: trocar `blur(24px)` por `blur(20px)`.
2. `Navbar.jsx:239`: trocar `transition-all duration-300` por `transition-[background-color,border-color,box-shadow] duration-300`.

## Boundaries

- NÃO alterar `.chpw-header-top`/`.chpw-header-scrolled` (os valores de blur 8/20 ficam; só param de ser interpolados).
- NÃO tocar nos outros `backdrop-filter` do site (glass-panel/card já estão em 20px).
- Se o código não bater com o citado (drift desde `9cb32b3`), PARE e reporte.

## Verification

- **Mechanical**: `npm run build` sem erro.
- **Feel check**:
  - Abra a gaveta de utilitários: visual idêntico (blur 20px ainda suave).
  - Role a página: header muda de fundo/sombra suavemente; o blur troca sem "custo visível".
  - DevTools → Performance (recording durante scroll): sem grandes picos de paint por interpolação de blur.
- **Done when**: nenhum `backdrop-filter: blur(24px)` no source; header não interpola blur.