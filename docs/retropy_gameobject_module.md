---
layout: default
title: GameObject
---
# 🧩 RetroPy `GameObject` Module Documentation (MicroPython)

The `GameObject` class is a powerful base class for all interactive entities in RetroPy games. It combines position, velocity, sprite rendering, collider, animations, and coroutine-based behaviors.

---

## 📦 Class: `GameObject`

### 🔧 Constructor

```python
GameObject()
```

Creates a new game object with default position `(0, 0)`, optional sprite, optional collider, and full animation & coroutine support.

---

## 🖼️ Methods

- `draw()`: Renders the GameObject (with shake, flash, blink, and children).
- `update()`: Updates position, animation, and coroutine.
- `add_child(child)`: Adds a GameObject as a child.
- `collides_with(other)`: Returns `True` if both objects have colliders and overlap.
- `play_animation(start, end, delay=10, loop=True, hide_on_end=False)`: Plays frame animation.
- `start_coroutine(generator_fn_or_obj)`: Starts a coroutine.
- `draw_rect(color)`: Draws a rectangle using the collider bounds.
- `draw_direction_arrow(length, color)`: Renders a directional line.
- `move_in_direction(angle_deg, speed)`: Moves based on heading.
- `move_towards(x, y, speed)`: Steps toward a point.
- `distance_to(target)`: Returns float distance to a point or another GameObject.
- `angle_to(target)`: Returns angle in degrees to a point or another GameObject.
- `shake(frames, magnitude)`: Adds shake offset.
- `flash(frames, color_index)`: Temporarily draw with tint.
- `blink(frames, rate)`: Toggles visibility on a timer.

---

## 🔍 Attributes

| Attribute           | Type      | Description                               |
|--------------------|-----------|-------------------------------------------|
| `position`         | tuple     | (x, y) coordinates                         |
| `velocity`         | tuple     | Per-frame velocity (x, y)                  |
| `acceleration`     | tuple     | Per-frame acceleration (x, y)              |
| `sprite`           | Sprite    | Main visual representation (Sprite or MonoSprite) |
| `visible`          | bool      | If `False`, skips draw                     |
| `flip_mode`        | int       | 0=none, 1=H, 2=V, 3=both                   |
| `animation_delay`  | int       | Frame delay between animation frames      |
| `center`, `centerx`, `centery` | float or tuple | Sprite center (world space)       |
| `topleft`, `bottomright`, `midtop`, etc. | tuple | Sprite corner or midpoint       |
| `angle_deg`        | float     | Heading direction in degrees              |
| `collider`         | Rect      | Collision rectangle                       |
| `collider_offset`  | tuple     | Offset from object position               |
| `parent`           | GameObject| Parent GameObject                         |
| `children`         | list      | Child GameObjects                         |
| `on_update`        | callable  | Optional per-frame Python callback        |

---

## 📄 String Representation

```python
print(go)
# Custom repr not implemented, but can show type and state
```

---

## 🌀 Coroutine Behavior

- Use `start_coroutine(fn_or_generator)` to attach a coroutine.
- Yield integers from coroutine to wait N frames.
- Coroutine ends when `StopIteration` is raised.

---

## 📌 Notes

- `get_world_position()` computes hierarchical position including parents.
- Supports recursive drawing and updating of child GameObjects.
- Collider and sprite are optional.
- Combines visual and logical state for clean game architecture.
