---
layout: default
title:  .:[SolderKit]:. PinOut
---

## retroPy Console (Solder Kit v2) — RP2040-Zero PinOut
The following diagram outlines how each GPIO on the RP2040-Zero is assigned within the retroPy console, covering screen interface, controls, audio, and system functions.

![retroPy Soldering Kit v2](https://github.com/respawnin/retropy-docs/blob/main/assets/basics/retroPy-SolderKit_V2.png?raw=true)


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
────────────────────────────────────────────────────────────────
LEFT / INPUT BUS                          RIGHT / IO BUS
────────────────────────────────────────────────────────────────
GP15  > TRIGGER_RIGHT                GP2  < BUZZER1
GP14  > BUZZER2                      GP3  < SCREEN_RES
GP13  > LEFT                         GP4  < SCREEN_DC
GP12  > DOWN                         GP5  < TRIGGER_LEFT
GP11  > UP                           GP6  < SCREEN_SCL
GP10  > RIGHT                        GP7  < SCREEN_SDA
GP9   > A                            GP8  < B


[ POWER + CONTROL ]
────────────────────────────────────────────────────────────────
5V     > supply rail
GND    > ground
3V3    > regulated output

RUN    > system push button (reset line)
RGB    > GP16 (status LED)


[ DISPLAY INTERFACE ]
────────────────────────────────────────────────────────────────
TYPE: SPI (shared lines)

PIN   SIGNAL   ROUTE
────────────────────────────────
1     GND    → GND
2     VCC    → 3V3
3     SCL    → GP6
4     SDA    → GP7
5     RES    → GP3
6     DC     → GP4
7     CS     → GND
8     BLC    → 3V3


```
