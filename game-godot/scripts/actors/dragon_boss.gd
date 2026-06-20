class_name DragonBoss
extends CharacterBody2D

## Base class for the four elemental dragons. Handles health, the weakness damage
## multiplier, facing, contact damage, the boss bar, and a "telegraph -> attack ->
## recover" loop driven by `await`. Each dragon sets its element/stats in _init()
## and overrides execute_attack(). The body hovers (collision_mask 0) but is on the
## enemy layer so player shots can hit it; it applies its own gravity so hop/leap
## attacks arc back to a resting line.

var element: int = Elements.E.FIRE
var max_health := 40.0
var contact_damage := 3.0
var time_between_attacks := 1.6
var gravity := 1100.0
var size := Vector2(130, 130)
var floor_y := 0.0  # resting world Y for the body's center; set by the stage

var health := 0.0
var active := false
var dead := false
var target: Node2D = null
var boss_bar = null  # the HUD, which exposes show_bar/update_bar/hide_bar

var _vis: Polygon2D
var _contact_area: Area2D
var _flash := 0.0

func _ready() -> void:
    health = max_health
    collision_layer = Build.L_ENEMY
    collision_mask = 0  # hovers; doesn't collide with terrain
    add_to_group("enemy")

    var col := CollisionShape2D.new()
    var shape := RectangleShape2D.new()
    shape.size = size
    col.shape = shape
    add_child(col)

    _vis = Build.rect(size, Elements.color_of(element), 4)
    add_child(_vis)

    # Area that hurts the player on contact (polled for continuous damage).
    _contact_area = Area2D.new()
    _contact_area.collision_layer = 0
    _contact_area.collision_mask = Build.L_PLAYER
    var acol := CollisionShape2D.new()
    var ashape := RectangleShape2D.new()
    ashape.size = size
    acol.shape = ashape
    _contact_area.add_child(acol)
    add_child(_contact_area)

func activate(player: Node2D) -> void:
    if active:
        return
    target = player
    active = true
    if boss_bar:
        boss_bar.show_bar(health, max_health, element)
    _attack_loop()

func _attack_loop() -> void:
    await timer(1.0)  # brief intro
    while active and not dead:
        face_player()
        await execute_attack()
        if not (active and not dead):
            break
        await timer(time_between_attacks)

## Run one attack pattern. Overridden per dragon; awaits internally.
func execute_attack() -> void:
    await timer(0.5)

func _physics_process(delta: float) -> void:
    if _flash > 0.0:
        _flash -= delta
        _vis.color = Elements.color_of(element).lerp(Color.WHITE, clampf(_flash * 5.0, 0.0, 1.0))

    velocity.y += gravity * delta
    move_and_slide()

    # Y-down: don't let the hovering dragon sink past its resting line.
    if global_position.y >= floor_y and velocity.y > 0.0:
        global_position.y = floor_y
        velocity.y = 0.0

    if active and not dead:
        for body in _contact_area.get_overlapping_bodies():
            if body.is_in_group("player") and body.has_method("take_damage"):
                body.take_damage(contact_damage, element, global_position)

# --- Helpers for subclasses --------------------------------------------------

## Awaitable timer: `await timer(0.4)`.
func timer(seconds: float) -> Signal:
    return get_tree().create_timer(seconds).timeout

func face_player() -> void:
    if target == null or _vis == null:
        return
    _vis.scale.x = 1.0 if target.global_position.x >= global_position.x else -1.0

func dir_to_player() -> int:
    if target == null:
        return 1
    return 1 if target.global_position.x >= global_position.x else -1

func shoot(direction: Vector2, dmg: float, speed: float, grav := 0.0) -> Projectile:
    return Projectile.spawn(get_parent(), global_position, direction,
        Projectile.FACTION_ENEMY, element, dmg, speed, grav)

# --- Damage / death ----------------------------------------------------------

func take_damage(amount: float, source_element: int, _source_pos: Vector2) -> void:
    if dead or not active:
        return
    var mult := Elements.damage_multiplier(source_element, element)
    health = max(0.0, health - amount * mult)
    _flash = 0.18
    if boss_bar:
        boss_bar.update_bar(health, max_health)
    if health <= 0.0:
        _die()

func _die() -> void:
    dead = true
    active = false
    if boss_bar:
        boss_bar.hide_bar()
    _death_sequence()

func _death_sequence() -> void:
    var tw := create_tween()
    tw.tween_property(_vis, "scale", Vector2.ZERO, 1.0)
    await tw.finished
    # Record the kill only once the death animation completes, so a simultaneous
    # player death (which reloads the stage and frees this node) leaves the dragon
    # correctly NOT defeated.
    GameManager.on_dragon_defeated(element)
    GameManager.return_to_hub()
