---
layout: default
title: v2d
---
# 📐 RetroPy `v2d` Module Documentation (MicroPython)

The `v2d` module provides a lightweight 2D vector type used throughout the RetroPy engine. It encapsulates `x` and `y` floating-point coordinates and supports basic attribute access and printing.

---

## 📦 Class: `v2d`

### 🔧 Constructor

```python
v2d(x, y)
```

- **x**: `float` – X-coordinate
- **y**: `float` – Y-coordinate

Creates a new 2D vector with the given coordinates.

---

## 📄 String Representation

### `str(v)`
Returns a string representation in the format:

```
v2d(x.xx, y.yy)
```

Used for debugging and printing vectors.

---

## 🔍 Attributes

- `v.x`: Get or set the x-coordinate (float)
- `v.y`: Get or set the y-coordinate (float)

Example:
```python
p = v2d(3.5, 1.2)
print(p.x)       # 3.5
p.y = 9.0
```

---

## 📌 Notes

- The `v2d` type is registered as a MicroPython module and can be imported using `import v2d`.
- It uses `MP_TYPE_FLAG_HAS_SPECIAL_ACCESSORS` to enable custom attribute access logic.

