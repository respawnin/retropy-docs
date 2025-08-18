---
layout: default
title: Rect
---
# ▫️ RetroPy `Rect` Module Documentation (MicroPython)

The `Rect` module defines a rectangle class used for spatial reasoning, collision detection, and GUI layout in RetroPy.

---

## 📦 Class: `Rect`

### 🔧 Constructor

```python
Rect(x, y, width, height)
```

Creates a rectangle with floating point coordinates.

---

## 🧮 Collision Methods

- `collide_point(x, y)`: Check if a point is inside the rectangle.
- `collide_rect(other)`: Check if two rectangles overlap.
- `collide_circle(cx, cy, r)`: Check if a circle overlaps the rect.
- `collide_line(x0, y0, x1, y1)`: Line intersects with rect (fast).
- `collide_line_v2(...)`: Returns clipped line if intersects.

---

## 📐 Geometry & Query

- `contains(other_rect)`: Check if this rect contains another.
- `union(other)`: Returns the union of two rectangles.
- `touching_sides(other)`: Returns bitmask of touching edges.
- `touching_sides_names(other)`: Returns names of touching sides.
- `sides_to_names(mask)`: Convert bitmask to side names.

---

## 🔍 Attributes

| Attribute        | Description                                |
|------------------|--------------------------------------------|
| `x`, `y`         | Top-left corner                            |
| `width`, `height`| Dimensions                                 |
| `size`           | (width, height)                            |
| `center`         | Center point                               |
| `topleft`, `topright`, `bottomleft`, `bottomright` | Corners |
| `midtop`, `midbottom`, `midleft`, `midright` | Edge midpoints  |

---

## 📄 String Representation

```python
print(r)
# Output: Rect(x.xx, y.yy, w.ww, h.hh)
```

---

## 📌 Constants

```python
SIDE_NONE = 0
SIDE_TOP = 1
SIDE_BOTTOM = 2
SIDE_LEFT = 4
SIDE_RIGHT = 8
```

---
