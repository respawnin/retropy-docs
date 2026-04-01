---
layout: default
title: Canvas
---
<pre>
╔══════════════════════════════════════════════════════════════╗
║                    canvas API Contents                       ║
╚══════════════════════════════════════════════════════════════╝

📦 <a href="#-api-reference-canvas">canvas</a>
 ├─ 📥 <a href="#-import"> Import</a>
 ├─ 📖 <a href="#-overview"> Overview</a>
 ├─ 🧱 <a href="#-creating-a-canvas"> Creating a canvas</a>
 ├─ 🖼️ <a href="#-drawing-the-canvas"> Drawing the canvas</a>
 ├─ 🎯 <a href="#-switching-draw-targets"> Switching draw targets</a>
 ├─ 📋 <a href="#-copy-helpers"> Copy helpers</a>
 ├─ 🧠 <a href="#-buffer-ownership"> Buffer ownership</a>
 ├─ ▶️ <a href="#example"> Example</a>
 ├─ 🪟 <a href="#screen-copy-example"> Screen copy example</a>
 └─ 📝 <a href="#notes"> Notes</a>
</pre>

---
<br/>
# 📦 API Reference: `canvas`

The `canvas` class provides an off-screen 8-bit drawing buffer.

You can:

- create a separate drawing surface
- switch the global draw target to it
- copy regions from the screen, another canvas, or a sprite-like object
- draw the finished canvas back onto the main screen

---
<br/>

## 📥 Import

```python
from retroPy import canvas
```

## 📖 Overview

`canvas` lets you draw into a temporary framebuffer instead of the main display.

This is useful for:

- compositing effects
- pre-rendered UI panels
- temporary layers
- screen-region capture and reuse

## 🧱 Creating a canvas

```python
c = canvas(width=64, height=64)
```

The constructor accepts keyword arguments:

- `width` (required)
- `height` (required)
- `buffer` (optional)

If `buffer` is omitted, the canvas allocates its own internal storage.

If `buffer` is provided, the canvas uses that external writable buffer instead.

## 🖼️ Drawing the canvas

### `canvas.draw(x, y)`

Draws the canvas onto the current framebuffer using transparent-zero blitting.

```python
c.draw(20, 20)
```

### `canvas.draw_opaque(x, y)`

Draws the canvas without transparency.

```python
c.draw_opaque(20, 20)
```

## 🎯 Switching draw targets

### `canvas.on()`

Makes this canvas the active draw target.

After calling `on()`, `draw.*` functions render into the canvas buffer instead of the main display buffer.

```python
c.on()
draw.clear(0)
draw.filled_circle(32, 32, 10, 12)
c.off()
```

### `canvas.off()`

Restores the main display framebuffer as the active draw target.

## 📋 Copy helpers

### `canvas.copy_from_screen(x, y, transparent_zero=False)`

Copies a region from the main screen framebuffer into the canvas.

The copied region has the same size as the canvas itself.

```python
c.copy_from_screen(40, 20)
```

Compatibility alias:
- `canvas.copy_from_buffer(...)`

### `canvas.copy_from_canvas(other, x, y, transparent_zero=False)`

Copies a region from another canvas into this canvas.

```python
c2.copy_from_canvas(c1, 0, 0)
```

### `canvas.copy_from_obj(obj, frame_index, x, y, transparent_zero=False)`

Copies a region from a sprite-like object into the canvas.

The current implementation supports at least:

- `sprite`
- `gameObj`

```python
c.copy_from_obj(s, 0, 0, 0)
```

## 🧠 Buffer ownership

If you pass `buffer=...`, the canvas uses that external writable buffer.

If you do not pass a buffer, the canvas allocates its own rooted internal bytearray.

This means the canvas can safely keep its storage alive even while it temporarily becomes the active draw target.

## Example

```python
from retroPy import *

c = canvas(width=64, height=64)

c.on()
draw.clear(0)
draw.filled_rect(8, 8, 20, 20, 9)
draw.circle(32, 32, 12, 15)
c.off()

draw.clear(0)
c.draw(30, 20)
disp.show()
```

## Screen copy example

```python
from retroPy import *

c = canvas(width=32, height=32)

draw.clear(0)
draw.filled_rect(10, 10, 40, 20, 8)

c.copy_from_screen(8, 8)

draw.clear(0)
c.draw(60, 20)
disp.show()
```

## Notes

- A canvas uses the same 8-bit indexed color model as the main framebuffer.
- `canvas.on()` changes global draw state, so remember to call `canvas.off()` when finished.
- Only one active canvas draw target is supported at a time.
- Calling `canvas.on()` while another canvas is active raises an error instead of nesting targets.
- The current implementation sets the logical width, height, stride, and framebuffer pointer globally while a canvas is active.
