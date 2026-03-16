---
layout: default
title: retroPy Device Contents
---

# 🎮 retroPy Files: A Quick Overview

So, you just opened the retroPy's hardware contents for the first time and want to know what everything is.

Here's a quick breakdown of the files included with the RetroPy handheld console.




## 📁 What This Folder Is


This directory is the **on-device project content** for a RetroPy handheld console.

When you open it for the first time, you are looking at:
- a launcher (`main.py`)
- a game engine (`RetroPy/`)
- multiple game folders (`g_*`)
- shared assets and score files
- firmware image file (`.uf2`) used to flash the board

---


## How It Starts On Device


1. The device runs `main.py`(../main.py).
2. `main.py` scans folders named `g_*` (for example `g_Snake`, `g_Zombie`).
3. It shows that list as the game menu.
4. `A` launches the selected game by executing the game script inside that folder.

In short: `main.py` is the console menu/launcher.

---


## 📌 Important Top-Level Items


- `main.py`(../main.py): game launcher UI and menu logic.
- `myCode.py`(../myCode.py): minimal example/test script.
- `RetroPy/`: engine runtime, input/display wrappers, shared sprites/audio/libs.
- `g_*/`: individual games.
- `Assets/`: shared art assets (used heavily by Zombie).
- `Scoreboard.txt`(../Scoreboard.txt): persistent high-score style text data.


---


## 📁 Game Folder Pattern (`g_*`)

Games on **RetroPy** follow this structure:
- Each game must be placed in its own folder, prefixed with `g_`, located in the root directory.
- The launcher (`main.py`) automatically detects these folders and populates the game menu.

Examples:
- `g_Snake/Snake.py`
- `g_BreakOut/BreakOut.py`
- `g_Zombie/Zombie.py`

---


## 💡 Engine Concepts You’ll See Everywhere


From `RetroPy/retroPy.py`:
- `rpy.run(Update, Draw)`: main game loop
- `kb`: button input state (`left_down`, `A_down`, etc.)
- `draw`: drawing API (`text`, `filled_rect`, `sprite`, etc.)
- `gameObj(...)`: sprite actor with position, speed, animation, collider helpers
- `LoadSprite(...)` / `LoadSpriteStr(...)`: load sprite data from `.rs4` file or inline text


### 📄 Common file types


- `.py`: game and engine code
- `.rs4` / `.rs8`: sprite/animation assets
- `.bzz`: buzzer/audio note data
- `.txt` / `.json`: saved scores/settings
- `.uf2`: microcontroller firmware image

---


## 🕹️ Typical Controls (By Convention)


Controls vary slightly per game, but usually:
- `UP/DOWN/LEFT/RIGHT`: movement/menu navigation
- `A`: confirm / primary action / shoot / jump
- `B`: back / secondary action / skip / quit in some games

Many games also use `RetroPy/AB2Cont.py` to display “Press A or B to continue” between runs.

---


## Why Some Files Look Repetitive


This is a sample-pack style codebase, so several games have:
- repeated helper patterns
- per-game reset loops (`while True: rpy.run(...); ...`)
- game-specific score storage conventions

That is normal for this project and expected in educational/sample console packs.

---


## If You Want to Edit Safely


Start here:
1. Duplicate one game folder and rename it (`g_MyGame`).
2. Keep the same main script naming pattern (`g_MyGame/MyGame.py`) so launcher discovery works cleanly.
3. Edit logic in that folder only.
4. Reuse shared sprites from `RetroPy/Sprites/` or add your own `.rs4` assets.

Avoid editing these first unless needed:
- `RetroPy/retroPy.py*` (core runtime)
- hardware pin/board setup inside engine

---


## 🧠 Mental Model (Quick)


Think of this project as:
- **OS/menu**: `main.py`
- **engine**: `RetroPy/`
- **apps/games**: `g_*`
- **assets/data**: `Assets/`, `RetroPy/Sprites/`, score files

If you understand those four layers, the rest of the repo becomes much easier to navigate.
