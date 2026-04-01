---
layout: default
title: Sprite
---
<pre>
╔══════════════════════════════════════════════════════════════╗
║                    sprite API Contents                       ║
╚══════════════════════════════════════════════════════════════╝

📦 <a href="#-api-reference-sprite">sprite</a>
 ├─ 📥 <a href="#-import"> Import</a>
 ├─ 📖 <a href="#-overview"> Overview</a>
 ├─ 🧱 <a href="#-creating-a-sprite"> Creating a sprite</a>
 │   ├─ 📂 <a href="#from-a-file-path"> From a file path</a>
 │   ├─ 🧬 <a href="#from-a-bytes-like-object"> From bytes</a>
 │   └─ 📄 <a href="#from-a-file-like-object"> From file-like</a>
 ├─ 📌 <a href="#-format-notes"> Format notes</a>
 ├─ 📊 <a href="#-read-only-properties"> Read-only properties</a>
 ├─ 🎨 <a href="#-drawing-methods"> Drawing methods</a>
 ├─ 🔍 <a href="#-enlarged-drawing"> Enlarged drawing</a>
 ├─ 🧱 <a href="#-opaque-drawing"> Opaque drawing</a>
 ├─ 🧵 <a href="#-tiling"> Tiling</a>
 ├─ ▶️ <a href="#example"> Example</a>
 └─ 📝 <a href="#notes"> Notes</a>
</pre>

---
<br/>
# 📦 API Reference: `sprite`

The `sprite` class wraps retroPy sprite data and provides frame-based drawing helpers.

It supports:

- standard color sprites
- mono sprites
- loading from file paths
- loading from byte buffers
- simple tiling
- enlarged drawing
- raw buffer access

---
<br/>

## 📥 Import

```python
from retroPy import sprite
```

## 📖 Overview

`sprite` is the core image container for retroPy.

Use it when you need:

- frame-based sprite drawing
- tiling patterns or backgrounds
- direct access to loaded sprite bytes
- mono or indexed-color sprite assets

## 🧱 Creating a sprite

### From a file path

```python
s = sprite("player.rs8")
m = sprite("font.rsm")
```

The constructor accepts string paths and reads the file contents internally.

### From a bytes-like object

```python
data = open("player.rs8", "rb").read()
s = sprite(data)
```

### From a file-like object

If the object has a `.read()` method, the constructor reads from it.

## 📌 Format notes

The constructor inspects the first header byte to determine sprite type:

- `0x52` -> standard color sprite
- `0x6D` -> mono sprite

The implementation also contains conversion logic for some alternate or older packed formats when loading from a non-`.rs8` / non-`.rsm` path.

## 📊 Read-only properties

### `sprite.width`

Sprite frame width in pixels.

### `sprite.height`

Sprite frame height in pixels.

### `sprite.num`

Number of frames.

### `sprite.type`

Underlying sprite type code.

### `sprite.get_buffer()`

Returns a bytearray by reference to the underlying sprite buffer.

```python
buf = s.get_buffer()
```

Compatibility alias:
- `sprite.buffer()`

Because this is by reference, editing the returned data affects the sprite directly.

## 🎨 Drawing methods

### `sprite.draw(index, x, y, flip)`

Draws a frame at the given position.

For standard color sprites:

```python
s.draw(0, 40, 40, 0)
```

Flip values in the current implementation:

- `0` -> normal
- `1` -> horizontal flip
- `2` -> vertical flip
- `3` -> both horizontal and vertical flip

For mono sprites, the method also accepts a fifth draw argument for color:

```python
m.draw(0, 10, 10, 0, 15)
```

## 🔍 Enlarged drawing

### `sprite.draw_scaled(index, x, y, mul, space)`

Draws an enlarged version of a color sprite frame.

- `mul` controls pixel block size
- `space` adds empty spacing between blocks

```python
s.draw_scaled(0, 20, 20, 3, 0)
```

Compatibility alias:
- `sprite.draw_E(...)`

### Status

The current implementation only supports enlarged drawing for standard color sprites.

## 🧱 Opaque drawing

### `sprite.draw_opaque(index, x, y)`

Draws a frame without transparency.

```python
s.draw_opaque(0, 0, 0)
```

Unlike normal sprite drawing, zero-valued pixels are copied too.

## 🧵 Tiling

### `sprite.tile(index, x, y, w, h, ox=0, oy=0)`

Repeats a sprite frame across a rectangular region.

```python
s.tile(0, 0, 0, 240, 240)
s.tile(0, 0, 0, 240, 240, 8, 4)
```

Arguments:

- `index` -> frame index
- `x`, `y` -> destination position
- `w`, `h` -> fill size
- `ox`, `oy` -> optional tile offsets

The implementation wraps the tile offsets into the frame size, so negative and oversized offsets are normalized.

Color and mono sprites are both handled in the current version.

## Example

```python
from retroPy import *

s = sprite("bubble.rs8")

draw.clear(0)
s.draw(0, 20, 20, 0)
s.draw(1, 40, 20, 0)
s.draw(2, 70, 20, 1)
s.tile(0, 0, 100, 120, 20)
disp.show()
```

## Notes

- Positions are camera-relative because the implementation calls `world_to_screen(...)`.
- The constructor performs low-level header parsing directly from the sprite buffer.
- For most game code, `sprite(...).draw(...)` is the preferred high-level API over the lower-level `draw.sprite(...)` buffer helper.
