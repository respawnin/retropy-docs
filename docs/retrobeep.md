---
layout: default
title: +extra+ retrobeep
---
# retrobeep

`retrobeep` is a standalone MicroPython C module for simple PWM music playback on RP2040-class hardware. The source file is named `pbeep.c`, but the registered user-facing module name is `retrobeep`.

This module is **independent of `retroPy`**, but it fits well into retroPy projects that need lightweight music playback.

## Import

```python
import retrobeep
```

## Overview

The implementation visible in this source currently provides:

- 2 independent tracks
- 4 voices of polyphony per track
- PWM output on two pins
- a fixed sample rate of `22050`
- note scheduling by step index
- per-track play / pause / stop
- per-track mute and loop controls
- sequence loading from Python tuples or `.beep` files

Waveforms currently visible in the audio mixer:

- `0` = square
- `1` = triangle
- `2` = sine

The note system uses MIDI note numbers. The sequencer accepts:

- valid note range: `12` to `120`
- `255` for rest / no note

## Output pins

Default PWM pins in the source are:

- channel A: GPIO `3`
- channel B: GPIO `4`

You can change them before starting playback.

## Basic control

### `retrobeep.start()`
Initializes PWM output, resets internal state, and starts the audio worker thread.

### `retrobeep.stop()`
Stops output by disabling PWM, zeroing the channel levels, and returning the pins to GPIO input mode.

### `retrobeep.reset_all()`
Clears all sequences, resets all voices, resets per-track step/state, and silences the PWM outputs.

## Sequence formats

### `retrobeep.set_sequence(track, sequence)`
Loads a sequence from a Python list of 4-tuples.

Each tuple is:

```python
(start_step, midi_note, duration_steps, instrument)
```

Example:

```python
retrobeep.set_sequence(0, [
    (0, 60, 4, 0),
    (4, 64, 4, 0),
    (8, 67, 4, 0),
])
```

Behavior visible in the source:

- track index must be `0` or `1`
- the sequence length is capped by `MAX_SEQUENCE`
- loading a new sequence clears currently active voices for that track
- `loop_end` is auto-computed from the last note end time

### `retrobeep.load_beep(track, source)`
Loads a sequence from a `.beep` binary source.

The source may be:

- a filename string
- a file-like object with `.read()`

The file format expected by this source begins with a two-byte header:

- `'B'`
- `'P'`

After that, notes are read in 4-byte records:

```text
[start][note_id][duration][instrument]
```

## Tempo

### `retrobeep.set_tempo(bpm, steps_per_beat)`
Sets the internal sequencer tick rate.

The source computes:

```python
retrobeep_ticks_per_second = (bpm * steps_per_beat) / 60
```

This means the second argument is the sequencer density, such as 4, 8, 16, and so on.

Example:

```python
retrobeep.set_tempo(120, 4)
```

## Pins

### `retrobeep.set_pins(pin_a, pin_b)`
Changes the two PWM output pins.

Important: the source raises an error if you try to change pins while PWM is already running.

## Per-track control

### `retrobeep.play_channel(track)`
Puts a track into the playing state. If the track was stopped, the play position is rewound to step 0.

### `retrobeep.pause_channel(track)`
Pauses a track without clearing its position.

### `retrobeep.stop_channel(track)`
Stops a track, rewinds it to step 0, and clears its voices.

### `retrobeep.mute_channel(track[, state])`
Mutes or unmutes a track.

- with one argument, it toggles mute
- with two arguments, it explicitly sets mute to `True` or `False`

### `retrobeep.loop_channel(track, enable[, loop_len_steps])`
Enables or disables looping for a track.

If `loop_len_steps` is omitted, the module uses the auto-computed `loop_end` from the sequence. If supplied, it overrides the loop boundary.

## Minimal example

```python
import retrobeep

retrobeep.set_pins(3, 4)
retrobeep.set_tempo(120, 4)

retrobeep.set_sequence(0, [
    (0, 60, 4, 0),
    (4, 64, 4, 0),
    (8, 67, 4, 0),
    (12, 72, 4, 0),
])

retrobeep.loop_channel(0, True)
retrobeep.start()
```

## `.beep` loading example

```python
import retrobeep

retrobeep.load_beep(0, "theme.beep")
retrobeep.loop_channel(0, True)
retrobeep.start()
```

## Notes and cautions

- The source registers the module name as `retrobeep`, not `pbeep`.
- The module is RP2040 / PWM oriented and not a general desktop audio backend.
- The visible worker loop in this file runs continuously in a background thread.
- In the current source, `stop()` should be understood as **disable / silence output**. Treat the implementation as low-level and evolving.
- The mixer advances oscillator phase only while a track is in the playing state.
- Looping clears leftover voices at the wrap point to avoid overlap across loop boundaries.
