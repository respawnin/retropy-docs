---
layout: default
title: Sprite
---
# 🎨 RetroPy `Sprite` Module Documentation (MicroPython)

The `Sprite` module defines a sprite object used to represent animated 2D graphics in RetroPy. Sprites are loaded from `.rs8` files, which support multiple frames and are rendered using a palette-indexed framebuffer.

---

## 📦 Class: `Sprite`

### 🔧 Constructor

```python
Sprite(source)
```

- **source**: Can be a filename (`.rs8`), bytes, bytearray, or file-like object.
- Loads sprite data and constructs an object with width, height, number of frames, and pixel data.

---

## 🖼️ Frame Rendering

### `sprite.draw(frame_index, x, y, flip_mode)`
Draws the specified frame at the given position.

- `frame_index`: Frame number (0-based)
- `x, y`: World coordinates (float)
- `flip_mode`: 0 (none), 1 (horiz), 2 (vert), 3 (both)

### `sprite.draw_rect(color)`
Draws a rectangular outline around the sprite using a palette color.

---

## 🔍 Attributes

| Attribute       | Type    | Description                               |
|----------------|---------|-------------------------------------------|
| `x`, `y`       | float   | Position of sprite                        |
| `position`     | tuple   | Tuple of (x, y)                           |
| `frame`        | int     | Current frame index                       |
| `visible`      | bool    | Visibility flag                           |
| `flip_mode`    | int     | 0=none, 1=horiz, 2=vert, 3=both           |
| `num_frames`   | int     | Total number of animation frames          |
| `width`        | int     | Width of each frame                       |
| `height`       | int     | Height of each frame                      |

---

## 📄 String Representation

```python
print(sprite)
# Output: sprite(width, height, frames)
```

---

## 📂 RS8 File Format (Custom)

- Byte 0: Magic ('R')
- Bytes 1–2: Width (uint16)
- Bytes 3–4: Height (uint16)
- Byte 5: Number of frames
- Bytes 16+: Raw frame data (width × height × frames)

---

## 📌 Notes

- The `draw()` method respects world-to-screen conversion and skips transparent pixels.
- A `bounds` `Rect` is automatically created for collision detection or UI placement.
- `visible` is a toggle for whether rendering occurs—used by higher-level systems.

