---
layout: post
title: "Getting started with retroPy"
date: 2023-09-01 00:00:00 +0800
category: game-engine
author: retrocat
short-description: Getting started with retroPy
---

# Welcome to retroPy!

**retroPy is a retro game engine for the RP2040 chip. Write retro games in a modern way with MicroPython!**

The retroPy game engine is free and great for anyone who wants to make retro games on a physical game console that can be modded to your heart's content.

retroPy is written for a retro handheld game console with Raspberry Pi's RP2040 at its core, a 240x240 pixel screen, 4 sound channels, and 8 buttons.  

The retroPy hardware can be **breadboarded**, **soldered**, or purchased as a **pre-assembled console*** *(coming soon!)*.

### Things you will need:
 1. If you've got your hands on a **retroPy console** or **made your own**, great! 
 2. Ensure you have [Thonny](https://thonny.org/) (available on Windows/Mac/Linux) installed ([Thonny installation guide here](https://respawnin.github.io/retropy-docs/game-engine/installing-thonny)).

#### Let's get started!


Plug in your retroPy console using the provided USB cable (You'll need a micro-B USB if you're connecting to the Pico/ a USB c if you're connecting to the soldering kit.)

Launch Thonny and make sure to select retroPy by clicking the bottom right hand corner, and selecting any MicroPython option

![Select retroPy MicroPython in Thonny](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/thonny-micropython.png)

You should see something like this in the shell that mentions the MicroPython & retroPy version.
![\Thonny screenshot with shell\]](https://github.com/respawnin/retropy-docs/blob/main/assets/basics/thonny-shell.PNG?raw=true)

> If you don't, check the USB connections and press the reset button for > 2s and try again. If you've  DIY-ed a retroPy, ensure you have **installed the game engine firmware first**. 

We will also need to see the files in our console, so go to **View > Files** to enable it *(Sorry, VSCode people)*. 
The top part of the file directory points to the files in our PC, the bottom shows the files in the retroPy. 

![\[Thonny Screenshot with files\]](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/thonny-files.png)

In the root directory of retroPy, double click on `GetStarted.py` to open it up.

Let's run the file to see what this code does.

![Thonny Toolbar](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/thonny-toolbar.png)

Press F5 or click on the green play button on the toolbar to run the code.

#### Hello World!

![retroPy Hello World Example](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/HelloWorld.png)

Getting "Hello World!" to display on the screen is as simple as 2 lines of code (Lines 7 & 8).

{% highlight python %}
from retroPy import rpy

def update(dt):
    pass

def draw():
    rpy.clear(1)
    rpy.text("Hello World!", 75, 100, 7)
    pass

#======================================================================
rpy.run(update, draw)  
{% endhighlight %}

On ***line 7***, we'll need to clear the screen before we start drawing anything on it. Here, we're clearing the entire screen with colour index 1 (Dark Blue).

On ***line 8***, we'll use the text command to indicate the string of text we want to display, its top left (X,Y) starting position, followed by the colour of the text (colour Index 7 is white).
By default, the text is a monospace font of size 16x16 pixels.

Other than lines 7 & 8, everything else is the bare minimum required for an empty project (A copy of it called `Empty.py` can be found in the retroPy directory).

![retroPy's 16 colour palette](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/retropy-colour-palette.png)
>retroPy uses a 16 colour palette index. Meaning only 16 colours can be used at one time. By default, it uses [PICO-8's colour palette](https://lospec.com/palette-list/pico-8). You can use other colour palettes, but that's something to be covered another time.


![Screen cartesian coordinates](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/screen-cartesian.png)
>The retroPy supports a 240x240 pixel screen, and follows the cartesian coordinate system.

#### Let's draw a red ball!
Add the following line under the `draw` function

{% highlight python %}

rpy.filled_circle(50, 50, 12, 8)

{% endhighlight %}

The `filled_circle` command takes 4 parameters -  `( radius, center-x, center-y, colour)`


![Thonny Run and Stop Buttons](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/thonny-toolbar.png)

Stop the current code that is running by clicking the stop/reset button.
Now we can Press F5 to run the updated code/ click on the play button.


#### Displaying a sprite



## What Next?
- Check out the next part of the tutorial here! We'll get things moving (quite literally)

## Further Reading
- There are even more tutorials here *(Tutorials are added in periodically when the devs aren't too overwhelmed ;] )*
- Check out how the games that are included with the retroPy are written. Learn and modify them to create your own variant of the game. (Make sure to make back ups of the original, just in case)
- Go "window shopping" for assets. Check out the standard assets that come with retroPy and get inspiration to use them in your own games.
- Make your own pixel art animation! retroPy is great not just for games, but for pixel art animations to prop up as a display on your desktop setup. 
- See what other people are doing with retroPy with the #madewithRetroPy hashtag
- Check out the FAQ to see if we have answers for some of the burning questions you may have.




