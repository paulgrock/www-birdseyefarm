class_name BossArena
extends Area2D

## Trigger at the end of the platforming run. When the player enters it wakes the
## dragon and raises a seal wall behind them. Set `boss`, `seal_wall`, and `size`
## before adding to the tree.

var boss: DragonBoss
var seal_wall: StaticBody2D
var size := Vector2(40, 600)

var _triggered := false

func _ready() -> void:
    collision_layer = 0
    collision_mask = Build.L_PLAYER
    var col := CollisionShape2D.new()
    var shape := RectangleShape2D.new()
    shape.size = size
    col.shape = shape
    add_child(col)
    body_entered.connect(_on_body_entered)
    if seal_wall:
        _set_seal(false)

func _on_body_entered(body: Node2D) -> void:
    if _triggered or not body.is_in_group("player"):
        return
    _triggered = true
    if seal_wall:
        _set_seal(true)
    if boss:
        boss.activate(body)

func _set_seal(active: bool) -> void:
    seal_wall.visible = active
    for c in seal_wall.get_children():
        if c is CollisionShape2D:
            # Deferred: this can run from a physics callback (body_entered), where
            # changing collision state directly would error during query flush.
            c.set_deferred("disabled", not active)
