---
layout: default
title: Map
---
<pre>
╔══════════════════════════════════════════════════════════════╗
║                      map API Contents                        ║
╚══════════════════════════════════════════════════════════════╝

📦 <a href="#-api-reference-map">map</a>
 ├─ 📥 <a href="#-import"> Import</a>
 ├─ 📖 <a href="#-overview"> Overview</a>
 ├─ 🧱 <a href="#-creating-a-map"> Creating a map</a>
 ├─ ⚠️ <a href="#-important-note"> Important note</a>
 ├─ 🖼️ <a href="#-drawing"> Drawing</a>
 ├─ 🧩 <a href="#-tile-access"> Tile access</a>
 ├─ 📏 <a href="#-coordinate-helpers"> Coordinate helpers</a>
 ├─ 🧪 <a href="#-tile-bound-debug-helpers"> Tile bound debug helpers</a>
 ├─ 🏃 <a href="#-movement-helpers-for-gameobj"> Movement helpers</a>
 ├─ 📊 <a href="#-map-info-helpers"> Map info helpers</a>
 ├─ ▶️ <a href="#example"> Example</a>
 └─ 📝 <a href="#notes"> Notes</a>
</pre>

---
<br/>
# 📦 API Reference: `map`

The `map` class wraps a tilemap buffer plus a sprite sheet.

It provides:

- tilemap drawing
- tile read / write helpers
- world-to-tile conversion helpers
- tile-bound debug drawing
- simple `gameObj` movement helpers against the tilemap

---
<br/>

## 📥 Import

```python
from retroPy import map
```

## 📖 Overview

`map` is the built-in tilemap helper for retroPy.

Use it for:

- drawing scrolling tile layers
- querying or editing map cells
- tile-based collision checks
- basic map-aware movement for `gameObj`

## 🧱 Creating a map

Preferred constructor:

```python
tiles = sprite("tiles.rs8")
level = map(tiles=tiles, map_buffer=map_bytes, solid_from=1)
```

Arguments:

- `tiles` -> a `sprite(...)` object containing the tile graphics
- `map_buffer` -> the raw map data buffer
- `solid_from` -> threshold value used by `move_game_obj_blocking()`

Compatibility aliases still supported:

- `buffer` -> alias of `tiles`
- `MapBuffer` -> alias of `map_buffer`
- `div` -> alias of `solid_from`

## ⚠️ Important note

For normal public usage, pass a `sprite(...)` object for `tiles`.

## 🖼️ Drawing

### `map.draw(cam_x, cam_y)`

Draws the full map using a scroll offset.

### `map.draw(map_x, map_y, cam_x, cam_y)`

Draws the map starting from a tile coordinate.

### `map.draw(map_w, map_h, map_x, map_y, cam_x, cam_y)`

Draws a sub-region of the map.

The draw path looks up each tile index from the map buffer and blits the corresponding frame from the tile sprite sheet.

## 🧩 Tile access

### `map.tile(tx, ty)`
### `map.tile(tx, ty, value)`

Gets or sets a tile by tile index.

```python
value = level.tile(5, 8)
level.tile(5, 8, 3)
```

Compatibility alias:
- `map.cell_ndx(...)`

### `map.tile_at(px, py)`
### `map.tile_at(px, py, value)`

Gets or sets a tile using pixel/world coordinates.

```python
tile = level.tile_at(player.x, player.y)
```

Compatibility alias:
- `map.cell(...)`

## 📏 Coordinate helpers

### `map.tile_x(px)`

Returns the tile X index for a pixel coordinate.

### `map.tile_y(py)`

Returns the tile Y index for a pixel coordinate.

These are useful for grid games, collision checks, and editor tools.

Compatibility aliases:
- `map.ndx_x(...)`
- `map.ndx_y(...)`

## 🧪 Tile bound debug helpers

### `map.draw_tile_bounds(tx, ty, color)`

Draws the outline of a tile cell using tile indices.

### `map.draw_tile_bounds_at(px, py, color)`

Draws the outline of the tile cell containing a world/pixel position.

These functions are mainly debug helpers.

Compatibility aliases:
- `map.drawColliderNdx(...)`
- `map.drawCollider(...)`

## 🏃 Movement helpers for `gameObj`

### `map.move_game_obj(obj)`

Predicts movement for a `gameObj` using its current velocity and acceleration, checks the map tiles ahead, and updates the object if movement is allowed.

It also clamps the object to map bounds.

Compatibility alias:
- `map.update_gObj(...)`

### `map.move_game_obj_blocking(obj)`

Variant of `move_game_obj()` that treats map cells with `tile >= solid_from()` as blocked.

Compatibility alias:
- `map.update2_gObj(...)`

## 📊 Map info helpers

### `map.solid_from()`

Returns the current solid-tile threshold.

Compatibility alias:
- `map.seperator()`

### `map.tile_size()`

Returns the tile size in pixels.

Compatibility alias:
- `map.size()`

### `map.width()`

Returns map width in cells.

### `map.height()`

Returns map height in cells.

### `map.pixel_width()`

Returns map width in pixels.

Compatibility alias:
- `map.pwidth()`

### `map.pixel_height()`

Returns map height in pixels.

Compatibility alias:
- `map.pheight()`

### `map.value()`
### `map.value(v)`

A small extra value slot exposed by the class. This appears to be a general-purpose internal integer rather than core map data.

## Example

```python
from retroPy import *

tiles = sprite("tiles.rs8")
map_data = open("level.map", "rb").read()

level = map(
    tiles=tiles,
    map_buffer=map_data,
    solid_from=16,
)

player = gameObj(
    buffer=sprite("hero.rs8"),
    pos_x=16,
    pos_y=16,
    change=120,
    speed_x=0,
    speed_y=0,
    animation_mode=0,
    camera_relative=1,
    frame=0,
    flip=0,
)

level.draw(0, 0)
level.move_game_obj_blocking(player)
player.draw()
```

## Notes

- The map class currently assumes square tiles and derives tile size from the tile sprite width.
- `move_game_obj()` and `move_game_obj_blocking()` are lightweight built-in movement helpers, not a full physics system.
- For more complex games, you may still use `tile()` / `tile_at()` directly and layer your own collision rules on top.
