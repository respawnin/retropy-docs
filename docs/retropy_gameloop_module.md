---
layout: default
title: GameLoop
---
<pre>
╔══════════════════════════════════════════════════════════════╗
║                   gameloop API Contents                      ║
╚══════════════════════════════════════════════════════════════╝

📦 <a href="#-api-reference-gameloop">gameloop</a>
 ├─ 📖 <a href="#-overview"> Overview</a>
 ├─ 🧱 <a href="#-constructor"> Constructor</a>
 ├─ ▶️ <a href="#-main-control-methods"> Main control methods</a>
 ├─ ⏱️ <a href="#-fps-control"> FPS control</a>
 ├─ 🔁 <a href="#-lifecycle-callbacks"> Lifecycle callbacks</a>
 ├─ 🗓️ <a href="#-scheduled-callbacks"> Scheduled callbacks</a>
 ├─ 🧹 <a href="#-garbage-collection-helpers"> Garbage collection helpers</a>
 ├─ 🔄 <a href="#-frame-order"> Frame order</a>
 ├─ 🪜 <a href="#-nested-loops"> Nested loops</a>
 ├─ 📝 <a href="#notes"> Notes</a>
 └─ ▶️ <a href="#example"> Example</a>
</pre>

---
<br/>
# 📦 API Reference: `gameloop`

`gameloop` is the core run loop class for retroPy.

It handles:

- input polling
- delta time updates
- timer updates
- calling your `Update()` and optional `Draw()` functions
- presenting the framebuffer
- optional FPS limiting
- lifecycle callbacks
- one-shot and repeating scheduled callbacks

---
<br/>

## 📖 Overview

`gameloop` is the standard way to run a retroPy game.

It centralizes:

- per-frame input polling
- gameplay timing state
- scheduled callbacks
- draw presentation

## 🧱 Constructor

### `gameloop(update, draw=None, on_start=None, on_run=None, on_exit=None)`

Creates a new game loop object.

- `update` must be callable
- `draw` may be callable or `None`
- `on_start`, `on_run`, and `on_exit` may be callable or `None`

```python
loop = gameloop(Update, Draw)
```

The constructor validates that the provided callbacks are callable.

## ▶️ Main control methods

### `run()`

Starts the loop.

On native builds, this blocks until the loop exits. On WASM builds, the browser drives frames using the platform main loop.

```python
loop.run()
```

### `exit()`

Requests loop termination.

```python
loop.exit()
```

### `restart()`

Requests the loop to restart.

```python
loop.restart()
```

### `pause()`

Pauses gameplay progression for this loop.

When paused:

- `update()` is not called
- `timer(...)` objects owned by this loop are not advanced
- callbacks scheduled by `run_after()` and `every_ms()` are not advanced
- `dt()` and `dt_ms()` return `0`
- `gTime()` does not advance
- `draw()` can still run if it was provided
- `on_paused()` can run if it was set

```python
loop.pause()
```

### `resume()`

Resumes a paused loop.

```python
loop.resume()
```

## ⏱️ FPS control

### `set_target_fps(fps)`

Sets the target frame rate.

- `fps > 0` enables frame limiting
- `fps <= 0` disables the cap

```python
loop.set_target_fps(30)
```

## 🔁 Lifecycle callbacks

### `set_on_start(callback)`

Called once when the loop starts.

### `set_on_run(callback)`

Called every frame before input, timers, update, and draw.

### `set_on_exit(callback)`

Called once when the loop exits.

```python
def on_start():
    print("start")

def on_exit():
    print("exit")

loop.set_on_start(on_start)
loop.set_on_exit(on_exit)
```

You can also pass these callbacks directly to the constructor.

## 🗓️ Scheduled callbacks

The game loop includes a small built-in scheduler for millisecond-based callbacks.

### `run_after(delay_ms, callback)`

Schedules a one-shot callback.

```python
def later():
    print("hello later")

loop.run_after(500, later)
```

### `every_ms(interval_ms, callback)`

Schedules a repeating callback.

```python
def blink():
    print("tick")

loop.every_ms(250, blink)
```

These callbacks use the same underlying timer backend as `timer(...)`.

Pause behavior:
- scheduled callbacks freeze while the loop is paused

### Scheduler capacity

The internal scheduler has a fixed number of slots. If too many scheduled callbacks are added, the loop raises an error.

## 🧹 Garbage collection helpers

### `set_gc_frames(n)`

Runs `gc.collect()` every `n` frames.

- `n <= 0` disables the automatic collection schedule

### `set_gc_budget(ms)`

Sets a minimum spare time budget before the automatic GC is allowed to run.

### `gc_now()`

Runs `gc.collect()` immediately.

```python
loop.set_gc_frames(30)
loop.set_gc_budget(2)
```

## 🔄 Frame order

Each active frame follows this general order:

1. call `on_run` if set
2. poll input
3. measure wall-clock frame time
4. if not paused, update gameplay time and loop-owned scheduled work, then call `update()`
5. if paused, keep gameplay time frozen and call `on_paused()` if it was set
6. call `draw()` if provided
7. handle pending runtime work
8. present the framebuffer
9. optionally perform GC and FPS delay

This explains why `kb.*_down()` works naturally inside `Update()`, and why `timer` objects advance automatically while the loop is running.

## 🪜 Nested loops

The implementation maintains a small loop stack, allowing nested loops up to a fixed depth. This is useful for modal subloops such as menus or dialogs, but it is still best to keep nesting intentional and limited.

## Notes

- The default target FPS is initialized to `33`.
- On WASM builds, display presentation is routed through the browser-facing framebuffer present path instead of the normal hardware show path.
- `pause()` pauses timer advancement as well as `update()` calls.

## Example

```python
from retroPy import *

blink_on = True

def toggle():
    global blink_on
    blink_on = not blink_on

def Update():
    if kb.A_down():
        loop.exit()

def Draw():
    draw.fill(0)
    if blink_on:
        draw.text("Blink", 20, 20, 15)

loop = gameloop(Update, Draw)
loop.set_target_fps(30)
loop.every_ms(300, toggle)
loop.run()
```
