---
layout: default
title:  .:[SolderKit]:. PinOut
---

## retroPy Console (Solder Kit v2) — RP2040-Zero PinOut
The following diagram outlines how each GPIO on the RP2040-Zero is assigned within the retroPy console, covering screen interface, controls, audio, and system functions.

<img src = "https://github.com/respawnin/retropy-docs/blob/main/assets/basics/retroPy-SolderKit_V2_Pins.png?raw=true" width = "800px" height = "auto" alt = "retroPy Soldering Kit v2 Pins">
<br><br>
<img src = "https://github.com/respawnin/retropy-docs/blob/main/assets/basics/retroPy-RP2040-Zero-PinOut.png?raw=true" alt = "retroPy Soldering Kit/ RP2040-ZERO Pinout" width = "800px" height = "auto">
<br><br>

```text
┌──────────────────────────────────────────────────────────────┐
│   retroPy Console (Solder Kit v2) — RP2040-Zero PinOut       │
└──────────────────────────────────────────────────────────────┘

[ CORE MODULE ]
────────────────────────────────────────────────────────────────
                 ┌────────────────────────────┐
                 │        RP2040-ZERO         │
                 │                            │
                 │           USB-C            │
                 │        ┌────────┐          │
                 │        │        │          │
                 │        └────────┘          │
                 │                            │
                 │         RP2040 MCU         │
                 │                            │
                 │   [BOOT]           [RGB]   │
                 └────────────────────────────┘


[ GPIO MAP ]
──────────────────────────────────────────────────────────────────
INPUTS                                   │  OUTPUTS 
─────────────────────────────────────────┼────────────────────────
GP15  > TRIGGER_RIGHT                    │  GP2   < BUZZER1
GP13  > LEFT                             │  GP14  < BUZZER2
GP12  > DOWN                             │  GP16  < RGB (STATUS LED)
GP11  > UP                               │
GP10  > RIGHT                            │  GP3   < SCREEN_RES
GP9   > BTN_A                            │  GP4   < SCREEN_DC
GP8   > BTN_B                            │  GP6   < SCREEN_SCL
GP5   > TRIGGER_LEFT                     │  GP7   < SCREEN_SDA


[ POWER + CONTROL ]
────────────────────────────────────────────────────────────────
5V     > supply rail
GND    > ground
3V3    > regulated output

RUN    > system push button (reset line)
RGB    > GP16 (user LED)


[ DISPLAY INTERFACE ]
────────────────────────────────────────────────────────────────
TYPE: SPI (ST7789) 1.54"/2.0"/2.4"/2.8"

SIGNAL   PIN / CONNECTION
────────────────────────────────
GND    → GND
VCC    → 3V3
SCL    → GP6
SDA    → GP7
RES    → GP3
DC     → GP4
CS     → GND
BLC    → 3V3 (via in-line 5Ω resistor)


```
