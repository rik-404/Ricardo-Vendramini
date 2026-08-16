# 004 — Entrada/saída do Terminal modal

- **Status**: TODO
- **Commit**: `9cb32b3`
- **Severity**: HIGH
- **Category**: 8 — Missed opportunities (mudança de estado abrupta)
- **Estimated scope**: 2 arquivos

## Problem

O Terminal é o **único modal do site sem animação de entrada/saída**. Todos os outros (ProjectModal, BookModal, AllProjectsModal, AllCertificatesModal, AllSkillsModal, AchievementsModal) entram com `initial={{ opacity: 0, scale: 0.95, y: 20 }}`. O terminal aparece e some instantaneamente.

Código atual:

`src/App.jsx:378-379` — render condicional sem `AnimatePresence`:

```jsx
{terminalModalOpen && (
  <TerminalSection
```

`src/components/TerminalSection.jsx:1038-1040` — raiz do branch modal é uma `div` comum:

```jsx
if (isModal) {
  return (
    <div className="fixed inset-0 z-[999999] overflow-y-auto bg-[#040805]/95 backdrop-blur-2xl flex flex-col justify-between select-none">
```

## Target

Envolver o render condicional em `AnimatePresence` e transformar a raiz do branch modal em `motion.div` com `scale 0.96` + opacidade, `ease-out` ≤250ms, exit espelhado.

**1. `src/App.jsx`** — adicionar import:

```jsx
import { AnimatePresence } from 'framer-motion';
```

E envolver o bloco (linhas 378-407):

```jsx
<AnimatePresence>
  {terminalModalOpen && (
    <TerminalSection
      isModal={true}
      onClose={() => setTerminalModalOpen(false)}
      ...
    />
  )}
</AnimatePresence>
```

**2. `src/components/TerminalSection.jsx:1038-1048`** — raiz do branch modal:

```jsx
if (isModal) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="fixed inset-0 z-[999999] overflow-y-auto bg-[#040805]/95 backdrop-blur-2xl flex flex-col justify-between select-none"
    >
      {content}
      <AchievementsModal
        isOpen={localAchievementsOpen}
        onClose={() => setLocalAchievementsOpen(false)}
      />
    </motion.div>
  );
}
```

`motion` já está importado em `TerminalSection.jsx:3` — não precisa adicionar.

## Repo conventions to follow

- Modais entram centrados com `scale 0.9–0.97` + opacidade (AUDIT.md §3: modais são exempt da regra de origem — ficam centrados). `scale 0.96` está no intervalo.
- Curva `--ease-out` = `[0.23, 1, 0.32, 1]` no framer.
- Os outros modais usam AnimatePresence no ponto de montagem — ex.: `App.jsx:119` no SkillsSection usa `AnimatePresence` no mesmo padrão.

## Steps

1. `src/App.jsx`: adicionar `import { AnimatePresence } from 'framer-motion';` e envolver o bloco `{terminalModalOpen && (…)}` (linhas 378-407) com `<AnimatePresence>…</AnimatePresence>`.
2. `src/components/TerminalSection.jsx`: no branch `if (isModal)` (linhas 1038-1048), trocar a `<div>` raiz por `motion.div` com initial/animate/exit/transition conforme o Target. Fechar com `</motion.div>`.

## Boundaries

- NÃO alterar o branch não-modal (linhas 1051-1059) nem o `content`.
- NÃO mudar className da raiz (só trocar `div`→`motion.div` e adicionar props de motion).
- NÃO tocar em outros arquivos.
- Se o código não bater com o citado (drift desde `9cb32b3`), PARE e reporte.

## Verification

- **Mechanical**: `npm run build` sem erro.
- **Feel check**:
  - Abra o terminal (CLI do navbar): aparece com fade + scale 0.96→1 em 0.2s ease-out (responde rápido, sem easeIn).
  - Feche: desaparece espelhando a entrada.
  - O terminal pode abrir como primeira tela (estado persistido em `localStorage` `ricardodev_terminal_open`): a entrada deve ser igualmente suave.
  - DevTools Animations (10%): escala começa em 0.96, curva ease-out.
- **Done when**: o terminal é o único modal com entrada/saída; não há mais pop instantâneo.