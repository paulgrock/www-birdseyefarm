extends Control

## Title / Victory / Game Over screens. `kind` is set per-scene in the .tscn.
## Any key advances.

enum Kind { TITLE, VICTORY, GAME_OVER }

@export var kind: int = Kind.TITLE

func _ready() -> void:
    set_anchors_preset(Control.PRESET_FULL_RECT)

    var bg := ColorRect.new()
    bg.set_anchors_preset(Control.PRESET_FULL_RECT)
    bg.color = _bg_color()
    bg.mouse_filter = Control.MOUSE_FILTER_IGNORE
    add_child(bg)

    var box := VBoxContainer.new()
    box.set_anchors_preset(Control.PRESET_FULL_RECT)
    box.alignment = BoxContainer.ALIGNMENT_CENTER
    box.add_theme_constant_override("separation", 24)
    add_child(box)

    _add_label(box, _title_text(), 72, Color.WHITE)
    _add_label(box, _subtitle_text(), 28, Color(0.85, 0.85, 0.9))
    _add_label(box, _prompt_text(), 22, Color(0.7, 0.7, 0.75))

func _input(event: InputEvent) -> void:
    if event is InputEventKey and event.pressed and not event.echo:
        _advance()

func _advance() -> void:
    GameManager.reset_run()
    if kind == Kind.TITLE:
        GameManager.goto(GameManager.SCENE_STAGE_SELECT)
    else:
        GameManager.goto(GameManager.SCENE_TITLE)

func _add_label(parent: Node, text: String, font_size: int, color: Color) -> void:
    var l := Label.new()
    l.text = text
    l.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    l.add_theme_font_size_override("font_size", font_size)
    l.add_theme_color_override("font_color", color)
    parent.add_child(l)

func _title_text() -> String:
    match kind:
        Kind.VICTORY: return "VICTORY!"
        Kind.GAME_OVER: return "GAME OVER"
        _: return "DRAGON HUNTER"

func _subtitle_text() -> String:
    match kind:
        Kind.VICTORY: return "All four dragons have fallen"
        Kind.GAME_OVER: return "The dragons prevail..."
        _: return "Slay the four elemental dragons"

func _prompt_text() -> String:
    match kind:
        Kind.TITLE: return "Press any key to begin"
        _: return "Press any key to return to the title"

func _bg_color() -> Color:
    match kind:
        Kind.VICTORY: return Color(0.10, 0.10, 0.05)
        Kind.GAME_OVER: return Color(0.12, 0.04, 0.04)
        _: return Color(0.08, 0.05, 0.12)
