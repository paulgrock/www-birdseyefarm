class_name Hazard
extends Area2D

## Environmental damage. As a bottomless-pit kill zone (instant_kill = true) it
## calls the player's kill() so a fall is lethal even during invincibility frames.

var instant_kill := false
var damage := 3.0
var size := Vector2(100, 100)

func _ready() -> void:
    collision_layer = 0
    collision_mask = Build.L_PLAYER
    var col := CollisionShape2D.new()
    var shape := RectangleShape2D.new()
    shape.size = size
    col.shape = shape
    add_child(col)
    body_entered.connect(_on_body_entered)

func _on_body_entered(body: Node) -> void:
    if not body.is_in_group("player"):
        return
    if instant_kill and body.has_method("kill"):
        body.kill()
    elif body.has_method("take_damage"):
        body.take_damage(damage, Elements.E.NEUTRAL, global_position)
