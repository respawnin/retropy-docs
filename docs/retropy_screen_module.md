---
layout: default
title: Screen
---
<pre>
╔══════════════════════════════════════════════════════════════╗
║                     disp API Contents                        ║
╚══════════════════════════════════════════════════════════════╝

📦 <a href="#-api-reference-disp">disp</a>
 ├─ 📥 <a href="#-import"> Import</a>
 ├─ 📖 <a href="#-overview"> Overview</a>
 ├─ 📺 <a href="#-screen-constants"> Screen constants</a>
 ├─ 🧷 <a href="#-board-constants"> Board constants</a>
 ├─ ⚙️ <a href="#-dispinit"> disp.init(...)</a>
 ├─ 📏 <a href="#-logical-framebuffer-sizes"> Logical framebuffer sizes</a>
 ├─ 🧱 <a href="#-board-presets"> Board presets</a>
 ├─ 🖼️ <a href="#-showing-the-framebuffer"> Showing the framebuffer</a>
 ├─ 🎨 <a href="#-filling-the-screen"> Filling the screen</a>
 ├─ 🌈 <a href="#-palette-helpers"> Palette helpers</a>
 ├─ 🎥 <a href="#-camera-helpers"> Camera helpers</a>
 ├─ 📊 <a href="#-screen-info"> Screen info</a>
 ├─ 🧵 <a href="#-buffer-access"> Buffer access</a>
 ├─ 📋 <a href="#-buffer-copy-helpers"> Buffer copy helpers</a>
 └─ 🔄 <a href="#-orientation"> Orientation</a>
</pre>

---
<br/>
# 📦 API Reference: `disp`

The `disp` module manages display initialization, the global framebuffer, palette state, camera state, and screen presentation.

---
<br/>

## 📥 Import

```python
from retroPy import disp
```

## 📖 Overview

The current implementation uses global display state, including:

- a global 8-bit framebuffer
- global logical width and height
- a global palette lookup table
- global camera position and mode

This makes `disp` the foundation of screen setup and presentation.

## 📺 Screen constants

The module exposes these screen type constants:

- `disp.TYPE_ST7735`
- `disp.TYPE_ST7789_240`
- `disp.TYPE_ST7789_320`

Aliases are also provided:

- `disp.TYPE_160`
- `disp.TYPE_240`
- `disp.TYPE_320`

## 🧷 Board constants

The module exposes these board constants:

- `disp.BD_WPCB`
- `disp.BD_WPCBW`
- `disp.BD_BPCB`
- `disp.BD_CRE`

These select preset LCD and button layouts.

## ⚙️ `disp.init(...)`

Initializes display state, allocates the framebuffer, resets the palette, initializes the lower-level RGB driver, and applies screen and board settings.

### Signature

```python
disp.init(
    spi,
    reset=0,
    dc=0,
    cs=0,
    backlight=0,
    rotation=0,
    board=0,
    screen=0,
    ff=180,
)
```

### Arguments

#### `spi`

The SPI object used by the display driver on hardware platforms.

#### `reset`, `dc`, `cs`, `backlight`

Manual pin assignments when not using a board preset.

#### `rotation`

Initial rotation value.

#### `board`

Board preset selector.

#### `screen`

Screen type selector.

#### `ff`

Requested CPU frequency multiplier in MHz for hardware builds.

## Example: typical 240x240 init

```python
from retroPy import *
import machine

disp.init(
    machine.SPI(0, 24_000_000, sck=6, mosi=7, polarity=1, phase=1),
    screen=disp.TYPE_240,
    board=disp.BD_CRE,
)
```

### What `init()` does

In the current implementation, `disp.init()`:

1. stores the screen type
2. applies board defaults or manual pin setup
3. resets global camera state
4. sets logical size and framebuffer size
5. allocates the global framebuffer
6. clears the framebuffer
7. resets the color palette
8. calls the lower-level RGB init routine
9. performs some platform-specific startup work

## 📏 Logical framebuffer sizes

### `disp.TYPE_160`

Uses a logical framebuffer of `160 x 80`.

### `disp.TYPE_240`

Uses a logical framebuffer of `240 x 240`.

### `disp.TYPE_320`

Uses a logical framebuffer of `320 x 240` or `240 x 320`, depending on rotation.

## 🧱 Board presets

### `disp.BD_WPCB`

White console preset.

### `disp.BD_WPCBW`

Another white console preset variant.

### `disp.BD_BPCB`

Black PCB preset.

### `disp.BD_CRE`

Creatures board preset.

## 🖼️ Showing the framebuffer

### `disp.show()`

Flushes the active global framebuffer to the display.

```python
disp.show()
```

### `disp.showBuff(buffer)`

Flushes a supplied buffer instead of the default global framebuffer.

```python
disp.showBuff(buf)
```

## 🎨 Filling the screen

### `disp.fill(color)`

Fills the framebuffer with a palette index.

```python
disp.fill(0)
```

## 🌈 Palette helpers

### `disp.color_ndx(index)`

Returns the RGB565 color currently stored at a palette index.

```python
value = disp.color_ndx(3)
```

### `disp.color_ndx(index, value)`

Sets the RGB565 value for a palette index.

```python
disp.color_ndx(3, 0xFFFF)
```

### `disp.color_palette(buffer)`

Copies a full 256-entry palette into the active palette table.

```python
disp.color_palette(palette_buf)
```

### `disp.color_reset()`

Restores the palette to the built-in default.

```python
disp.color_reset()
```

## 🎥 Camera helpers

### `disp.cam_pos_x()` / `disp.cam_pos_x(value)`

Gets or sets camera X.

### `disp.cam_pos_y()` / `disp.cam_pos_y(value)`

Gets or sets camera Y.

### `disp.cam_mode()` / `disp.cam_mode(value)`

Gets or sets camera mode.

### `disp.cam_pos(x, y)`

Sets both camera coordinates.

```python
disp.cam_mode(1)
disp.cam_pos(12, 20)
```

## 📊 Screen info

### `disp.type()`

Returns the current screen type constant.

### `disp.width()`

Returns the current logical width.

### `disp.height()`

Returns the current logical height.

```python
print(disp.type())
print(disp.width(), disp.height())
```

## 🧵 Buffer access

### `disp.get_buffer()`

Returns a bytearray by reference to the global framebuffer.

```python
buf = disp.get_buffer()
buf[0] = 8
```

Because the return value is by reference, changes to this bytearray affect the active framebuffer directly.

## 📋 Buffer copy helpers

### `disp.copyB2B(dest, src)`

Copies one buffer to another.

### Buffer copy note

The old helpers `disp.copy2B`, `disp.copyB`, `disp.copy2BEx`, and `disp.copyBEx` were removed.

Use these instead:

- `disp.get_buffer()` for direct access to the main framebuffer
- `disp.showBuff(buf)` to show a buffer on screen
- `canvas.copy_from_screen(...)`, `canvas.copy_from_canvas(...)`, and `canvas.copy_from_obj(...)` for composition and region copying
- `disp.copyB2B(dest, src)` only when you need a low-level full-buffer memcpy between two buffers

## 🔄 Orientation

### `disp.orientation(value)`

Sets display orientation.

```python
disp.orientation(1)
```
