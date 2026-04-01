---
layout: default
title: Timer
---
<pre>
╔══════════════════════════════════════════════════════════════╗
║                     timer API Contents                       ║
╚══════════════════════════════════════════════════════════════╝

📦 <a href="#-api-reference-timer">timer</a>
 ├─ 📖 <a href="#-overview"> Overview</a>
 ├─ 🧱 <a href="#-constructor"> Constructor</a>
 ├─ ⚙️ <a href="#-methods"> Methods</a>
 ├─ 📊 <a href="#-properties"> Properties</a>
 ├─ 🔁 <a href="#-repeating-behavior"> Repeating behavior</a>
 ├─ 🧠 <a href="#-manager-behavior"> Manager behavior</a>
 ├─ ▶️ <a href="#example-one-shot-timer"> One-shot example</a>
 └─ 🔄 <a href="#example-repeating-timer"> Repeating example</a>
</pre>

---
<br/>
# 📦 API Reference: `timer`

`timer` is a standalone callback timer class for retroPy.

A timer tracks a duration in seconds, counts down while active, and calls a Python callback when it reaches zero.

---
<br/>

## 📖 Overview

`timer` objects use the same internal scheduling backend as `gameloop.run_after()` and `gameloop.every_ms()`.

A timer advances while its owning game loop is running.
When that loop is paused, the timer also freezes.
This means `timer(...)`, `run_after(...)`, and `every_ms(...)` all follow the same pause/resume timing rules.

## 🧱 Constructor

### `timer(duration, callback, repeat=False, auto_start=False)`

Creates a timer.

- `duration` is in seconds
- `callback` is called when the timer expires
- `repeat=True` makes it loop
- `auto_start=True` starts it immediately

```python
def hello():
    print("done")

t = timer(1.5, hello, auto_start=True)
```

## ⚙️ Methods

### `start()`

Starts the timer and resets the remaining time to the full duration.

```python
t.start()
```

### `stop()`

Stops the timer, marks it done, and resets remaining time to the full duration.

```python
t.stop()
```

### `pause()`

Pauses the timer.

```python
t.pause()
```

Timers do not advance during a paused game loop.
They continue from their remaining time after the loop resumes.

### `resume()`

Resumes the timer if it is active and not done.

```python
t.resume()
```

Timers do not advance during a paused game loop.
They continue from their remaining time after the loop resumes.

### `restart()`

Restarts the timer from the full duration and marks it active.

```python
t.restart()
```

### `reset()`

Resets remaining time to the full duration and clears the done flag, without fully restarting all state.

```python
t.reset()
```

### `trigger()`

Immediately runs the callback.

After triggering:

- repeating timers are re-armed
- one-shot timers become done and inactive

```python
t.trigger()
```

### `is_active()`

Returns `True` if the timer is active.

### `is_paused()`

Returns `True` if the timer is paused.

### `is_done()`

Returns `True` if the timer has completed.

### `time_left()`

Returns the remaining time in seconds.

```python
print(t.time_left())
```

## 📊 Properties

The timer type also exposes readable and writable attributes.

### `duration`

Timer duration in seconds.

### `remaining`

Time left in seconds.

### `repeat`

Whether the timer repeats.

### `active`

Whether the timer is active. Read-only in normal practice; prefer methods such as `start()` and `stop()`.

### `paused`

Whether the timer is paused. Read-only in normal practice; prefer `pause()` and `resume()`.

### `done`

Whether the timer is finished. Read-only in normal practice.

### `callback`

The callback function associated with the timer.

```python
t.duration = 2.0
t.repeat = True
```

## 🔁 Repeating behavior

For repeating timers, the implementation preserves time overrun by adding `duration` back until the timer is positive again. This keeps repeating timers closer to real elapsed time when frames are uneven.

## 🧠 Manager behavior

The timer manager also includes internal helpers for:

- add / remove
- pause all / resume all
- clear all
- garbage-collection root tracking

These are internal engine features rather than normal gameplay APIs.

## Example: one-shot timer

```python
from retroPy import *

message = "wait..."

def done():
    global message
    message = "finished"

t = timer(2.0, done, auto_start=True)

def Update():
    if kb.A_down():
        loop.exit()

def Draw():
    draw.fill(0)
    draw.text(message, 20, 20, 15)

loop = gameloop(Update, Draw)
loop.run()
```

## Example: repeating timer

```python
from retroPy import *

visible = True

def toggle():
    global visible
    visible = not visible

blink = timer(0.3, toggle, repeat=True, auto_start=True)

def Update():
    if kb.A_down():
        loop.exit()

def Draw():
    draw.fill(0)
    if visible:
        draw.text("blink", 20, 20, 15)

loop = gameloop(Update, Draw)
loop.run()
```
