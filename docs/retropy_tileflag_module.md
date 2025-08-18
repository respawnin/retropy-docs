---
layout: default
title: TileFlagLayer
---
# 🏳️ RetroPy `TileFlagLayer` Module Documentation (MicroPython)

The `TileFlagLayer` class defines a layer of flags used to tag specific tiles in a tilemap.

---

## 📦 Class: `TileFlagLayer`

### 🔧 Constructor

```python
TileFlagLayer(name="optional")
```

Creates a new flag layer with optional name.

---

## 🎯 Methods

- `set(tile_index, True/False)`: Enable/disable flag for tile
- `is_set(tile_index)`: Returns `True` if flagged
- `clear()`: Clears all flags

---

## 🔍 Attributes

| Attribute | Description         |
|-----------|---------------------|
| `name`    | Optional name string |

---

## 📄 String Representation

```python
print(layer)
# Output: <TileFlagLayer 'name'>
```

---

## 📂 Usage with Map

Flag layers can be attached to a map using:

```python
m.attach("collision", TileFlagLayer())
m.get("collision").set(3, True)
```

Used with `collide_flagged(Rect, "collision")`.

---

## 📌 Notes

- Flag data is stored in 32-byte bitfield (256 bits)
- Efficient lookups using bit masks
