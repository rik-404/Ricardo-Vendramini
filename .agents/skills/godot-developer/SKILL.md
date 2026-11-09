---
name: godot-developer
description: "Use when building or migrating games in Godot 4 with GDScript (or C#): scenes and nodes, CharacterBody3D/2D movement, cameras (SpringArm3D orbit/follow), spawning and object pooling, signals, autoloads, resources (.tres) for data, UI/Control HUDs, saving with user:// , and exporting to Web/HTML5, desktop and mobile. Trigger keywords: Godot, GDScript, .tscn, .gd, Node3D, CharacterBody3D, SpringArm3D, godot export, itch.io html5, Horda Voxel."
license: MIT
metadata:
  version: "1.0.0"
  domain: specialized
  engine: Godot 4.3+
  language: GDScript (primary), C# (optional)
---

# Godot Developer

Guidance for building and migrating games in **Godot 4.3+** with **GDScript**. Tuned for
this repo's migration of the web game *Horda Voxel* (see `godot/`).

## Core workflow

1. **Model as nodes/scenes.** A scene (`.tscn`) is a tree of nodes. Prefer small reusable
   scenes (Player, Enemy, Projectile). When hand-authoring without the editor, build node
   trees in code (`_ready`) and keep `.tscn` files minimal — hand-written `.tscn` with
   sub-resources is error-prone.
2. **One script per behavior.** `extends <NodeType>` + optional `class_name` so the type is
   global (`Enemy.new()` works anywhere; do NOT also `preload` it under the same name — that
   collides with the global class name).
3. **Wire with signals**, not polling, for events (`died`, `leveled`). Connect in Godot 4
   with `node.signal_name.connect(callable)`.
4. **Share state via autoloads** (Project Settings → Autoload, or `[autoload]` in
   `project.godot`). Keep them small (e.g. `Global` holding `cam_yaw`).
5. **Data in resources or dictionaries**, never hardcoded in logic. Use `Resource` subclasses
   (`.tres`) or a `const` dictionary in an autoload for class/upgrade tables.
6. **Test in editor (F5)** and fix the parser errors it reports; then **export** per target.

## Godot 4 essentials (differs from Godot 3!)

- Movement: `CharacterBody3D` uses the built-in `velocity` property and `move_and_slide()`
  **with no arguments**. `is_on_floor()` works after `move_and_slide()`.
- Angles/vectors: `Basis(Vector3.UP, yaw) * local_dir` rotates a direction by a yaw.
  `Vector3.lerp`, `Vector3.move_toward`, `atan2(x, z)` for facing.
- Input: for a quick prototype use `Input.is_physical_key_pressed(KEY_W)` in
  `_physics_process`, and one-shot keys/mouse in `_unhandled_input` (`InputEventKey`,
  `InputEventMouseButton`, `InputEventMouseMotion`). For shipping, define actions in the
  Input Map and use `Input.get_vector(...)` / `Input.is_action_just_pressed(...)`.
- Camera: a **pivot `Node3D`** (position = target, `rotation.y` = yaw) → **`SpringArm3D`**
  child (`rotation.x` = -pitch, `spring_length` = zoom, auto-pulls in on collision) →
  **`Camera3D`** child. Smooth-follow by lerping the pivot's `global_position`.
- Timers: decrement your own `float` accumulators by `delta` (fine for games), or use
  `Timer` nodes / `await get_tree().create_timer(t).timeout`.
- UI: `CanvasLayer` → `Control`/`Label`/`ProgressBar`. Size text with
  `add_theme_font_size_override("font_size", n)`. Anchor with `anchor_right`, `offset_*`,
  or `set_anchors_preset(Control.PRESET_*)`.
- Randomness: call `randomize()` once; use `randf()`, `randf_range(a,b)`, `randi() % n`.
- Pausing: set `get_tree().paused = true`; nodes that must keep running (menus) set
  `process_mode = Node.PROCESS_MODE_ALWAYS` (or `WHEN_PAUSED`).
- Saving: `FileAccess.open("user://save.json", FileAccess.WRITE)` + `JSON.stringify`.
  `user://` is the per-user writable path (survives export). Never write to `res://` at runtime.

## MUST DO
- Use `delta` for all movement/timers (frame-independent).
- Pool frequently spawned nodes (projectiles, enemies) instead of `new()/queue_free()` in
  tight loops once counts get high; reuse with a free list and `visible`/`set_physics_process`.
- Cache node references (`@onready var x := $Path`) — avoid `get_node`/`get_nodes_in_group`
  every frame when a cached ref or a maintained array works.
- Keep per-frame group scans small (a few dozen); for hundreds of entities maintain arrays.
- Type variables (`var hp: float`) so the GDScript analyzer catches errors before runtime.
- Put writable data under `user://`; read-only data under `res://`.

## MUST NOT
- Don't access an undeclared member on a statically-typed var (e.g. a signal on `Node3D`);
  type it as the concrete class, or leave it untyped for dynamic access.
- Don't `preload("res://enemy.gd")` into a `const Enemy` when `enemy.gd` has
  `class_name Enemy` — duplicate identifier.
- Don't set `global_position` before `add_child` and expect world coords; add first, then set.
- Don't write to `res://` at runtime (read-only in exported builds).
- Don't call `move_and_slide(velocity)` (that's Godot 3) — set `velocity`, then
  `move_and_slide()`.

## Exporting (Project → Export; install export templates when prompted)
- **Web / HTML5** → a folder with `index.html`; zip and upload to **itch.io**
  (set the uploaded zip as "This file will be played in the browser").
  Requires cross-origin isolation headers, which itch.io provides automatically.
- **Windows / Linux / macOS** → desktop builds (itch.io app, Steam via a wrapper or native).
- **Android / iOS** → needs the Android SDK / Xcode set up in Editor Settings.

## This project (Horda Voxel → Godot)
Files live in `godot/`. Conventions already in place:
- `Global` autoload holds `cam_yaw`; the player moves relative to it (Megabonk-style).
- Main scene builds the world, camera rig, HUD and spawner in code.
- Classes and upgrades live in data tables (`classdata.gd`, upgrade pool), applied to the
  player's `stats` dictionary — mirror the web version's `CLASSES`/`STAT_UPS`.
- Entities (`Player`, `Enemy`, `Minion`) use `class_name` and groups
  (`"player"`, `"enemy"`, `"minion"`, `"main"`).
Keep new systems faithful to `dist/jogos/horda-voxel.html` (the reference implementation).
