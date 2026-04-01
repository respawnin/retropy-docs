---
layout: default
title: GameObject
---
<pre>
╔══════════════════════════════════════════════════════════════╗
║                    gameObj API Contents                      ║
╚══════════════════════════════════════════════════════════════╝

📦 <a href="#-api-reference-gameobj">gameObj</a>
 ├─ 📥 <a href="#-import"> Import</a>
 ├─ 📖 <a href="#-overview"> Overview</a>
 ├─ 🧱 <a href="#-creating-a-game-object"> Creating a game object</a>
 ├─ 📂 <a href="#-accepted-sprite-sources"> Accepted sprite sources</a>
 ├─ ⚙️ <a href="#-core-methods"> Core methods</a>
 ├─ 🎞️ <a href="#-animation-helpers"> Animation helpers</a>
 ├─ 💥 <a href="#-collision-helpers"> Collision helpers</a>
 ├─ 🏃 <a href="#-movement-helpers"> Movement helpers</a>
 ├─ 📏 <a href="#-clamp-helpers"> Clamp helpers</a>
 ├─ 📊 <a href="#-useful-properties"> Useful properties</a>
 ├─ 🧵 <a href="#-sprite-buffer-access"> Sprite buffer access</a>
 ├─ 🚚 <a href="#-sprite-streaming-helpers"> Sprite streaming helpers</a>
 ├─ ▶️ <a href="#example"> Example</a>
 └─ 📝 <a href="#notes"> Notes</a>
</pre>

---
<br/>
# 📦 API Reference: `gameObj`

The `gameObj` class is a sprite-backed object for gameplay code.

It combines:

- sprite-based drawing
- simple animation playback
- position, velocity, and acceleration
- rectangle collision helpers
- clamp helpers
- basic move-towards helpers
- raw sprite buffer access
- TileBus-oriented sprite streaming helpers

---
<br/>

## 📥 Import

```python
from retroPy import gameObj
```

## 📖 Overview

`gameObj` is a lightweight engine object for moving, drawing, and animating sprite-backed entities.

For most projects it is useful for:

- players and enemies
- simple physics-style movement
- sprite animation playback
- rectangle-based collision checks

## 🧱 Creating a game object

The constructor is keyword-driven in the C implementation.

Preferred constructor style:

```python
go = gameObj(
    buffer=sprite("player.rs8"),
    pos_x=40,
    pos_y=20,
    change=0,
    speed_x=0,
    speed_y=0,
    animation_mode=0,
    camera_relative=0,
    frame=0,
    flip=0,
)
```

Compatibility aliases still supported:

- `mode` -> alias of `animation_mode`
- `cam_mode` -> alias of `camera_relative`
- `currNdx` -> alias of `frame`

## 📂 Accepted sprite sources

The constructor can load its sprite source from:

- a file path string
- a bytes / bytearray object
- a `sprite(...)` object
- a file-like object with `.read()`

For most retroPy projects, passing a `sprite(...)` object or file path is the clearest option.

## ⚙️ Core methods

### `gameObj.draw()`

Draws the current frame.

The draw path applies `world_to_screen(...)`, so the object's position is camera-relative when camera mode is enabled.

### `gameObj.update()`

Advances the object's position using its current speed and acceleration.

This is a lightweight built-in motion step. Many games will still wrap it with their own state logic.

### `gameObj.pos(x, y)`

Sets position directly.

```python
go.pos(80, 32)
```

### `gameObj.speed(vx, vy)`

Sets velocity.

```python
go.speed(40, 0)
```

### `gameObj.acc(ax, ay)`

Sets acceleration.

```python
go.acc(0, 120)
```

### `gameObj.limit_speed(max_speed=None)`

Clamps velocity to a maximum.

If a value is passed, that value is used. Otherwise the object's `speed_max` property is used.

## 🎞️ Animation helpers

### `gameObj.frame()`
### `gameObj.frame(index)`
### `gameObj.frame(index, flip)`

Gets or sets the current frame index, with optional flip update.

Compatibility alias:
- `gameObj.currNdx(...)`

### `gameObj.flip()`
### `gameObj.flip(value)`

Gets or sets flip mode.

Current flip values follow the sprite draw path:

- `0` -> normal
- `1` -> horizontal flip
- `2` -> vertical flip
- `3` -> both

### `gameObj.animation_mode()`
### `gameObj.animation_mode(value)`

Gets or sets animation mode.

In the current implementation, `animation_mode > 0` behaves like a one-shot range that stops after the end frame, while `animation_mode == 0` loops back to the start frame.

Compatibility alias:
- `gameObj.mode(...)`

### `gameObj.sprite(source, change_ms)`

Replaces the attached sprite and animation timing.

`source` can be raw sprite bytes or a `sprite(...)` object.

### `gameObj.frame_duration_ms()`
### `gameObj.frame_duration_ms(ms)`

Gets or sets the frame-change duration in milliseconds.

Compatibility alias:
- `gameObj.flipDuration(...)`

### `gameObj.frame_range(start, end)`

Sets the active animation range.

```python
go.frame_range(0, 3)
```

Compatibility alias:
- `gameObj.ndxFromTo(...)`

## 💥 Collision helpers

### `gameObj.dist(other)`
### `gameObj.dist(x, y)`

Returns distance from this object to another object or point.

### `gameObj.collider(other)`

Simple rectangle overlap test using each object's collider box.

Returns `1` for overlap, otherwise `0`.

### `gameObj.collider_xy(other, dx, dy)`

Tests collision after applying an offset to this object's collider.

This is useful for "would I collide if I moved?" checks.

### `gameObj.colliderPt(x, y)`

Returns whether a point falls inside the object's collider box.

### `gameObj.colliderPtEx(x, y)`

Point collision helper that also reports hit side information.

### `gameObj.colliderEx(other)`

Extended rectangle collision helper that returns a directional hit code instead of only true/false.

### `gameObj.resizeCollider(cx, cy, cw, ch)`

Changes the collider rectangle relative to the sprite position.

```python
go.resizeCollider(2, 2, 12, 12)
```

### `gameObj.drawCollider(color)`

Draws the collider rectangle as an outline.

Useful for debugging collisions.

## 🏃 Movement helpers

### `gameObj.updateTowards(tx, ty, speed)`

Moves the object toward a target point using delta time.

Returns the remaining distance.

### `gameObj.updateMove2(tx, ty, speed)`

Another move-towards helper with similar behavior.

## 📏 Clamp helpers

### `gameObj.clamp_x(min_x, max_x)`
### `gameObj.clamp_y(min_y, max_y)`
### `gameObj.clamp_xy(min_x, max_x, min_y, max_y)`

Keeps the object inside bounds.

```python
go.clamp_xy(0, 239, 0, 239)
```

## 📊 Useful properties

The class exposes many direct properties through `attr`. The most useful ones to document for normal game code are:

### Position and size

- `x`, `y`
- `pos_x`, `pos_y`
- `pos_ix`, `pos_iy`
- `width`, `height`
- `mid_x`, `mid_y`
- `bot_x`, `bot_y`

### Velocity and acceleration

- `speed_x`, `speed_y`
- `acc_x`, `acc_y`
- `speed_max`

### Frame / animation state

- `camera_relative`

Compatibility alias:
- `cam_mode`

Other runtime animation state still follows the underlying implementation and may also be visible through direct attributes.

### Collider box

- `cx`, `cy`, `cw`, `ch`

### Misc

- `id`
- `type`
- `val`

## 🧵 Sprite buffer access

### `gameObj.get_buffer()`

Returns a bytearray by reference to the underlying sprite buffer.

Because this is by reference, editing the returned data affects the object directly.

## 🚚 Sprite streaming helpers

The current implementation also includes TileBus-oriented sprite handoff helpers such as spawning or reconstructing objects from streamed sprite buffers.

These are more advanced engine helpers and are best treated as specialized APIs unless you are working on multi-tile object migration.

## Example

```python
from retroPy import *

player_sprite = sprite("hero.rs8")

player = gameObj(
    buffer=player_sprite,
    pos_x=20,
    pos_y=20,
    change=120,
    speed_x=0,
    speed_y=0,
    animation_mode=0,
    camera_relative=1,
    frame=0,
    flip=0,
)

player.frame_range(0, 3)
player.frame_duration_ms(120)

def Update():
    if kb.left_down():
        player.speed(-60, 0)
    elif kb.right_down():
        player.speed(60, 0)

    if kb.A_down():
        loop.exit()

    player.update()
    player.clamp_xy(0, 239 - player.width, 0, 239 - player.height)

def Draw():
    draw.clear(0)
    player.draw()

loop = gameloop(Update, Draw)
loop.run()
```

## Notes

- `gameObj` is a lightweight engine object, not a full entity framework.
- The draw path is camera-aware when camera mode is enabled.
- The animation helpers are frame-based and tied to the sprite data attached to the object.
- The current implementation also contains lower-level or specialized helpers related to sprite ownership and multi-tile streaming; those are intentionally not the focus of the normal public API.
