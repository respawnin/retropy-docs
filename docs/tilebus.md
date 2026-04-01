---
layout: default
title: +extra+ tilebus_c
---
# tilebus_c

`tilebus_c` is a standalone MicroPython C module for neighbour-to-neighbour communication over two UART links. It is designed for multi-tile or multi-screen systems where each node talks to a left link and a right link.

This module is **independent of `retroPy`**, but it fits naturally into retroPy-based multi-device projects.

## Import

```python
import tilebus_c as tbc
```

## Overview

The module exposes a single class, `TileBus`, plus a few module-level constants.

Protocol characteristics visible in the source:

- framing uses `0x00` delimiters
- payloads are COBS-encoded
- integrity checking uses CRC16-CCITT
- the worker reads and forwards traffic in a background thread
- Python callbacks are dispatched from the foreground via `poll()`

The implementation is RP2040-oriented and uses two UART links by default:

- left link: UART0 on GP0/GP1
- right link: UART1 on GP8/GP9

## Constructor

### `tbc.TileBus(...)`

Creates a TileBus instance.

Supported keyword arguments:

- `baud=1000000`
- `left_uart=0`
- `right_uart=1`
- `left_tx=0`
- `left_rx=1`
- `right_tx=8`
- `right_rx=9`
- `is_master=True`
- `my_id=-1`

Example:

```python
import tilebus_c as tbc

tb = tbc.TileBus(
    baud=1_000_000,
    left_uart=0,
    right_uart=1,
    left_tx=0,
    left_rx=1,
    right_tx=8,
    right_rx=9,
    is_master=True,
    my_id=-1,
)
```

### Role and ID behavior

The constructor defaults to `is_master=True`. If `my_id == -1`, the constructor assigns:

- `0` when the instance is master
- `-1` when the instance is a node waiting for assignment

The source also includes a simple assignment mechanism driven by ping / assignment frames.

## Lifecycle

### `tb.start()`
Starts the worker thread and resets queue / link state.

### `tb.stop()`
Stops the worker, clears the receive queue, resets link state, and flushes UART state.

### `tb.restart()`
Equivalent to stop, then start.

## Role helpers

### `tb.set_role_master()`
Marks the instance as master and sets `my_id = 0`.

### `tb.set_role_node()`
Marks the instance as a node. If the current ID is `0`, it is reset to `-1`.

## Callback handling

### `tb.set_on_data(callback)`
Registers a callback that will be called from `poll()` when a data frame addressed to this node is received.

Callback signature:

```python
def on_data(src, dst, flags, payload):
    ...
```

Where:

- `src` is the sender ID
- `dst` is the destination ID
- `flags` is the frame flags byte, with direction flags injected for Python
- `payload` is a `bytes` object

### `tb.poll()`
Dispatches queued incoming DATA packets to the registered Python callback.

This is important: the worker receives frames in the background, but **Python callbacks do not run automatically in the background thread**. Your foreground code should call `tb.poll()` regularly, often once per frame.

Example:

```python
def on_data(src, dst, flags, payload):
    print(src, dst, flags, payload)

tb.set_on_data(on_data)
tb.start()

while True:
    tb.poll()
```

## Sending data

### `tb.send_up(dst, payload, flags=0)`
Sends a DATA frame toward the left / upstream side.

Alias:

- `tb.send_left(...)`

### `tb.send_down(dst, payload, flags=0)`
Sends a DATA frame toward the right / downstream side.

Alias:

- `tb.send_right(...)`

### `tb.broadcast(payload, forward=True)`
Broadcasts a payload to the right side. If `forward=True`, the broadcast forward flag is set so downstream nodes can continue forwarding it.

### `tb.broadcastL(payload, forward=True)`
Broadcasts a payload to the left side.

## Ping and discovery

### `tb.periodic_ping(interval_ms)`
Emits a broadcast ping when the requested interval has elapsed. In the current implementation this is stateful and meant to be called repeatedly from your main loop.

Typical usage:

```python
while True:
    tb.periodic_ping(500)
    tb.poll()
```

The current source shows that link presence is inferred from recent traffic, with `has_left` and `has_right` expiring after a short timeout.

## State and getters

### `tb.stats()`
Returns a dictionary with:

- `my_id`
- `is_master`
- `rx`
- `tx`
- `has_left`
- `has_right`

Example:

```python
print(tb.stats())
```

### `tb.get_my_id()` / `tb.set_my_id(value)`
Get or set the current node ID.

### `tb.get_is_master()` / `tb.set_is_master(value)`
Get or set the master-role flag.

## Module constants

The module exports:

- `tilebus_c.BROADCAST`
- `tilebus_c.FLAG_FROM_UP`
- `tilebus_c.FLAG_FROM_DOWN`

`FLAG_FROM_UP` and `FLAG_FROM_DOWN` are injected into the callback `flags` value so Python can tell which side the frame came from.

## Minimal example

```python
import tilebus_c as tbc

def on_data(src, dst, flags, payload):
    print("rx:", src, dst, flags, payload)

tb = tbc.TileBus(is_master=True)
tb.set_on_data(on_data)
tb.start()

# Send to the right
# Replace 1 with a real node ID in your network
tb.send_right(1, b"hello")

while True:
    tb.periodic_ping(500)
    tb.poll()
```

## Notes and cautions

- The implementation is strongly RP2040-specific.
- The worker runs in a separate thread, but callbacks are foreground-only through `poll()`.
- Frame payloads are limited in practice by the fixed internal frame size and the `send_common()` packing logic.
- The module is designed around neighbour links, not a general routed mesh.
- `broadcast()` currently sends right; `broadcastL()` sends left.
