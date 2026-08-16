# 012 — TimeTravel: barras de progresso via scaleX (não width)

- **Status**: TODO
- **Commit**: `9cb32b3`
- **Severity**: LOW
- **Category**: 5 — Performance
- **Estimated scope**: 1 arquivo, 2 linhas

## Problem

Durante a viagem no tempo, duas barras de progresso animam `width` **a cada frame do rAF** (`speed` muda ~60×/s), forçando layout+paint a cada tick — no pior momento (overlay fullscreen com o main thread já ocupado).

`src/components/TimeTravelAnimation.jsx:347`:

```jsx
style={{ width: `${speed}%`, transition: 'width 80ms linear' }}
```

`src/components/TimeTravelAnimation.jsx:373`:

```jsx
style={{ width: `${(speed / 88) * 100}%`, transition: 'width 80ms linear' }}
```

## Target

Trocar `width` por `transform: scaleX` (composite/GPU) com `transform-origin: left`:

**Linha 347**:

```jsx
style={{ transform: `scaleX(${speed / 100})`, transformOrigin: 'left', transition: 'transform 80ms linear' }}
```

**Linha 373**:

```jsx
style={{ transform: `scaleX(${speed / 88})`, transformOrigin: 'left', transition: 'transform 80ms linear' }}
```

(`speed` varia 0→88; `speed/88` ∈ [0,1] para a segunda barra, `speed/100` ∈ [0,1] para a primeira — o `scaleX` vai de 0 a 1.)

Os elementos já têm `h-full bg-gradient-to-r … rounded-full` — o `scaleX` encolhe a barra pelo lado esquerdo corretamente (origem left), mantendo o visual idêntico.

## Repo conventions to follow

- `transform: scaleX` + `transform-origin: left` já é o padrão usado na barra de progresso do `AchievementToast.jsx:125` (`transformOrigin: 'left'`, `scaleX`).
- Marquee e keyframes do site usam `linear` para movimento constante — mantém.

## Steps

1. `TimeTravelAnimation.jsx:347`: substituir o `style` conforme o Target.
2. `TimeTravelAnimation.jsx:373`: substituir o `style` conforme o Target.

## Boundaries

- NÃO tocar nos keyframes `x/y/scale` do `motion.div` (`TimeTravelAnimation.jsx:316-321`) — easter egg raro fullscreen, aceitável.
- NÃO alterar os valores de `speed`.
- Se o código não bater com o citado (drift desde `9cb32b3`), PARE e reporte.

## Verification

- **Mechanical**: `npm run build` sem erro; `rg -c "transition: 'width" src/` → 0.
- **Feel check**:
  - Dispare a viagem no tempo (`timewalker`): as duas barras preenchem suavemente de 0 a 100%, sem pulos, enquanto a velocidade sobe 0→88.
  - DevTools → Performance durante o efeito: sem invalidação de layout por largura (só compositor).
- **Done when**: nenhuma barra anima `width` durante a viagem no tempo.