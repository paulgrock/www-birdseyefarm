class_name Player
extends CharacterBody2D

## Mega Man X-style dragon-slayer: run, variable-height jump, ground dash, and
## wall-slide + wall-jump, plus health and the charged elemental weapon. Uses
## CharacterBody2D + move_and_slide() with Godot's built-in is_on_floor() /
## is_on_wall() / get_wall_normal(), which replace Unity's manual box-casts.
## Note: Godot is Y-down, so "up" is negative Y.

const SIZE := Vector2(44, 88)

# Run / jump
const MOVE_SPEED := 320.0
const ACCEL := 2600.0
const AIR_ACCEL := 1700.0
const GRAVITY := 2000.0
const FALL_MULT := 1.6
const LOW_JUMP_MULT := 2.4
const JUMP_SPEED := 800.0
const TERMINAL_FALL := 1400.0
const COYOTE := 0.10
const JUMP_BUFFER := 0.10

# Dash
const DASH_SPEED := 720.0
const DASH_TIME := 0.20
const DASH_CD := 0.35

# Wall
const WALL_SLIDE_SPEED := 150.0
const WALL_JUMP := Vector2(430, 760)  # x push-away, y up
const WALL_LOCK := 0.18

# Weapon
const FIRE_RATE := 0.25
const MAX_CHARGE := 0.9
const BASE_DMG := 1.0
const CHARGED_DMG := 4.0
const PROJ_SPEED := 760.0

const MAX_HEALTH := 16.0
const INVINCIBLE_TIME := 1.0

var max_health := MAX_HEALTH
var health := MAX_HEALTH
var facing := 1
var invincible := 0.0
var _dead := false

var _coyote := 0.0
var _buffer := 0.0
var _dash := 0.0
var _dash_cd := 0.0
var _wall_lock := 0.0

var _cooldown := 0.0
var _charge := 0.0
var _charging := false

var _vis: Polygon2D
var camera: Camera2D

func _ready() -> void:
    add_to_group("player")
    collision_layer = Build.L_PLAYER
    collision_mask = Build.L_WORLD

    var col := CollisionShape2D.new()
    var shape := RectangleShape2D.new()
    shape.size = SIZE
    col.shape = shape
    add_child(col)

    _vis = Build.rect(SIZE, Color(0.30, 0.55, 0.95), 3)
    add_child(_vis)

    camera = Camera2D.new()
    camera.position_smoothing_enabled = true
    camera.position_smoothing_speed = 8.0
    add_child(camera)
    camera.make_current()

func _physics_process(delta: float) -> void:
    invincible = max(0.0, invincible - delta)
    _tick_timers(delta)
    _update_blink()

    if _dead:
        return

    var on_floor := is_on_floor()
    var on_wall := is_on_wall() and not on_floor
    var wall_normal := get_wall_normal()

    if Input.is_action_just_pressed("jump"):
        _buffer = JUMP_BUFFER
    if Input.is_action_just_pressed("dash"):
        _try_dash()

    var input_x := Input.get_axis("move_left", "move_right")
    if absf(input_x) > 0.01 and _wall_lock <= 0.0:
        facing = 1 if input_x > 0.0 else -1

    if _dash > 0.0:
        velocity.x = facing * DASH_SPEED
        velocity.y = 0.0
    else:
        _normal_movement(input_x, on_floor, on_wall, wall_normal, delta)

    _handle_fire(delta)
    move_and_slide()

func _normal_movement(input_x: float, on_floor: bool, on_wall: bool,
        wall_normal: Vector2, delta: float) -> void:
    var accel := ACCEL if on_floor else AIR_ACCEL
    if _wall_lock <= 0.0:
        velocity.x = move_toward(velocity.x, input_x * MOVE_SPEED, accel * delta)

    # Gravity (heavier on the way down, and when the jump button is released early).
    var g := GRAVITY
    if velocity.y > 0.0:
        g *= FALL_MULT
    elif velocity.y < 0.0 and not Input.is_action_pressed("jump"):
        g *= LOW_JUMP_MULT
    velocity.y += g * delta

    # Wall slide: pressing toward the wall while falling.
    var pressing_wall := input_x != 0.0 and signf(input_x) == -signf(wall_normal.x)
    if on_wall and velocity.y > 0.0 and pressing_wall:
        velocity.y = min(velocity.y, WALL_SLIDE_SPEED)

    if on_floor:
        _coyote = COYOTE

    if _buffer > 0.0:
        if _coyote > 0.0:
            velocity.y = -JUMP_SPEED
            _buffer = 0.0
            _coyote = 0.0
        elif on_wall:
            velocity.x = wall_normal.x * WALL_JUMP.x
            velocity.y = -WALL_JUMP.y
            facing = int(signf(wall_normal.x))
            _wall_lock = WALL_LOCK
            _buffer = 0.0

    velocity.y = min(velocity.y, TERMINAL_FALL)

func _try_dash() -> void:
    if _dash_cd > 0.0 or _dash > 0.0:
        return
    _dash = DASH_TIME
    _dash_cd = DASH_CD

func _tick_timers(delta: float) -> void:
    _coyote = max(0.0, _coyote - delta)
    _buffer = max(0.0, _buffer - delta)
    _dash = max(0.0, _dash - delta)
    _dash_cd = max(0.0, _dash_cd - delta)
    _wall_lock = max(0.0, _wall_lock - delta)
    _cooldown = max(0.0, _cooldown - delta)

# --- Weapon ------------------------------------------------------------------

func _handle_fire(delta: float) -> void:
    if Input.is_action_just_pressed("weapon_next"):
        GameManager.cycle_weapon(1)
    if Input.is_action_just_pressed("weapon_prev"):
        GameManager.cycle_weapon(-1)

    if Input.is_action_just_pressed("fire") and _cooldown <= 0.0:
        _charging = true
        _charge = 0.0
    if _charging and Input.is_action_pressed("fire"):
        _charge += delta
    if _charging and Input.is_action_just_released("fire"):
        _fire(_charge >= MAX_CHARGE)
        _charging = false
        _cooldown = FIRE_RATE

func _fire(charged: bool) -> void:
    var element: int = GameManager.selected_weapon
    var spawn_pos := global_position + Vector2(facing * 34.0, -8.0)
    var dmg := CHARGED_DMG if charged else BASE_DMG
    var p := Projectile.spawn(get_parent(), spawn_pos, Vector2(facing, 0.0),
        Projectile.FACTION_PLAYER, element, dmg, PROJ_SPEED, 0.0)
    if charged:
        p.set_scale_mult(1.9)

func _unhandled_input(event: InputEvent) -> void:
    # Direct weapon select by number key (only switches to unlocked weapons).
    if event is InputEventKey and event.pressed and not event.echo:
        match event.physical_keycode:
            KEY_1: GameManager.select_weapon(Elements.E.NEUTRAL)
            KEY_2: GameManager.select_weapon(Elements.E.FIRE)
            KEY_3: GameManager.select_weapon(Elements.E.ICE)
            KEY_4: GameManager.select_weapon(Elements.E.WATER)
            KEY_5: GameManager.select_weapon(Elements.E.EARTH)

# --- Health ------------------------------------------------------------------

func take_damage(amount: float, _source_element: int, source_pos: Vector2) -> void:
    if _dead or invincible > 0.0:
        return
    health = max(0.0, health - amount)
    invincible = INVINCIBLE_TIME

    var dir := signf(global_position.x - source_pos.x)
    if dir == 0.0:
        dir = 1.0
    velocity = Vector2(dir * 360.0, -260.0)  # knockback away + up
    _wall_lock = WALL_LOCK                    # brief loss of control so it reads

    if health <= 0.0:
        _die()

## Lethal damage that ignores invincibility — used by the bottomless-pit kill zone
## so a player who falls in while briefly invincible still dies.
func kill() -> void:
    if _dead:
        return
    health = 0.0
    _die()

func _die() -> void:
    _dead = true
    GameManager.on_player_died()

func _update_blink() -> void:
    if _vis == null:
        return
    var a := 1.0
    if invincible > 0.0:
        a = 0.35 if fmod(invincible * 12.0, 1.0) < 0.5 else 1.0
    _vis.modulate.a = a
