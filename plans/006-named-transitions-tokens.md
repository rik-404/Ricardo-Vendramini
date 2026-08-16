# 006 — Trocar `transition: all` e curvas manuais por tokens nomeados

- **Status**: TODO
- **Commit**: `9cb32b3`
- **Severity**: MEDIUM
- **Category**: 5 (Performance) + 7 (Cohesion & tokens)
- **Estimated scope**: `src/index.css` + ~70 classNames em `src/components/**`

## Problem

Dois problemas agrupados:

**A. `transition: all` + curva manual no `.glass-card`** — `src/index.css:151`:

```css
.glass-card {
  ...
  transition: all 0.3s cubic-bezier(0.2, 0, 0.2, 1);
}
```

`transition: all` anima propriedades não-intencionais off-GPU; e `cubic-bezier(0.2, 0, 0.2, 1)` duplica a mão o token `--ease-out` que já existe.

**B. `transition-all` em ~70 elementos** — classe Tailwind que anima TODAS as propriedades (transform, cores, border, box-shadow, layout). A maioria só muda cor/borda/sombra no hover. Lista de ocorrências (grep `transition-all` em `src/components/**/*.jsx`):

`App.jsx:299,415` · `Navbar.jsx:22,31,239,254,312,322` · `HeroSection.jsx:56,113,121` · `AboutSection.jsx:75,83,148` · `Footer.jsx:54,95,115,169` · `ProjectsSection.jsx:47,71` · `SkillsSection.jsx:49,74,129` · `CertificatesSection.jsx:60,84,164,221,228` · `TechLabSection.jsx:62` · `LeadershipSection.jsx:56` · `AchievementsSection.jsx:45` · `TimelineSection.jsx:62` · `ContactSection.jsx:56` · `BookModal.jsx:43,131` · `BooksSection.jsx:48,116` · `ProjectModal.jsx:42,281` · `AllProjectsModal.jsx:64,92,110,140,225` · `AllSkillsModal.jsx:55,90,108,177,223` · `AllCertificatesModal.jsx:79,107,125,148,159,222,274,281` · `AchievementsModal.jsx:114,129,144,191` · `StarWarsCrawlOverlay.jsx:188,196,286` · `BreakoutOverlay.jsx:660,668,676,705,737,777` · `TerminalSection.jsx:998` · `Retro1999Overlay.jsx:487`.

## Target

**A. `src/index.css:151`** — o `.glass-card:hover` só muda `border-color` e `box-shadow` (`index.css:154-157`), então:

```css
.glass-card {
  ...
  transition: border-color 200ms var(--ease-out), box-shadow 200ms var(--ease-out);
}
```

**B. Regra de decisão** para cada `transition-all` (aplicar por grep, sem exceção):

| Se o hover muda apenas | Substituir por |
| --- | --- |
| cor/borda/fundo (`hover:text-…`, `hover:bg-…`, `hover:border-…`, `focus:border-…`) | `transition-colors` |
| transform (`hover:scale-…`, `hover:-translate-y-…`, `group-hover:scale-…`) | `transition-transform` |
| cor + transform juntos | `transition-[background-color,border-color,color,transform]` |
| sombra/borda em `.glass-card`/`.glass-panel` | remover `transition-all` (o `.glass-card` base do index.css cobre) |

Exemplos exatos:
- `HeroSection.jsx:113` `transition-all transform hover:-translate-y-1` → `transition-transform transform hover:-translate-y-1`
- `HeroSection.jsx:56` `… hover:scale-105 transition-all` → `transition-transform` (mantém `hover:scale-105`)
- `Navbar.jsx:239` `transition-all duration-300 chpw-header` → `transition-[background-color,border-color,box-shadow] duration-300` (o header muda bg/borda/sombra no scroll — e evita interpolar `backdrop-filter`, ver plano 010)
- `BookModal.jsx:43`, `AllProjectsModal.jsx:64`, `AllSkillsModal.jsx:55`, `AllCertificatesModal.jsx:79` (botões fechar) `… hover:text-[#00ff88] hover:border-[#00ff88] transition-all` → `transition-colors`
- `AllSkillsModal.jsx:90` (input) `… focus:border-[#00ff88] transition-all` → `transition-colors`
- Cards `glass-card` que só mudam borda no hover (`ProjectsSection.jsx:71`, `SkillsSection.jsx:74`, `CertificatesSection.jsx:84`, `AllProjectsModal.jsx:140`, `AllCertificatesModal.jsx:159`, `TimelineSection.jsx:62`, `LeadershipSection.jsx:56`, `AchievementsSection.jsx:45`, `AboutSection.jsx:148`) → remover `transition-all duration-300` (o `.glass-card` base anima borda/sombra)
- `Footer.jsx:54` `… transition-all duration-500 …` (muda só borda/sombra) → `transition-[border-color,box-shadow] duration-200`
- `StarWarsCrawlOverlay.jsx:188,196` (botões que mudam cor) → `transition-colors`

**C. `src/index.css:177-182`** — `.apple-press-feedback` usa curva manual:

```css
.apple-press-feedback {
  transition: transform 120ms cubic-bezier(0.2, 0, 0, 1), box-shadow 150ms ease;
}
```

→ usar o token:

```css
.apple-press-feedback {
  transition: transform 120ms var(--ease-out), box-shadow 150ms ease;
}
```

## Repo conventions to follow

- O token `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` está em `src/index.css:16` — toda transição deliberada deve usá-lo.
- O projeto já usa variantes arbitrárias Tailwind (ex.: `shadow-glow-md`), então `transition-[…]` é idiomático aqui.

## Steps

1. `src/index.css`: substituir a linha `transition` do `.glass-card` (151) e a curva do `.apple-press-feedback` (178).
2. Rodar `rg -l "transition-all" src/` e, para cada ocorrência, aplicar a regra de decisão acima (mantendo `duration-*` onde houver, exceto nos casos do plano 008 que ajustam para `duration-200`).
3. Nos botões/cards que só mudam cor, usar `transition-colors`; nos que só escalam, `transition-transform`; nos `.glass-card` sem transform, remover o `transition-all`.

## Boundaries

- NÃO alterar easing/duration dos easter eggs fullscreen (StarWars, TimeTravel, Breakout, Retro1999) além do padrão de cores.
- Os `transition-all` dos overlays de jogo (BreakoutOverlay:705,737,777) são botões de cor → `transition-colors`.
- NÃO tocar em keyframes nem em `@media`.
- Se o código não bater com o citado (drift desde `9cb32b3`), PARE e reporte.

## Verification

- **Mechanical**: `npm run build` sem erro; `rg -c "transition-all" src/` → 0; `rg -c "transition: all" src/` → 0.
- **Feel check**:
  - Hovers de cor/borda continuam suaves (não podem ficar instantâneos).
  - Hovers de scale continuam suaves e na mesma duração (o `transition-transform` preserva).
  - O header continua com transição suave de fundo/sombra ao rolar.
  - Abrir/fechar modais e drawers: sem regressão de entrada/saída.
- **Done when**: nenhum `transition: all`/`transition-all` no source; curvas manuais substituídas pelo token.