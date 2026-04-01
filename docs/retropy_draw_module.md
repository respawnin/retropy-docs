---
layout: default
title: .Draw
---
<pre>
╔══════════════════════════════════════════════════════════════╗
║                     draw API Contents                        ║
╚══════════════════════════════════════════════════════════════╝

📦 <a href="#-api-reference-draw">draw</a>
 ├─ 📥 <a href="#-import"> Import</a>
 ├─ 📖 <a href="#-overview"> Overview</a>
 ├─ ⚙️ Core functions
 │   ├─ 🔹 <a href="#drawclearcolor0">draw.clear(color=0)</a>
 │   ├─ 🔹 <a href="#drawpixelx-y-colornone">draw.pixel(x, y, color=None)</a>
 │   └─ 🔹 <a href="#drawpixelch">draw.pixelCh(...)</a>
 │
 ├─ 📏 Lines and rectangles
 │   ├─ 🔸 <a href="#drawlinex1-y1-x2-y2-colornone">draw.line(...)</a>
 │   ├─ 🔸 <a href="#drawhlinex-y-length-colornone">draw.hline(...)</a>
 │   ├─ 🔸 <a href="#drawvlinex-y-length-colornone">draw.vline(...)</a>
 │   ├─ 🔸 <a href="#drawrectx-y-w-h-colornone">draw.rect(...)</a>
 │   └─ 🔸 <a href="#drawfilled_rectx-y-w-h-colornone">draw.filled_rect(...)</a>
 │
 ├─ ⚪ Circles, ellipses, and arcs
 │   ├─ 🔸 <a href="#drawcirclex-y-r-colornone">draw.circle(...)</a>
 │   ├─ 🔸 <a href="#drawfilled_circlex-y-r-colornone">draw.filled_circle(...)</a>
 │   ├─ 🔸 <a href="#drawellipsex-y-rx-ry-color">draw.ellipse(...)</a>
 │   ├─ 🔸 <a href="#drawfilled_ellipsex-y-rx-ry-color">draw.filled_ellipse(...)</a>
 │   └─ 🔸 <a href="#drawarcx-y-r-angle_start-angle_end-color">draw.arc(...)</a>
 │
 ├─ ⛓️ Dashed shapes
 │   ├─ 🔸 <a href="#-dashed-shapes">draw.line_dashed(...)</a>
 │   ├─ 🔸 <a href="#-dashed-shapes">draw.hline_dashed(...)</a>
 │   ├─ 🔸 <a href="#-dashed-shapes">draw.vline_dashed(...)</a>
 │   ├─ 🔸 <a href="#-dashed-shapes">draw.rect_dashed(...)</a>
 │   ├─ 🔸 <a href="#-dashed-shapes">draw.circle_dashed(...)</a>
 │   ├─ 🔸 <a href="#-dashed-shapes">draw.ellipse_dashed(...)</a>
 │   └─ 🔸 <a href="#-dashed-shapes">draw.arc_dashed(...)</a>
 │
 ├─ 🔺 Triangles & polylines
 │   ├─ 🔸 <a href="#drawtrianglep0-p1-p2-color">draw.triangle(...)</a>
 │   ├─ 🔸 <a href="#drawfilled_trianglep0-p1-p2-color">draw.filled_triangle(...)</a>
 │   ├─ 🔸 <a href="#drawpointspoint_list-color">draw.points(...)</a>
 │   └─ 🔸 <a href="#drawpolylinepoint_list-color-closedfalse">draw.polyline(...)</a>
 │
 ├─ 🧩 Grids and curves
 │   ├─ 🔸 <a href="#drawgridx-y-w-h-cell_w-cell_h-color">draw.grid(...)</a>
 │   ├─ 🔸 <a href="#drawgrid_dashedx-y-w-h-cell_w-cell_h-dash-gap-color">draw.grid_dashed(...)</a>
 │   ├─ 🔸 <a href="#drawbezier_quadraticp0-control-p1-color">draw.bezier_quadratic(...)</a>
 │   └─ 🔸 <a href="#drawbezier_quadratic_dashedp0-control-p1-dash_len-gap_len-color">draw.bezier_quadratic_dashed(...)</a>
 │
 ├─ 🔄 Vector transforms
 │   ├─ 🔸 <a href="#drawtranslatepoints-delta">draw.translate(...)</a>
 │   ├─ 🔸 <a href="#drawscalepoints-scale">draw.scale(...)</a>
 │   └─ 🔸 <a href="#drawrotatepoints-angle">draw.rotate(...)</a>
 │
 ├─ 🔤 Fonts and text
 │   ├─ 🔸 <a href="#drawset_fontid">draw.set_font(...)</a>
 │   ├─ 🔸 <a href="#drawget_font">draw.get_font()</a>
 │   ├─ 🔸 <a href="#drawtextstring-x-y-color">draw.text(...)</a>
 │   └─ 🔸 <a href="#drawtext_estring-x-y-color-mul-space">draw.text_E(...)</a>
 │
 ├─ 🛠️ Low-level helpers
 │   ├─ 🔸 <a href="#drawspriteindex-buffer-x-y-flip0">draw.sprite(...)</a>
 │   ├─ 🔸 <a href="#drawdrawspritefilename-x-y">draw.drawSprite(...)</a>
 │   └─ 🔸 <a href="#drawtext_mono">draw.text_mono(...)</a>
 │
 └─ ▶️ <a href="#typical-example"> Typical example</a>
</pre>

---
<br/>
# 📦 API Reference: `draw`

The `draw` module provides immediate-mode drawing on the active 8-bit framebuffer.

In the current codebase it includes:

- screen clearing and pixel writes
- lines, rectangles, circles, ellipses, arcs, triangles
- dashed shape variants
- text rendering and font selection
- polyline / point helpers
- vector point-list transforms
- low-level sprite and mono-text helpers

---
<br/>

## 📥 Import

```python
from retroPy import draw
```

## 📖 Overview

Most `draw` functions render into the current global draw target. By default that target is the main display framebuffer managed by `disp`.

If a `canvas` is turned on, the draw target changes to that canvas buffer until `canvas.off()` is called.

Most high-level drawing functions also apply the current camera transform through the engine's `world_to_screen(...)` helper.


## ⚙️ Core functions

### `draw.clear(color=0)`

Fills the active draw target with a palette index.

```python
draw.clear(0)
draw.clear(8)
```

### `draw.pixel(x, y, color=None)`

Draws a single pixel.

```python
draw.pixel(10, 10, 15)
```

If the color is omitted, the module uses the current internal color value.

### `draw.pixelCh(...)`

A more flexible pixel helper that accepts different argument shapes, including vector-like values.
#### *Status
- Treat `pixelCh` as a legacy or advanced helper. The implementation includes debug print output and several branching cases, so `draw.pixel(...)` is the cleaner public API for normal use.



## 📏 Lines and rectangles

### `draw.line(x1, y1, x2, y2, color=None)`

Draws a line.

```python
draw.line(0, 0, 100, 40, 12)
```

### `draw.hline(x, y, length, color=None)`

Draws a horizontal line.

### `draw.vline(x, y, length, color=None)`

Draws a vertical line.

### `draw.rect(x, y, w, h, color=None)`

Draws an outline rectangle.

```python
draw.rect(20, 20, 40, 20, 15)
```

### `draw.filled_rect(x, y, w, h, color=None)`

Draws a filled rectangle.

```python
draw.filled_rect(20, 20, 40, 20, 8)
```

<br>

## ⚪ Circles, ellipses, and arcs

### `draw.circle(x, y, r, color=None)`

Draws an outline circle.

### `draw.filled_circle(x, y, r, color=None)`

Draws a filled circle.

### `draw.ellipse(x, y, rx, ry, color)`

Draws an outline ellipse.

### `draw.filled_ellipse(x, y, rx, ry, color)`

Draws a filled ellipse.

### `draw.arc(x, y, r, angle_start, angle_end, color)`

Draws an arc.

```python
draw.arc(80, 80, 20, 0.0, 1.57, 15)
```

<br>

## ⛓️ Dashed shapes

The current module also includes dashed variants:

- `draw.line_dashed(x1, y1, x2, y2, dash, gap, color)`
- `draw.hline_dashed(x, y, length, dash, gap, color)`
- `draw.vline_dashed(x, y, length, dash, gap, color)`
- `draw.rect_dashed(x, y, w, h, dash, gap, color)`
- `draw.circle_dashed(x, y, r, dash_deg, gap_deg, color)`
- `draw.ellipse_dashed(x, y, rx, ry, dash_deg, gap_deg, color)`
- `draw.arc_dashed(x, y, r, angle_start, angle_end, dash, gap, color)`

These are useful for editor overlays, guides, construction lines, and UI effects.

<br>

## 🔺Triangles, point lists, and polylines

### `draw.triangle(p0, p1, p2, color)`

Draws an outline triangle from three `(x, y)` points.

```python
draw.triangle((10, 10), (40, 20), (20, 50), 15)
```

### `draw.filled_triangle(p0, p1, p2, color)`

Draws a filled triangle from three `(x, y)` points.

### `draw.points(point_list, color)`

Draws a list of points.

```python
pts = [(10, 10), (12, 14), (16, 20)]
draw.points(pts, 9)
```

### `draw.polyline(point_list, color, closed=False)`

Draws connected line segments through a list of points.

```python
draw.polyline([(10, 10), (40, 20), (20, 50)], 15)
draw.polyline([(10, 10), (40, 20), (20, 50)], 15, True)
```

When `closed=True`, the final point is connected back to the first.

<br>

## 🧩 Grids and curves

### `draw.grid(x, y, w, h, cell_w, cell_h, color)`

Draws a rectangular grid.

### `draw.grid_dashed(x, y, w, h, cell_w, cell_h, dash, gap, color)`

Draws a dashed grid.

### `draw.bezier_quadratic(p0, control, p1, color)`

Draws a quadratic Bézier curve using three `(x, y)` points.

### `draw.bezier_quadratic_dashed(p0, control, p1, dash_len, gap_len, color)`

Draws a dashed quadratic Bézier curve.
<br>

## 🔄 Vector list transforms

These helpers work on lists of `(x, y)` points and return transformed point data.

### `draw.translate(points, delta)`
Translates a list of points.

### `draw.scale(points, scale)`
Scales a list of points.

### `draw.rotate(points, angle)`
Rotates a list of points.

These are useful for lightweight vector graphics workflows.
<br>

## 🔤 Fonts and text

### `draw.set_font(id)`

Selects the current built-in font.

Available font IDs in the current file:

- `0` → 3×5 font
- `1` → 5×5 font
- `2` → 8×8 font
- `3` → larger row-wise font

```python
draw.set_font(2)
```

### `draw.get_font()`

Returns the current font ID.

### `draw.text(string, x, y, color)`

Draws text using the current font.

```python
draw.text("Hello", 10, 20, 15)
```

### `draw.text_E(string, x, y, color, mul, space)`

Draws enlarged text.

- `mul` controls block size
- `space` adds spacing between enlarged pixels

```python
draw.text_E("GO!", 10, 30, 15, 3, 0)
```

<br>


## 🛠️ Low-level helpers

### `draw.sprite(index, buffer, x, y, flip=0)`

Draws a sprite frame from a raw sprite buffer.

This is a low-level helper that reads header information directly from a supplied buffer.

For normal game code, the higher-level `sprite("file.rs8").draw(...)` API is usually easier to use.

### `draw.drawSprite(filename, x, y)`

Loads raw line-based data from a file and plots it.

#### Status
- Treat `draw.drawSprite(...)` as specialized or legacy unless you know you need this exact file format.

### `draw.text_mono(...)`

Draws text using a mono sprite font buffer.


<br>


##  Typical example

```python
from retroPy import *

draw.clear(0)
draw.filled_rect(10, 10, 30, 20, 8)
draw.rect(10, 10, 30, 20, 15)
draw.line(0, 0, 80, 40, 12)
draw.circle(60, 60, 12, 14)
draw.text("retroPy", 8, 90, 15)
disp.show()
```
