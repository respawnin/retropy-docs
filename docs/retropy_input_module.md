---
layout: default
title: Input
---
<pre>
╔══════════════════════════════════════════════════════════════╗
║                       kb API Contents                        ║
╚══════════════════════════════════════════════════════════════╝

📦 <a href="#-api-reference-kb">kb</a>
 ├─ 📥 <a href="#-import"> Import</a>
 ├─ 📖 <a href="#-overview"> Overview</a>
 ├─ ⚠️ <a href="#-important-state-convention"> Important state convention</a>
 ├─ 🔄 <a href="#-polling-model"> Polling model</a>
 ├─ 🔘 <a href="#-per-button-edge-helpers"> Edge helpers</a>
 ├─ 🎛️ <a href="#-per-button-raw-reads"> Raw reads</a>
 ├─ 🧩 <a href="#-grouped-helpers"> Grouped helpers</a>
 ├─ ⌨️ <a href="#-desktop--browser-key-mapping"> Desktop / browser key mapping</a>
 ├─ 🛠️ <a href="#-initialization-notes"> Initialization notes</a>
 ├─ ▶️ <a href="#example"> Example</a>
 ├─ 🔁 <a href="#manual-polling-example"> Manual polling example</a>
 └─ 📝 <a href="#notes"> Notes</a>
</pre>

---
<br/>
# 📦 API Reference: `kb`

`kb` provides input helpers for retroPy buttons and keyboard-style controls.

The module includes:

- raw current-state reads
- one-shot edge detection helpers
- grouped helpers for movement, AB buttons, and triggers
- a manual polling helper for non-`gameloop` usage

---
<br/>

## 📥 Import

```python
from retroPy import kb
```

## 📖 Overview

Use `kb` for gameplay input checks in desktop, browser, and hardware builds.

Typical public usage is:

- use `*_down()` for one-shot presses
- use `*_up()` for releases
- use `read_*()` only when you need raw held-state reads

## ⚠️ Important state convention

The engine uses a hardware-style button convention:

- `0` means pressed
- `1` means not pressed

This is why the `read_*()` functions return `0` while a key is held.

For friendlier one-shot input handling, use the `*_down()` and `*_up()` helpers instead.

## 🔄 Polling model

The edge-triggered helpers depend on the internal input state being refreshed.

If you are using `gameloop`, this happens automatically every frame, because the game loop calls the input polling function before your `Update()` callback.

If you are not using `gameloop`, call:

```python
kb.poll()
```

before checking edge-based input.

Compatibility alias:
- `kb.readAllBtns()`

## 🔘 Per-button edge helpers

Each button has a pair of edge-triggered functions:

- `left_down()` / `left_up()`
- `right_down()` / `right_up()`
- `up_down()` / `up_up()`
- `down_down()` / `down_up()`
- `A_down()` / `A_up()`
- `B_down()` / `B_up()`
- `Tleft_down()` / `Tleft_up()`
- `Tright_down()` / `Tright_up()`

These return `1` once when the event is detected, then reset.

```python
if kb.A_down():
    print("A was just pressed")

if kb.A_up():
    print("A was just released")
```

## 🎛️ Per-button raw reads

The module also provides raw current-state reads:

- `read_left()`
- `read_right()`
- `read_up()`
- `read_down()`
- `read_A()`
- `read_B()`
- `read_Tleft()`
- `read_Tright()`

Because these are raw reads, they follow the low-is-pressed convention.

```python
if kb.read_left() == 0:
    print("left held")
```

## 🧩 Grouped helpers

### Movement group

- `movement_any_down()`
- `movement_any_up()`
- `movement_any_pressed()`

These combine the directional buttons.

```python
if kb.movement_any_pressed():
    print("some direction is held")
```

### AB group

Preferred names:

- `ab_any_down()`
- `ab_any_up()`
- `ab_any_pressed()`

These combine buttons `A` and `B`.

```python
if kb.ab_any_down():
    print("A or B was just pressed")
```

Compatibility aliases:
- `AB_any_down()`
- `AB_any_up()`
- `AB_any_pressed()`

### Trigger group

- `trigger_any_down()`
- `trigger_any_up()`
- `trigger_any_pressed()`

These combine `Tleft` and `Tright`.

## ⌨️ Desktop / browser key mapping

On Windows and WASM builds, the input layer maps keyboard keys to the retroPy buttons like this:

- `A` key -> left
- `D` key -> right
- `W` key -> up
- `S` key -> down
- `K` key -> button A
- `L` key -> button B
- `Q` key -> left trigger
- `E` key -> right trigger

This makes it easy to test games on desktop and in browser builds.

## 🛠️ Initialization notes

For normal gameplay code, you usually do not need to initialize `kb` manually when you use a board preset in `disp.init(...)`.

The current implementation also includes lower-level setup helpers for custom pin layouts.

### `kb.init(pins=[...], mode=0)`

Preferred keyword form for custom button pin setup.

```python
kb.init(
    pins=[btn_A, btn_B, btn_left, btn_right, btn_up, btn_down],
    mode=0,
)
```

Compatibility alias:
- `kb.init(kbpins=[...], mode=0)`

The current low-level implementation also includes `kbInit(...)`, which is used internally by board presets and platform setup.

## Example

```python
from retroPy import *

x = 40

def Update():
    global x

    if kb.left_down():
        x -= 8
    if kb.right_down():
        x += 8

    if kb.A_down():
        loop.exit()

def Draw():
    draw.clear(0)
    draw.filled_rect(x, 40, 12, 12, 8)

loop = gameloop(Update, Draw)
loop.run()
```

## Manual polling example

```python
from retroPy import *

while True:
    kb.poll()

    if kb.ab_any_down():
        print("A or B pressed")
        break
```

## Notes

- `gameloop` already handles input polling automatically each frame.
- The `read_*()` functions expose raw hardware-style state.
- The `*_down()` and `*_up()` helpers are usually the best public gameplay API.
- The lower-level `kbInit(...)` helper is mainly part of engine setup rather than normal gameplay code.
