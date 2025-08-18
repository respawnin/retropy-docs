---
layout: default
title: Screen
---
# 📺 RetroPy `screen` Module Documentation (MicroPython)

The `screen` module provides low-level access to the ST7789-based screen for RetroPy-powered devices. It manages display initialization, framebuffer rendering, palette configuration, screen orientation, backlight, and optional camera-following logic.

---

## 📦 Class: `Screen`

### 🔧 Constructor

```python
Screen(screen_type, *, reset=20, dc=17, cs=16, backlight=21, spi_id=0, spi_sck=19, spi_tx=18, rotation=0)
```

- **screen_type**: `0` for 240×240, `1` for 320×240 display
- **reset**, **dc**, **cs**: GPIO pins for display control
- **backlight**: GPIO pin for PWM backlight control
- **spi_id**: SPI bus (0 or 1)
- **spi_sck**, **spi_tx**: SPI SCK and MOSI pins
- **rotation**: Orientation (0–3)

Creates and initializes the screen and sets up the backlight, SPI, framebuffer, and camera.

---

## 🖼️ Framebuffer & Rendering

### `screen.clear()`
Fills the hardware screen with black using `st7789_fill_rect()`.

### `screen.fill(color_index)`
Fills the internal framebuffer with a palette index (0–255).

### `screen.render()`
Renders the framebuffer to the screen using DMA (fastest path).

### `screen.render_ex(pref)`
Use alternate rendering methods:
- `1`: slow
- `2`: medium
- `3`: DMA (default)

---

## 📐 Screen Properties

### `screen.width`
Returns the logical screen width based on orientation.

### `screen.height`
Returns the logical screen height based on orientation.

### `screen.type`
Returns `0` for 240×240 or `1` for 320×240.

### `screen.set_orientation(ori)`
Set orientation:
- `0`: 0°
- `1`: 90°
- `2`: 180°
- `3`: 270°

Automatically updates dimensions and ST7789 orientation register.

---

## 🎨 Palette Control

### `screen.get_palette(index)`
Returns the RGB565 color for the palette entry at `index`.

### `screen.set_palette(index, rgb565)`
Sets the RGB565 color value at `index`.

### `screen.set_palette_rgb(index, r, g, b)`
Set palette color using RGB888. Automatically converts to RGB565.

---

## 💡 Backlight

### `screen.set_backlight(brightness)`
Set backlight brightness:
- Float from `0.0` (off) to `1.0` (max)

### `screen.get_backlight()`
Returns the current backlight brightness as float (0.0–1.0).

---

## 🎥 Camera Functions

### `screen.set_camera(cam)`
Sets the active camera (`Camera` object or `None`).

### `screen.get_camera()`
Returns the current camera object or `None`.

### `screen.set_camera_pos(x, y)`
Manually set the camera’s position in world space.

### `screen.use_camera(bool)`
Enable or disable camera usage for rendering.

---

## 💥 Flash Overlay

### `screen.flash(color_index, frames)`
Flashes the screen with a palette color index for a number of frames. Useful for damage or alert effects.

---

## 🎮 Global Framebuffer and Palette

- `framebuffer`: A global `uint8_t[]` array with one byte per pixel, using palette indices.
- `palette[256]`: A global array of 256 RGB565 colors. First 16 match PICO-8.

---

## 📌 Notes

- `camera_tick()` must be called every frame to update camera shake and follow behavior.
- `active_screen` and `active_camera` are global state for use by `Draw` and other subsystems.
- Optimized for 1BPP per pixel and high-speed DMA rendering.
