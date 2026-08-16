# 003 — Ease-out nos drawers de detalhe e remover animação de height

- **Status**: TODO
- **Commit**: `9cb32b3`
- **Severity**: HIGH
- **Category**: 2 (Easing & duration) + 5 (Performance)
- **Estimated scope**: 3 arquivos, 3 blocos

## Problem

Três painéis de detalhe disparados por clique (dezenas/dia) usam o default do framer-motion (`easeInOut` 0.3s) — que atrasa o exato momento que o usuário assiste — e um deles ainda anima `height` (layout). Em UI, entrada/existência deve usar **ease-out**.

**1. `src/components/SkillsSection.jsx:121-124`** — drawer de detalhe da skill:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
```

Sem `transition` → default `easeInOut` 0.3s.

**2. `src/components/TechLabSection.jsx:78-82`** — detalhe do nó ativo:

```jsx
<motion.div
  key={activeId}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
```

Sem `transition` → default `easeInOut`.

**3. `src/components/AllSkillsModal.jsx:127-131`** — sub-drawer de detalhe da skill:

```jsx
<motion.div
  initial={{ opacity: 0, height: 0 }}
  animate={{ opacity: 1, height: 'auto' }}
  exit={{ opacity: 0, height: 0 }}
```

Anima `height` (dispara layout + paint + composite a cada frame) e usa default `easeInOut`.

## Target

**1. `SkillsSection.jsx:121-124`** — adicionar a prop `transition`:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
```

**2. `TechLabSection.jsx:78-82`** — adicionar a prop `transition`:

```jsx
<motion.div
  key={activeId}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
```

**3. `AllSkillsModal.jsx:127-131`** — trocar `height` por transform + opacidade (GPU-safe, coerente com os outros drawers):

```jsx
<motion.div
  initial={{ opacity: 0, y: -12 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -12 }}
  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
```

## Repo conventions to follow

- A curva `cubic-bezier(0.23, 1, 0.32, 1)` = token `--ease-out` (`src/index.css:16`); no framer usa-se o array `[0.23, 1, 0.32, 1]`.
- Os outros drawers do site já usam `opacity + y` (ex.: `SkillsSection.jsx:121-124`), nunca `height`.
- Duração < 300ms para UI (tabela do AUDIT.md §2: dropdowns 150–250ms).

## Steps

1. `src/components/SkillsSection.jsx`: adicionar a prop `transition` no `motion.div` das linhas 121-124.
2. `src/components/TechLabSection.jsx`: adicionar a prop `transition` no `motion.div` das linhas 78-82.
3. `src/components/AllSkillsModal.jsx`: trocar `initial/animate/exit` do `motion.div` nas linhas 127-131 conforme o Target e adicionar a prop `transition`.

## Boundaries

- NÃO mudar marcação interna dos drawers.
- NÃO tocar em outros arquivos.
- Se o código não bater com o citado (drift desde `9cb32b3`), PARE e reporte.

## Verification

- **Mechanical**: `npm run build` sem erro.
- **Feel check**:
  - Clique numa skill do marquee: o drawer sobe **rápido** (200ms ease-out), sem aquele início lento do easeInOut.
  - Troque os nós do TechLab rapidamente: o conteúdo keyado troca suave, sem pulo e sem atraso na abertura.
  - Abra/feche o sub-drawer no AllSkillsModal: a barra aparece deslizando de cima com fade; fechar espelha.
  - DevTools Animations (10%): a curva é a de ease-out (acelera no início), duração 0.2s.
- **Done when**: os três painéis abrem com ease-out e nenhum deles anima `height`/`width`/`top`/`left`.