---
layout: default
title: Input
---
# 🎮 RetroPy `Input` Module Documentation (MicroPython)

The `Input` module manages button polling, transient input state, and GPIO mapping in RetroPy.

---

## 📦 Class: `Input`

### 🔧 Constructor

```python
Input(left=13, right=10, up=11, down=12, A=9, B=8, trigger_left=22, trigger_right=23)
```

Initializes the 8-button setup using GPIO pins.

---

## 🎯 Input Group Checks

- `ab_pressed()`: True if A or B pressed
- `movement_pressed()`: True if any D-pad pressed
- `trigger_pressed()`: True if any trigger pressed
- `any_pressed()`: True if any button pressed

---

## ⌨️ Button Queries

- `is_pressed(id)`: Just pressed this frame
- `is_released(id)`: Just released this frame
- `state(id)`: Current state (True/False)

---

## 📡 Input Queue

- `poll()`: Returns `(type, id, value, timestamp)` or `None`
- `poll_sources()`: Polls GPIO
- `clear()`: Clears transient states (pressed/released)

---

## 🔢 Button IDs

```python
LEFT = 0
RIGHT = 1
UP = 2
DOWN = 3
A = 4
B = 5
TRIGGER_LEFT = 6
TRIGGER_RIGHT = 7
```

---

## 📌 Notes

- `poll_sources()` should be called once per frame.
- Queue holds `INPUT_BUTTON_DOWN`, `INPUT_BUTTON_UP`, etc.
