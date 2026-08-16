# 008 — Hover ≤300ms e cover-shine via transform

- **Status**: TODO
- **Commit**: `9cb32b3`
- **Severity**: MEDIUM
- **Category**: 2 (Easing & duration) + 5 (Performance)
- **Estimated scope**: `src/index.css` + 6 componentes

## Problem

Hovers (dezenas/dia) duram 500–700ms — devem ser rápidos e sutis (regra: hover `ease`, <300ms). E o brilho do livro 3D anima `left` (layout).

**1. `src/index.css:457-460`** — brilho da capa do livro anima `left`:

```css
.cover-shine {
  ...
  transform: rotate(20deg);
  opacity: 0;
  transition:
    left 0.7s ease,
    opacity 0.3s ease;
}

.book3d:hover .cover-shine {
  left: 130%;
  opacity: 1;
}
```

**2. Hovers longos** (evidência):
- `ProjectsSection.jsx:81` — `group-hover:scale-110 transition-transform duration-700`
- `AllCertificatesModal.jsx:167` — `group-hover:scale-105 … duration-700`
- `CertificatesSection.jsx:94` — `group-hover:scale-105 … duration-700`
- `AboutSection.jsx:75` — `hover:scale-[1.01] transition-all duration-700`
- `BooksSection.jsx:48` — `transition-all duration-500`
- `Footer.jsx:54` — `transition-all duration-500`

## Target

**1. `src/index.css:457-465`** — `left` → `transform` (composite, GPU):

```css
.cover-shine {
  ...
  transform: translateX(0) rotate(20deg);
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.3s ease;
}

.book3d:hover .cover-shine {
  transform: translateX(300%) rotate(20deg);
  opacity: 1;
}
```

(`translateX(300%)` = 3× a largura do brilho ≈ varre a capa inteira. Se o raio visual não cobrir 100%, ajustar para 320–340% — sinta o resultado, não adivinhe.)

**2. Hovers** (substituir a duração; manter as classes de transform/transition do plano 006):

| Arquivo:linha | De | Para |
| --- | --- | --- |
| `ProjectsSection.jsx:81` | `group-hover:scale-110 transition-transform duration-700` | `group-hover:scale-105 transition-transform duration-200` |
| `AllCertificatesModal.jsx:167` | `… duration-700` | `… duration-200` |
| `CertificatesSection.jsx:94` | `… duration-700` | `… duration-200` |
| `AboutSection.jsx:75` | `hover:scale-[1.01] transition-all duration-700` | `hover:scale-[1.01] transition-transform duration-200` |
| `BooksSection.jsx:48` | `transition-all duration-500` | `transition-[border-color,box-shadow] duration-200` |
| `Footer.jsx:54` | `transition-all duration-500` | `transition-[border-color,box-shadow] duration-200` |

Nota: `scale-110` → `scale-105` em `ProjectsSection.jsx:81` porque 110% é forte demais para um hover visto dezenas/dia; o `duration-200` + `scale-105` fica dentro do "rápido e sutil".

## Repo conventions to follow

- Hover = `ease` (decisão do AUDIT.md §2); duração <300ms.
- O site já usa `transition-transform`/`transition-[…]` em vários pontos (ver plano 006).
- `.cover-shine` continua com `transition: … ease` (hover é `ease`, não `ease-out`).

## Steps

1. `src/index.css`: reescrever as linhas 457-465 conforme o Target 1.
2. Aplicar a tabela do Target 2 nos 6 arquivos (exatamente as linhas citadas).

## Boundaries

- NÃO mudar outros hovers além dos listados.
- NÃO tocar nos keyframes do book3d (`index.css:480-488`).
- Se o código não bater com o citado (drift desde `9cb32b3`), PARE e reporte.

## Verification

- **Mechanical**: `npm run build` sem erro; `rg -c "duration-700" src/components/` → 0 (em hovers).
- **Feel check**:
  - Passe o mouse numa imagem de projeto: o zoom (1.05) é perceptível mas rápido (200ms), sem ler "lerdo".
  - Hover no livro 3D: o brilho varre a capa com 0.5s e desliza sem custo de layout (DevTools → performance: só transform/opacity).
  - Hover nos cards `BooksSection`/`Footer`: borda/sombra respondem em 200ms.
- **Done when**: nenhum hover acima de 300ms; `.cover-shine` anima só `transform`/`opacity`.