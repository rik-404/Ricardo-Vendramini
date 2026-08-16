# 001 — Montar o AchievementToast na raiz do App

- **Status**: TODO
- **Commit**: `9cb32b3`
- **Severity**: HIGH
- **Category**: 8 — Missed opportunities (celebração rara morta)
- **Estimated scope**: 1 arquivo, ~3 linhas

## Problem

O toast de conquista está **perfeitamente construído mas nunca é montado**. O componente `AchievementToast` (default export em `src/components/AchievementToast.jsx:55`) só é usado via exports nomeados `dispatchAchievementUnlocked`, `ACHIEVEMENTS_META`, `ACHIEVEMENT_IDS` — que apenas **disparam** o evento `ricardodev-achievement-unlocked`. Nenhum arquivo importa o default export.

Evidência — grep em `src/`:
- `src/components/Navbar.jsx:3` → `import { dispatchAchievementUnlocked } from './AchievementToast';`
- `src/components/TerminalSection.jsx:6` → `import { dispatchAchievementUnlocked, ACHIEVEMENTS_META } from './AchievementToast';`
- `src/components/StarWarsCrawlOverlay.jsx:6`, `src/components/BreakoutOverlay.jsx:5` → idem
- `src/components/AchievementsModal.jsx:4` → `import { ACHIEVEMENTS_META, ACHIEVEMENT_IDS } from './AchievementToast';`

Resultado: desbloquear Konami, Matrix, Breakout, Star Wars, "clean" etc. dispara o evento, mas **nada renderiza**. A celebração rara de alta emoção (spring scale-in + chime WebAudio + barra de progresso) é tree-shaken do bundle.

O toast em si está no padrão (`AchievementToast.jsx:108-126`):
- `AnimatePresence mode="wait"`, `initial={{ opacity: 0, y: -20, scale: 0.9 }}`, spring `stiffness: 300, damping: 25`, exit espelhado à entrada.
- Barra de progresso: `@keyframes achvProgress` com `transform: scaleX(1→0)` (GPU-safe, `scaleX` não é layout).

## Target

Montar o toast **uma única vez** no root, junto dos outros componentes globais.

Em `src/App.jsx`:

```jsx
import AchievementToast from './components/AchievementToast';
```

E renderizar no topo do JSX retornado (logo após `<SeoManager />`, antes de `<CustomCursor />`):

```jsx
{/* Achievement Celebration Toast (montado uma vez, no root) */}
<AchievementToast />
```

## Repo conventions to follow

- O componente já usa `useLanguage()` internamente para os textos (`AchievementToast.jsx:56`) — montar uma vez é suficiente, não precisa de provider adicional.
- O padrão de renderizar overlays/toasts globais no root já existe em `App.jsx` (ex.: `<CustomCursor />` em `App.jsx:252`, `<HeroCanvas />` em `App.jsx:255`).
- `z-[9999999]` do toast já é o maior z-index do site — ficará acima de tudo.

## Steps

1. Em `src/App.jsx`, adicionar o import `import AchievementToast from './components/AchievementToast';` junto aos demais imports de componentes (bloco de `App.jsx:1-31`).
2. No corpo retornado do componente `App`, adicionar `<AchievementToast />` imediatamente após a linha `<SeoManager />` (`App.jsx:249`).

## Boundaries

- NÃO alterar nada dentro de `src/components/AchievementToast.jsx` — o componente está correto.
- NÃO adicionar mais de um `<AchievementToast />` (duplicaria os toasts).
- NÃO tocar em outros arquivos.
- Se o código não bater com o citado (drift desde o commit `9cb32b3`), PARE e reporte.

## Verification

- **Mechanical**: `npm run build` termina sem erro; em `dist/assets/*.js`, `grep -c "achv-toast"` retorna > 0 (antes era 0).
- **Feel check**:
  - Digite o código Konami (`↑↑↓↓←→←→b a`) — o toast deve surgir no topo-direito com spring, chime sonoro e barra de progresso de 4.2s.
  - Digite "matrix", "breakout", "starwars", "clean" — cada um deve encadear um toast (fila, um de cada vez, `mode="wait"`).
  - Feche um toast com o X — a saída espelha a entrada (`y:-20, scale:0.9, opacity:0`), sem pulo.
- **Done when**: desbloquear qualquer conquista mostra o toast; não há toast duplicado; bundle contém o componente.