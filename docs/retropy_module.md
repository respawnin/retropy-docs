---
layout: default
title: retroPy
---
<pre>
╔══════════════════════════════════════════════════════════════╗
║                    retroPy API Contents                      ║
╚══════════════════════════════════════════════════════════════╝

📦 <a href="#-api-reference-retropy">retroPy</a>
 ├─ 📥 <a href="#-import"> Import</a>
 ├─ 📖 <a href="#-overview"> Overview</a>
 ├─ ⚙️ <a href="#-top-level-functions"> Top-level functions</a>
 ├─ 🧱 <a href="#-top-level-classes"> Top-level classes</a>
 ├─ 🧩 <a href="#-top-level-submodules"> Top-level submodules</a>
 ├─ 🔧 <a href="#-rpy-submodule"> rpy submodule</a>
 ├─ ▶️ <a href="#example"> Example</a>
 └─ 📝 <a href="#documentation-status"> Documentation status</a>
</pre>

---
<br/>
# 📦 API Reference: `retroPy`

`retroPy` is the top-level MicroPython module for the engine.

It exposes:

- timing helpers
- core engine classes
- submodules such as `disp`, `draw`, `kb`, and `rpy`

---
<br/>

## 📥 Import

```python
from retroPy import *
```

Or:

```python
import retroPy
from retroPy import disp, draw, kb, rpy
```

## 📖 Overview

For most projects, `retroPy` is the main entry point.

It gives you:

- global timing helpers such as `dt()` and `gTime()`
- engine classes such as `sprite`, `gameObj`, `map`, and `gameloop`
- screen, drawing, input, and utility submodules

## ⚙️ Top-level functions

### `dt()`

Returns gameplay delta time in seconds for the current frame.

This value is intended for frame-rate-independent movement and gameplay logic.
It is `0` while the active game loop is paused.

```python
x += 40 * dt()
```

### `dt_ms()`

Returns gameplay delta time in milliseconds for the current frame.
It is `0` while the active game loop is paused.

```python
print(dt_ms())
```

### `gTime()`

Returns gameplay time in seconds.
This time advances while the active game loop is running and freezes while it is paused.

```python
print(gTime())
```

## 🧱 Top-level classes

The current `retroPy.c` registration file exposes these classes:

### `v2d`

A vector class. Detailed documentation depends on its own implementation file.

### `gameloop`

The main game loop class.

See: [API: gameloop](retropy_gameloop_module.md)

### `textbox`

A text box UI/helper class.

See: [API: textbox](retropy_textbox_module.md)

### `gameObj`

A sprite-backed game object class with movement, animation, collision, and sprite-streaming helpers.

See: [API: gameObj](retropy_gameobject_module.md)

### `sprite`

A sprite class.

See: [API: sprite](retropy_sprite_module.md)

### `map`

A tilemap class that draws tile layers and can perform simple tile-based movement updates for `gameObj` instances.

See: [API: map](retropy_map_module.md)

### `canvas`

An off-screen drawing buffer class.

See: [API: canvas](retropy_canvas_module.md)

### `timer`

A callback timer class.

See: [API: timer](retropy_timer_module.md)

## 🧩 Top-level submodules

### `disp`

Display and framebuffer control.

See: [API: disp](retropy_screen_module.md)

### `draw`

Drawing functions and rendering helpers.

See: [API: draw](retropy_draw_module.md)

### `kb`

Keyboard / button input helpers.

See: [API: kb](retropy_input_module.md)

### `rpy`

Utility helpers exposed through the `rplib_c` module.

## 🔧 `rpy` submodule

The current `rpy` submodule exposes the following functions:

### `rpy.load_sprite_str(text)`

Builds a sprite-style bytearray from a specially formatted string.

Use this when sprite content is embedded as text instead of read from a file.

```python
data = rpy.load_sprite_str(sprite_text)
```

Compatibility alias:
- `rpy.LoadSpriteStr(...)`

### `rpy.is_win()`

Returns `1` when built for Windows, otherwise `0`.

### `rpy.is_wasm()`

Returns `1` when built for WASM, otherwise `0`.

## Example

```python
from retroPy import *

def Update():
    if kb.A_down():
        loop.exit()

def Draw():
    draw.text("Hello", 20, 20, 15)

loop = gameloop(Update, Draw)
loop.set_target_fps(30)
loop.run()
```

## Documentation status

This page is based on the top-level module registration file. The current docs set now includes `disp`, `draw`, `sprite`, `gameObj`, `map`, `canvas`, `textbox`, `gameloop`, `kb`, and `timer`.
