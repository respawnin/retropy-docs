---
layout: default
title: GameLoop
---
# 🔄 RetroPy `GameLoop` Module Documentation (MicroPython)

The `GameLoop` class provides a high-performance main loop controller for RetroPy. It manages update/draw timing, coroutine scheduling, and input polling.

---

## 📦 Class: `GameLoop`

### 🔧 Constructor

```python
GameLoop(update_fn=None, draw_fn=None)
```

Initialize with optional update and draw callbacks.

---

## 🔁 Methods

- `start()`: Start the loop
- `pause()`, `resume()`, `stop()`, `restart()`
- `get_frame_time()`: Returns last frame duration (ms)

---

## 🧠 Coroutine System

- `start_coroutine(gen_fn, ...)`: Starts a coroutine, returns ID
- `cancel_coroutine(id)`: Cancels coroutine by ID
- Coroutine yields control with `yield N` (wait N frames)

---

## 🔍 Attributes

| Attribute         | Description                           |
|-------------------|---------------------------------------|
| `update`          | Python callback for logic             |
| `draw`            | Python callback for render            |
| `on_enter`, `on_exit` | Lifecycle events               |
| `fps`             | Target framerate (30 default)         |
| `paused`, `running` | Control state                      |
| `max_dt`          | Clamp for large frame skips           |
| `fixed_timestep`  | Force constant timestep               |

---

## 📌 Notes

- Handles camera, garbage collection, input polling, and screen flashing.
- Use `coroutines_tick()` internally for coroutine scheduling.
- `input_clear_transients()` is called at the end of each frame.
