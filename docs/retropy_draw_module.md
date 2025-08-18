---
layout: default
title: .Draw
---
# ✏️ RetroPy `Draw` Module Documentation (MicroPython)

The `Draw` module provides an extensive 2D drawing API for RetroPy. It supports drawing primitives (lines, shapes, text), vector transforms, dashed and filled variants, and target switching via `DrawBuffer`.

---

## 📦 Class: `Draw`

### 🔧 Constructor

```python
Draw()
```

Initializes drawing and sets default target to framebuffer.

---

## 🎯 Drawing Primitives

| Method               | Description                             |
|----------------------|-----------------------------------------|
| `pixel(x, y, color)` | Draws a single pixel                    |
| `line(x0, y0, x1, y1, color)` | Draw straight line             |
| `rect(x, y, w, h, color)` | Outline rectangle                |
| `rect_filled(x, y, w, h, color)` | Filled rectangle           |
| `circle(x, y, r, color)` | Outline circle                   |
| `circle_filled(x, y, r, color)` | Filled circle              |
| `ellipse(x, y, rx, ry, color)` | Ellipse                      |
| `ellipse_filled(...)`, `ellipse_dashed(...)` | Variants         |
| `triangle(p1, p2, p3, color)` | Outline triangle              |
| `triangle_filled(...)` | Filled triangle                      |
| `polygon_filled(points, color)` | Filled polygon              |
| `arc(x, y, r, start_angle, end_angle, color)` | Arc            |
| `arc_dashed(...)` | Dashed arc                              |
| `line_dashed(...)` | Dashed line                             |
| `rect_dashed(...)` | Dashed rectangle                        |
| `grid(...)` | Grid of lines                                |
| `grid_dashed(...)` | Dashed grid                             |

---

## 🧠 Vector Operations

| Method         | Description                            |
|----------------|----------------------------------------|
| `translate(points, (dx, dy))` | Shift all points        |
| `scale(points, (sx, sy))`     | Scale all points        |
| `rotate(points, angle_deg)`   | Rotate points           |

---

## 🔡 Text Rendering

- `text(x, y, "Hello", color)`: Draw text using pixel font.
- `text_mono(x, y, "Hello", color)`: Draw using a MonoSprite font.
- `set_font(id)`: Set pixel font by ID:
  - `0`: 5×3W
  - `1`: 5×5
  - `2`: 8×8 (default)
  - `3`: 8×14
- `get_font()`: Returns current font ID.
- `set_mono_font(sprite)`: Set MonoSprite for text_mono().

---

## 🎯 Draw Targets

- `set_target(draw_buffer)`: Set draw target to a `DrawBuffer`.
- `clear_target()`: Reset to framebuffer.

---

## 📦 Class: `DrawBuffer`

### 🔧 Constructor

```python
DrawBuffer(width, height)
```

Creates a buffer you can draw into or copy from.

---

### 🧼 Methods

- `clear(color=0)`: Fill buffer with color.
- `blit(x, y)`: Copy to screen.
- `blit_transparent(x, y, transparent=0)`: Skip color.
- `blit_to(dest, x, y)`: Blit to another buffer.
- `blit_to_transparent(dest, x, y, transparent=0)`

---

## 📌 Notes

- All drawing respects the camera via `world_to_screen()`.
- Coordinate arguments are in world space (floats).
- `DrawBuffer` is useful for HUD layers, overlays, and effects.
