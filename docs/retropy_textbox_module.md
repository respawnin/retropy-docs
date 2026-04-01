---
layout: default
title: Textbox
---
<pre>
╔══════════════════════════════════════════════════════════════╗
║                   textbox API Contents                       ║
╚══════════════════════════════════════════════════════════════╝

📦 <a href="#-api-reference-textbox">textbox</a>
 ├─ 📥 <a href="#-import"> Import</a>
 ├─ 📖 <a href="#-overview"> Overview</a>
 ├─ 🧱 <a href="#-creating-a-textbox"> Creating a textbox</a>
 ├─ 📊 <a href="#-basic-properties"> Basic properties</a>
 ├─ 🎨 <a href="#-colors"> Colors</a>
 ├─ 📐 <a href="#-layout"> Layout</a>
 ├─ ✨ <a href="#-reveal-and-style"> Reveal and style</a>
 ├─ ↔️ <a href="#-slide-in-support"> Slide-in support</a>
 ├─ ⚙️ <a href="#-methods"> Methods</a>
 ├─ ▶️ <a href="#example"> Example</a>
 ├─ 🔤 <a href="#reveal-example"> Reveal example</a>
 └─ 📝 <a href="#notes"> Notes</a>
</pre>

---
<br/>
# 📦 API Reference: `textbox`

The `textbox` class provides a simple UI text box that can draw framed text, auto-size itself, reveal text over time, and slide in from screen edges.

---
<br/>

## 📥 Import

```python
from retroPy import textbox
```

## 📖 Overview

`textbox` is a lightweight built-in UI helper for dialogue, prompts, and framed text overlays.

It supports:

- framed text drawing
- auto-sizing
- timed reveal effects
- simple slide-in motion

## 🧱 Creating a textbox

```python
tb = textbox((20, 20), 120, 40)
```

Constructor arguments:

- `(x, y)` tuple
- `width`
- `height`

The position is stored as floats internally, while width and height are integers.

## 📊 Basic properties

### Content and visibility

- `textbox.text`
- `textbox.visible`
- `textbox.duration`

## 🎨 Colors

- `textbox.border_color`
- `textbox.bg_color`
- `textbox.text_color`

## 📐 Layout

- `textbox.padding`
- `textbox.align`
- `textbox.auto_size`

`align` is a string in the current implementation, with typical values such as:

- `"left"`
- `"center"`
- `"right"`

## ✨ Reveal and style

- `textbox.reveal_mode`
- `textbox.border_style`

Reveal modes in the current file:

- `0` -> reveal by letter
- `1` -> reveal by word

Border styles in the current file:

- `0` -> sharp border
- `1` -> rounded-corner style border

## ↔️ Slide-in support

- `textbox.slide_in`
- `textbox.sliding`
- `textbox.slide_speed`
- `textbox.target_x`
- `textbox.target_y`

The current slide-in mode values are:

- `1` -> from right
- `2` -> from left
- `3` -> from bottom
- `4` -> from top

## ⚙️ Methods

### `textbox.draw()`

Draws the textbox if it is visible.

```python
tb.draw()
```

If `auto_size` is enabled, the box recalculates its width and height from the text before drawing.

### `textbox.update()`

Updates duration countdown and reveal progression.

```python
tb.update()
```

Call this once per frame if you are using timed visibility or reveal effects.

### `textbox.start_reveal(text, delay)`

Begins a reveal effect.

```python
tb.start_reveal("Welcome to retroPy", 2)
```

- `text` is the full source text
- `delay` is the frame delay between reveal steps

Whether the reveal advances by letters or words depends on `textbox.reveal_mode`.

## Example

```python
from retroPy import *

tb = textbox((20, 20), 120, 40)
tb.visible = True
tb.text = "Hello world"
tb.border_color = 15
tb.bg_color = 1
tb.text_color = 15
tb.align = "center"

draw.clear(0)
tb.draw()
disp.show()
```

## Reveal example

```python
from retroPy import *

tb = textbox((10, 10), 140, 40)
tb.reveal_mode = 0
tb.start_reveal("retroPy docs", 2)

def Update():
    tb.update()

def Draw():
    draw.clear(0)
    tb.draw()
```

## Notes

- The class uses the current built-in text renderer and draws each line character by character.
- The current implementation includes a `cancel_button` property, but the cancel-button logic is commented out in `update()`.
- Slide-in behavior is handled during `draw()`, not in a separate animation system.
