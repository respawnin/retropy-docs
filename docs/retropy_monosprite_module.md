---
layout: default
title: MonoSprite
---
# 🖋️ RetroPy `MonoSprite` Module Documentation (MicroPython)

The `MonoSprite` module defines a compact 1-bit-per-pixel sprite system optimized for memory efficiency. Used in RetroPy when color is not needed (e.g., fonts, effects), this format is loaded from `.rsm` files.

---

## 📦 Class: `MonoSprite`

### 🔧 Constructor

```python
MonoSprite(source)
```

- **source**: A `.rsm` file path, bytes, or file-like object.
- Loads 1-bit frame data into memory and sets initial parameters.

---

## 🖼️ Frame Rendering

### `sprite.draw(color)`
Renders the current frame at the sprite's position using the specified palette index.

- `color`: Palette index (0–255) to use for all "on" pixels in the frame.

---

## 🔍 Attributes

| Attribute       | Type    | Description                                 |
|----------------|---------|---------------------------------------------|
| `x`, `y`       | float   | Sprite position in world coordinates        |
| `position`     | tuple   | (x, y) tuple for position                   |
| `width`        | int     | Frame width in pixels                       |
| `height`       | int     | Frame height in pixels                      |
| `frame`        | int     | Currently displayed frame                   |
| `num_frames`   | int     | Number of frames in the `.rsm` file         |
| `flip_mode`    | int     | Bitwise: 0=none, 1=horizontal, 2=vertical   |

---

## 📄 String Representation

```python
print(sprite)
# Output: MonoSprite(WxH x frames)
```

---

## 📂 RSM File Format (Custom)

- Byte 0: Magic `'m'`
- Byte 1: Reserved
- Bytes 2–3: Width (little-endian)
- Bytes 4–5: Height (little-endian)
- Byte 6: Frame count
- Bytes 16+: Frame bitmap data (1 bit per pixel, row-aligned)

---

## 📌 Notes

- The pixel data is tightly packed and unpacked at render time.
- Uses `world_to_screen()` to support camera-relative drawing.
- Suitable for fonts, UI elements, and overlay effects where color is uniform.
- The `.draw(color)` method must be called with a palette index.
