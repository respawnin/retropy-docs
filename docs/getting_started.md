---
layout: default
title: Getting Started
---

# 🚀 Getting Started


This guide covers the basic setup for the RetroPy handheld console project, including hardware, firmware, editor options, palette basics, and a safe first workflow.

---


## 1) What You Have


This repo is a RetroPy handheld console project with:
- a launcher (`main.py`)
- a runtime/engine (`RetroPy/`)
- multiple games (`g_*` folders)
- art/audio assets (`.rs4`, `.bzz`)

![retroPy Project Structure](https://github.com/respawnin/retropy-docs/blob/main/assets/basics/rpy_proj_structure.PNG?raw=true)

---


## 2) Minimum Setup


### Hardware

- RP2040-based RetroPy-compatible handheld board
- USB cable (data-capable)

### Firmware

- UF2 firmware in repo: `RetroPy1_240_alpha_0p2nush.uf2`
- If you haven't already done so, flash the retroPy UF2 firmware file to your board before testing games

[LINK_PLACEHOLDER: Firmware flashing guide]


### Files on Device


At minimum, copy:
- `main.py`
- `RetroPy/`
- all `g_*` folders you want available
- required asset folders/files (`Assets/`, score files)

---


## 3) Editor Options


## Online (browser)

|  | |
|-----|-----|
|  <img src="https://github.com/respawnin/retropy-docs/blob/main/assets/basics/ViperIDE_Logo.png?raw=true" width="96" align="left"> | **Viper-IDE**  [ [https://viper-ide.org/ ](https://viper-ide.org/)]<br><br>Best when you want direct web upload/edit for MicroPython boards.<br>Good for quick edits and test loops.<br><br> |

---

## Offline (desktop)

| | |
|-----|-----|
| <img src="https://github.com/respawnin/retropy-docs/blob/main/assets/basics/Thonny_Logo.png?raw=true" width="96" align="left" >| **Thonny**  [[ https://thonny.org/ ](https://thonny.org/)]<br><br>Easiest MicroPython workflow for beginners.<br>Good serial REPL + file management. <br><br>|
| <img src="https://github.com/respawnin/retropy-docs/blob/main/assets/basics/VSCode_Logo.png?raw=true" width="64" align="center">| **VS Code**  [[ https://code.visualstudio.com ](https://code.visualstudio.com)]<br><br>Best for larger edits and refactors.<br>Recommended with Python + MicroPython extensions. <br><br>|



---


## 4) Running the Console


1. Connect board over USB.
2. Ensure project files are on device storage.
3. Boot/run `main.py`.
4. Use `UP/DOWN` to choose a `g_*` game and `A` to launch.

---


## 5) Palette Basics (Important)

RetroPy drawing is **palette-index based** (not RGB literals in game scripts):
- Most draw calls use color index `0..15`.
- Example: `draw.text("Hello", x, y, 7)` means color index `7`.

Typical usage pattern in this repo:
- `0`: background/dark
- `7`: neutral text
- `8..15`: highlights/accent colors

Because palette mapping can differ by firmware/build, treat exact color appearance as device-dependent unless fixed in engine config.


![retroPy's 16 colour palette](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/retropy-colour-palette.png)

### Quick Palette Test Snippet


Use this to print swatches on screen:

```python
from RetroPy.retroPy import rpy, draw

def Update(dt):
    pass

def Draw(dt):
    draw.clear(0)
    for i in range(16):
        x = (i % 8) * 30
        y = (i // 8) * 40 + 20
        draw.filled_rect(x + 4, y, 24, 16, i)
        draw.text(str(i), x + 10, y + 20, 7)

rpy.run(Update, Draw)
```

---


## 6) First Safe Changes to Make


- Edit one game only (example: `g_Snake/Snake.py`).
- Keep `main.py` launcher untouched until comfortable.
- Reuse `RetroPy/Sprites/` assets before adding new binary assets.

---


## 7) Common Gotchas


- Wrong file/folder names can break launcher discovery (`g_*` expected).
- Missing asset files cause runtime load failures.
- Editing engine core (`RetroPy/retroPy.py`) can affect every game.
- Score files (`Scoreboard.txt`) are plain text and can be reset accidentally.

---


## 8) Recommended Workflow


1. Duplicate an existing game folder as a template.
2. Make small edits.
3. Run and test on hardware.
4. Commit/backup often.



---

