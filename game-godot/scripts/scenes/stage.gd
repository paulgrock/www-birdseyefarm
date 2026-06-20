extends Node2D

## Builds a dragon stage at runtime from GameManager.current_stage: terrain with
## two jumpable pits, an optional wall-jump shaft, a floating platform, two patrol
## enemies, a bottomless-pit kill zone, the player, the HUD, and the boss in its
## sealed arena. (Y-down: smaller Y is higher up.)

const FireDragon := preload("res://scripts/actors/fire_dragon.gd")
const IceDragon := preload("res://scripts/actors/ice_dragon.gd")
const WaterDragon := preload("res://scripts/actors/water_dragon.gd")
const EarthDragon := preload("res://scripts/actors/earth_dragon.gd")

const GROUND_TOP := 360.0
const BOSS_SIZE := Vector2(130, 130)

func _ready() -> void:
    var element: int = GameManager.current_stage
    var base := Elements.color_of(element)
    var ground_color := base.darkened(0.55)
    RenderingServer.set_default_clear_color(base.darkened(0.78))

    # Terrain: three runs with two pits, ending at the arena floor.
    Build.make_ground(self, 390, GROUND_TOP, 740, 200, ground_color)   # start: 20..760
    Build.make_ground(self, 1250, GROUND_TOP, 620, 200, ground_color)  # middle: 940..1560
    Build.make_ground(self, 2350, GROUND_TOP, 1220, 200, ground_color) # arena: 1740..2960

    # Floating platform to dash-jump onto, over the first pit.
    Build.make_ground(self, 850, 235, 180, 28, ground_color)

    # Optional wall-jump shaft on the start run. The walls float above the
    # continuous start floor (bottom at y=180) so the player can walk in
    # underneath, then jump up and wall-jump between them to the perch.
    Build.make_ground(self, 120, -40, 40, 220, ground_color)  # left wall  (y -40..180)
    Build.make_ground(self, 300, -40, 40, 220, ground_color)  # right wall (gap 140..280)
    Build.make_ground(self, 210, -90, 240, 28, ground_color)  # reward perch

    # Bottomless-pit kill zone beneath everything.
    var kill := Hazard.new()
    kill.instant_kill = true
    kill.size = Vector2(3400, 200)
    kill.position = Vector2(1480, 760)
    add_child(kill)

    # Player.
    var player := Player.new()
    player.position = Vector2(420, 260)
    add_child(player)
    player.camera.limit_left = 0
    player.camera.limit_right = 2960
    player.camera.limit_top = -260
    player.camera.limit_bottom = 620

    # Patrol enemies.
    _add_patrol(Vector2(1250, 320))
    _add_patrol(Vector2(2100, 320))

    # HUD.
    var hud := Hud.new()
    add_child(hud)

    # Boss in the arena.
    var boss: DragonBoss = _make_boss(element)
    boss.size = BOSS_SIZE
    boss.floor_y = GROUND_TOP - BOSS_SIZE.y * 0.5
    boss.position = Vector2(2350, boss.floor_y)
    boss.boss_bar = hud
    add_child(boss)

    # Seal wall (raised when the fight begins).
    var seal := Build.make_ground(self, 1760, -100, 40, 520, Color(0.2, 0.2, 0.2))
    seal.name = "SealWall"

    # Arena trigger.
    var arena := BossArena.new()
    arena.boss = boss
    arena.seal_wall = seal
    arena.size = Vector2(50, 520)
    arena.position = Vector2(1900, 150)
    add_child(arena)

func _add_patrol(pos: Vector2) -> void:
    var p := PatrolEnemy.new()
    p.position = pos
    add_child(p)

func _make_boss(element: int) -> DragonBoss:
    match element:
        Elements.E.FIRE: return FireDragon.new()
        Elements.E.ICE: return IceDragon.new()
        Elements.E.WATER: return WaterDragon.new()
        Elements.E.EARTH: return EarthDragon.new()
        _: return FireDragon.new()
