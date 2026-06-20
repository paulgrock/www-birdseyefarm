extends Control

## Mega Man X-style boss-select hub. Left/right to choose, jump/fire to enter.
## Defeated dragons are dimmed, marked, and unselectable.

const ORDER := [Elements.E.FIRE, Elements.E.ICE, Elements.E.WATER, Elements.E.EARTH]
const PORTRAIT := Vector2(150, 150)
const STEP := 210.0

var _index := 0
var _selector: ColorRect
var _slots: Array = []  # [{x, defeated_label}]

func _ready() -> void:
    set_anchors_preset(Control.PRESET_FULL_RECT)

    var bg := ColorRect.new()
    bg.set_anchors_preset(Control.PRESET_FULL_RECT)
    bg.color = Color(0.06, 0.07, 0.12)
    bg.mouse_filter = Control.MOUSE_FILTER_IGNORE
    add_child(bg)

    _add_centered_label("CHOOSE YOUR DRAGON", 48, 90, Color.WHITE)
    _add_centered_label("A / D  or  < / >  to choose      SPACE / J  to enter",
        22, 470, Color(0.7, 0.7, 0.75))

    var total := ORDER.size() * PORTRAIT.x + (ORDER.size() - 1) * (STEP - PORTRAIT.x)
    var start_x := (1152.0 - total) * 0.5
    var top := 230.0

    # Selection frame (drawn behind the portraits).
    _selector = ColorRect.new()
    _selector.size = PORTRAIT + Vector2(14, 14)
    _selector.color = Color.WHITE
    _selector.mouse_filter = Control.MOUSE_FILTER_IGNORE
    add_child(_selector)

    for i in ORDER.size():
        var e: int = ORDER[i]
        var x := start_x + i * STEP
        var defeated := GameManager.is_defeated(e)

        var portrait := ColorRect.new()
        portrait.position = Vector2(x, top)
        portrait.size = PORTRAIT
        portrait.color = Elements.color_of(e)
        if defeated:
            portrait.color = portrait.color.darkened(0.6)
        portrait.mouse_filter = Control.MOUSE_FILTER_IGNORE
        add_child(portrait)

        var name_label := Label.new()
        name_label.text = Elements.display_name(e)
        name_label.position = Vector2(x, top + PORTRAIT.y + 8)
        name_label.size = Vector2(PORTRAIT.x, 30)
        name_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
        name_label.add_theme_font_size_override("font_size", 24)
        add_child(name_label)

        var defeated_label := Label.new()
        defeated_label.text = "DEFEATED"
        defeated_label.position = Vector2(x, top + PORTRAIT.y * 0.5 - 12)
        defeated_label.size = Vector2(PORTRAIT.x, 24)
        defeated_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
        defeated_label.add_theme_font_size_override("font_size", 20)
        defeated_label.visible = defeated
        add_child(defeated_label)

        _slots.append({"x": x, "top": top})

    _clamp_to_available()
    _update_selector()

func _process(_delta: float) -> void:
    if Input.is_action_just_pressed("move_left"):
        _move(-1)
    if Input.is_action_just_pressed("move_right"):
        _move(1)
    if Input.is_action_just_pressed("jump") or Input.is_action_just_pressed("fire"):
        _confirm()

func _move(dir: int) -> void:
    for _i in ORDER.size():
        _index = (_index + dir + ORDER.size()) % ORDER.size()
        if not GameManager.is_defeated(ORDER[_index]):
            break
    _update_selector()

func _confirm() -> void:
    var e: int = ORDER[_index]
    if GameManager.is_defeated(e):
        return
    GameManager.enter_stage(e)

func _clamp_to_available() -> void:
    for i in ORDER.size():
        if not GameManager.is_defeated(ORDER[i]):
            _index = i
            return

func _update_selector() -> void:
    var slot = _slots[_index]
    _selector.position = Vector2(slot["x"] - 7.0, slot["top"] - 7.0)

func _add_centered_label(text: String, font_size: int, y: float, color: Color) -> void:
    var l := Label.new()
    l.text = text
    l.position = Vector2(0, y)
    l.size = Vector2(1152, font_size + 8)
    l.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    l.add_theme_font_size_override("font_size", font_size)
    l.add_theme_color_override("font_color", color)
    l.mouse_filter = Control.MOUSE_FILTER_IGNORE
    add_child(l)
