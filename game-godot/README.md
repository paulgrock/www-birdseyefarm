# Dragon Hunter — Godot 4 port

A second copy of the Mega Man X–style game, rebuilt in **Godot 4** with **GDScript**.
Same design as the Unity version (`../game/`): a human dragon-slayer clears four
elemental dragon stages — Fire, Ice, Water, Earth — chosen from a Mega Man X-style
hub. Defeating a dragon grants its element as a weapon, and each dragon is weak to
one element, so order matters.

Placeholder art is flat colored rectangles (`Polygon2D` / `ColorRect`), trivial to
replace later.

## Requirements

- **Godot 4.2 or newer** (the standard build — GDScript, no C#/.NET needed).
  Download from <https://godotengine.org>.

## Running it

The scenes **build themselves at runtime in GDScript**, so there's nothing to
generate and no editor setup. Just:

1. Open Godot, **Import**, and select `game-godot/project.godot`.
2. Press **Play** (F5). The main scene is the title screen.

That's the whole setup. (The input map is also created in code on startup, in
`GameManager._setup_input()`, so you don't need to configure Project Settings.)

## Controls

| Action | Keys |
| --- | --- |
| Move | `A` / `D` or `←` / `→` |
| Jump (variable height) | `Space` / `W` / `↑` |
| Dash | `Shift` |
| Wall-slide / wall-jump | hold toward a wall while airborne, then jump |
| Shoot (tap) / charge (hold then release) | `J` or `Ctrl` |
| Switch weapon | `Q` / `E`, or number keys `1`–`5` |
| Menus / hub confirm | `Space` / `J` / `Enter` |

## The dragons and the weakness cycle

Each dragon takes **3× damage** from the element it's weak to.

| Dragon | Weak to | Attacks |
| --- | --- | --- |
| Fire | **Earth** | three-way fireball spread, charge dash |
| Ice | **Fire** | falling icicle rain, low freeze breath |
| Water | **Ice** | arcing bubble lobs, hop-and-spray fan |
| Earth | **Water** | arcing boulders, ground-pound shockwaves |

You start with only the **Neutral** bolt. A clearing order that chains each
unlocked weapon into the next dragon's weakness: **Earth → Fire → Ice → Water**.

## How it maps from the Unity version

| Unity | Godot 4 |
| --- | --- |
| `PlayerController` + manual box-casts | `CharacterBody2D` + `move_and_slide()`, `is_on_floor()`, `is_on_wall()` |
| Dynamic-trigger `Projectile` | `Area2D` with `body_entered` (faction handled purely by collision masks) |
| Boss attacks as `IEnumerator` coroutines | `await get_tree().create_timer(t).timeout` |
| `GameManager` + `DontDestroyOnLoad` | autoload singleton (`project.godot` → `[autoload]`) |
| uGUI `Canvas`/filled `Image`/`Text` | `CanvasLayer` + `ColorRect` bars + `Label` |
| Editor scene auto-builder | scenes self-build at runtime in their `_ready()` |
| Tinted white sprite | `Polygon2D` / `ColorRect` |

## Project layout

```
game-godot/
├── project.godot          # config, autoload, physics layers
├── icon.svg
├── scenes/                # thin scene files; all content is built in code
│   ├── title.tscn / victory.tscn / game_over.tscn   (share menu.gd via `kind`)
│   ├── stage_select.tscn
│   └── stage.tscn         # one parametrized stage, picks the dragon from GameManager
└── scripts/
    ├── core/    elements.gd, game_manager.gd (autoload), build.gd
    ├── actors/  player.gd, projectile.gd, dragon_boss.gd + fire/ice/water/earth, patrol_enemy.gd
    ├── level/   hazard.gd (kill zone), boss_arena.gd
    ├── ui/      hud.gd
    └── scenes/  menu.gd, stage_select.gd, stage.gd
```

Unlike the Unity version's four separate stage scenes, here a single `stage.tscn`
reads `GameManager.current_stage` and builds the right dragon — Godot's autoload
makes that parametrization clean.

## Notes

- **Coordinates are Y-down** (Godot convention): "up" is negative Y. Jumps use
  negative Y velocity; gravity is positive.
- **No friendly fire by construction:** a player shot's collision mask only watches
  the enemy + world layers, an enemy shot's only the player + world — so a shot can
  never hit its own side, and no per-hit faction check is needed.
- Placeholder art only; no audio. Swap a `Polygon2D`/`ColorRect` for a `Sprite2D`
  (or add an `AnimatedSprite2D`) on any actor to bring in real art without touching
  gameplay code.
- I built this without running Godot in the dev environment, so it's verified by
  review rather than a live run. If anything errors on first load, send the output
  and I'll fix it.
