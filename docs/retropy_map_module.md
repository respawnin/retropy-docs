---
layout: default
title: Map
---
# 🗺️ RetroPy `Map` Module Documentation (MicroPython)

The `Map` class provides tilemap loading, rendering, and tile flag integration using `.map` files and `.rs8` sprite sheets.

---

## 📦 Class: `Map`

### 🔧 Constructor

```python
Map(map_file, tile_sprite)
```

- `map_file`: filename, bytes, or file object
- `tile_sprite`: a valid `Sprite` object (tileset)

---

## 🖼️ Rendering

- `draw()`: Renders visible area using camera
- `draw_region(x, y, w, h)`: Draws tile region to screen
- `fill(value)`: Fill entire map with a tile
- `load(path)`: Reload map data
- `load_sprite(sprite)`: Load a new tileset

---

## 🧱 Tile Access

- `get_tile(x, y)`: Get tile index
- `set_tile(x, y, index)`: Change tile
- `pixel_to_tile(px, py)`: Convert pixel to tile coords
- `tile_to_pixel(tx, ty)`: Convert tile to pixel coords
- `in_bounds(x, y)`: Whether coordinates are valid

---

## 🧮 Collision & Flags

- `collide_tiles(Rect)`: Returns list of overlapping tiles
- `collide_flagged(Rect, layer_name)`: Returns overlapping flagged tiles

---

## 🏷️ TileFlagLayer Integration

- `attach(name, layer)`: Attach a `TileFlagLayer`
- `get(name)`: Get a `TileFlagLayer` by name
- `get_layer_by_index(i)`: Indexed access
- `layer_count`: Returns number of layers
- `layer_names`: List of names

---

## 🔍 Attributes

| Attribute        | Description                    |
|------------------|--------------------------------|
| `width`, `height`| Map size in tiles             |
| `tile_size`      | Tile size (typically 8 or 16) |

---

## 📄 String Representation

```python
print(map)
# Output: <Map WxH tiles, tile_size=S, sprite=WxHxF>
```

---

## 📂 Map File Format

- Byte 0: Magic `0xA1`
- Byte 1: Version (0x01+ supports flag layers)
- Bytes 2–3: width
- Bytes 4–5: height
- Byte 6: tile_size
- Byte 8: number of flag layers
- Byte 16+: tile indices (W × H bytes)
- After tile data:
  - For each flag layer:
    - name_len, name (ASCII), 32-byte bitfield
