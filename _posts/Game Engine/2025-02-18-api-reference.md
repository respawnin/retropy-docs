---
layout: post
title: "API Reference"
date: 2025-02-18 02:22:22 +0800
category: game-engine
author: retrocat
short-description: A reference and guide to retroPy's API
---

*[updated for retroPy2 alpha 0.1 with RP2350 and RP2040]*
# retroPy's API reference

While the core game engine is written in c and handled at the machine level to ensure a refresh rate of 50fps, we have exposed some key functions in micro-python as a library for user control and access.

To use the library, we'll need to import it and ensure we have the minimum basic setup as shown.

{% highlight python %}

    from RetroPy.retroPy import rpy, kb, draw, gameObj, LoadSpriteStr, LoadSprite, sprite

    def Update(dt):
        pass

    def Draw(dt):
        pass
    #==================================
    rpy.run(Update, Draw)

{% endhighlight %}
  


## Colour Palette
By default, retroPy uses [PICO-8's 16 colour palette](https://lospec.com/palette-list/pico-8). Every number (0-15) represents a colour.
![retroPy's 16 colour palette](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/retropy-colour-palette.png)



## retroPy `draw` class members

###### .clear(color)  
*Clears the screen with an optional colour. By default, the value is 0 which is black.*

Example:
```python
    def Draw():
        draw.clear()
```
Alternatively:
```python
    def Draw():
        draw.clear(1) #fill the background with dark blue
```
###### .text(string, x, y, color = currColor, FontType)  
*Write text to screen at position x,y with an optional specified colour and font type*
```python
    def Draw():
        draw.text("Hello World",50,50,7,0) 
```
By default, retroPy uses a monospace 8x8 font size. Position x,y is the top left starting position.

Font Type:
- -2 : 3x5 font size
- -1 : 5x5 font size
-  0 : 8x8 font size
-  1 : 8x16 font size

###### .currColor
*Get/Set current palette colour for use in draw methods*
```python
    def Draw():
	draw.clear(0)
	draw.currColor = 7
        draw.text("Hello",50,50)
        draw.text("World",50,60) 
```
## Drawing Primitives
While drawing primitives is more costly and slower than drawing a sprite, they have their uses. 
retroPy supports the following primitive draw functions.

###### .pixel(x, y, color)  
*Draw a pixel at position x, y with an optional specified colour*
```python
    def Draw():
	draw.clear(0)
	draw.currColor = 7
        draw.pixel(10,10)
```
###### .circle(x, y, radius, color)  
###### .filled_circle(x, y, radius, color)  
*Draw an outline circle or filled circle given the center-point and radius, with an optional specified colour*

###### .line(x1, y1, x2, y2, color)  
*Draw a line given the starting and ending x,y position, with an optional specified colour*

###### .hline(x, y, w, color)  
###### .vline(x, y, h, color)  
*Draw a horizontal/ vertical line given the starting x,y position and length of the line, with an optional specified colour*

###### .rect(x, y, w, h, color)  
###### .filled_rect(x, y, w, h, color)  
*Draw an outline or filled rectangle, with an optional specified colour*

## Drawing Sprites
retroPy supports 2 kinds of sprite files. 
- .rs4 files : 4 bit sprite file with palette info
- .rsm files : 1 bit mono sprite file
Sprites can be drawn on its own as an image file, or embedded within a game object.

To draw sprites as a static image, use the following commands.
###### .sprite(ndx, x, y, flip)
*Draw an rs4 sprite image with the given index at position x,y with an optional flip value. Used for drawing images that do not require the functionality of that of a game object. *

Example:
```python
from RetroPy.retroPy import rpy, LoadSprite, sprite
imgSprite = sprite(LoadSprite("RetroPy/Sprites/fire1.rs4")) #<< Load rs4 file 
    def Draw():
	draw.clear(0)
        imgSprite.draw(0, 10,10,0) #<< Draw rs4 file 
```

###### .sprite(ndx, x, y, color)  
*Draw an rsm mono sprite image with the given index at position x,y with a given colour. Used for drawing images that do not require the functionality of that of a game object. *

Refer to segment on loading sprites for more info.

## Loading Sprites
retroPy supports 2 methods of storing and loading sprites.

In the `Retropy>Sprites` folder, you will notice 2 types of sprites assets.
- ###### .rs4 files** (Recommended for speed and memory efficiency)
retroPy's own 4-bit retroSprite files.
Images are stored in a 4-bit colour format. 
- ###### .py "Sprite String" files** (Slower and larger files)
Sprites and animation frames are stored in strings of numbers (representing palette colours). 

To load **rs4 sprites**, provide the file path to the rs4 file.
{% highlight python  %}
    from RetroPy.retroPy import rpy, LoadSprite, sprite
    p_fire = LoadSprite("RetroPy/Sprites/fire1.rs4") #<< rs4 file 
{% endhighlight %}
To load sprites stored in **python Sprite String** files, import the .py file as a library.
{% highlight python  %}
    from RetroPy.retroPy import rpy, LoadSpriteStr, sprite
    from RetroPy.Sprites import heart
    p_player = LoadSpriteStr(heart.heart) #<< python string file
{% endhighlight %}
Where `Sprites` is the folder name, and heart is the python file name (`heart.py`), followed by the variable named `heart`.
> retroPy comes with standard assets for you to quickly get started. 



## Game Objects
Game Objects are objects that have native support for what we consider essential in a game. 

retroPy natively supports game objects with the following:
- Animation (Sprite animation cycle)
- Physics (eg. Acceleration, Velocity)
- Colliders

> retroPy is sprite-centric. 
> All sprites are treated as a game object.
> This includes the characters, items, special effects and game terrains.

To create a game object, we'll make use of the `gameObj` class like so.
{% highlight python  %}
    player = gameObj(p_player, pos_x, pos_y, flip_duration, speed_x, speed_y)
{% endhighlight %}
The `gameObj` class requires a few things.
 - `p_player` -  pointer to where the sprite is
 - `pos_x`, `pos_y`  - starting x, y coordinates of the game object
 - `flip_duration` - (if sprite is an animation) how long(ms) to show each frame before showing the next (leave as 0 if static image)
 - `speed_x`, `speed_y` - how fast (pixels per second) to move the sprite along the x and y axis

> The main concept to using the game object is a simple 3 steps. 
>  1. Load sprite
>  2. Create game object
>  3. Use in Update/Draw Loop

As an example, let's create a cat character and get it to appear in the bottom-left of the screen.
{% highlight python  %}
    cat = gameObj(p_cat, 10, 220, 200, 0, 0)
{% endhighlight %}
We'll place that line into the basic setup like so.

{% highlight python  %}

from RetroPy.retroPy import rpy, gameObj LoadSpriteStr
from RetroPy.Sprites import cat

#1. Load sprite image into memory
p_cat = LoadSpriteStr(cat.idle)
#2. Create game object
cat = gameObj(p_cat, 10, 220, 200, 0, 0)

#3. Use in update/draw loop
def Update(dt):
	cat.update() #update required for animation. (not needed for static images eg. terrain.)
    pass

def Draw(dt):
    rpy.clear()
    cat.draw()
    pass

#====================================================
rpy.run(Update, Draw)  

{% endhighlight %}


## gameObj Members

###### .draw()  
*Draw game object to screen*

###### .update()  
*Calls game engine to update game object with regards to position, animation etc*

###### .pos(pos_x, pos_y)  
###### .pos_x  
###### .pos_y  
*Get/ Set the (top left) position of the game object*

Example:
{% highlight python  %}
    #set the player position to coordinates (0,0)
    player.pos(0,0) 
{% endhighlight %}
alternatively, 
{% highlight python  %}
    player.pos_x = 0
    player.pos_y = 0
{% endhighlight %}

###### .width  
###### .height  
*Get width/height of game object*

###### .mid_x  
###### .mid_y  
###### .bot_x  
###### .bot_y  
*Get/Set the middle (center point) or bottom (bottom right) position of the game object*

Example:
{% highlight python  %}
    player.mid_x = 7
    player.mid_y = 7

    player.bot_x = 15
    player.bot_y = 15
{% endhighlight %}

###### .speed(speed_x, speed_y)
###### .speed_x
###### .speed_y  
*Get/Set the speed (pixels per second) of the game object along the x and y axis*

Example:
{% highlight python  %}
    #move the player to the right at a speed of 20
    player.speed(20,0)	
{% endhighlight %}
Alternatively,
{% highlight python  %}
    player.speed_x = 20
    player.speed_y = 0
{% endhighlight %}

###### .acc(acc_x, acc_y)
###### .acc_x 
###### .acc_y  
*Get/Set the acceleration of the game object along the x and y axis*

Example:
{% highlight python  %}
    #set an upward acceleration of 10
    player.acc(0,-10) 
{% endhighlight %}
Alternatively,
{% highlight python  %}
    player.acc_x = 0
    player.acc_y = -10
{% endhighlight %}

###### .dist(gameObj)  
*Get distance in pixels from another game object* 

Example:
{% highlight python  %}
    cat.dist(food)
{% endhighlight %}


###### .clamp_x(min_x, max_x)  
###### .clamp_y(min_y, max_y)  
###### .clamp_xy(min_x, max_x, min_y, max_y)  
*Set movement boundaries of game object. Game objects will not move past these boundaries.*

## Sprite-related gameObj members
The following game object members are specific to the sprites used in the game object.

These are especially useful for changing sprite properties on the fly. 

###### .sprite(ptr_Sprite, flip_duration)  
*Set pointer to sprite to be used.*

Example:
{% highlight python  %}
    if kb.A_down:
        cat.sprite(p_cat_attack, 200)
{% endhighlight %}


###### .currNdx()  
###### .currNdx(ndx)  
###### .currNdx(ndx, flip = 0)  
*Get/Set current index of sprite to be used. Pick index frame from animation.*

Example use: Ending off a moving sprite animation to a final static image. 

###### .flip()  
###### .flip(val)  
*Get/Set Flip sprite value for horizontal and/or vertical flip*

Flip Options:
 - 0 : no flip 
 - 1 : flip sprite horizontally 
 - 2 : flip sprite vertically 
 - 3 : flip sprite both horizontally and vertically

Example use: Changing player walking direction, without needing separate sprites for each direction.
{% highlight python  %}
    if kb.right_down:
        cat.sprite(p_cat_run,200)
        cat.speed_x = 30
        cat.flip(0) #no flip. cat sprite is already facing right
    if kb.left_down:
        cat.sprite(p_cat_run,200)
        cat.speed_x = -30
        cat.flip(1) #flip sprite horizontally. In this case, from right to left
{% endhighlight %}

###### .mode()  
###### .mode(val)  
*Get/Set Sprite animation display mode*

Mode Options:
- 0 : (default) Continuous frame cycle animation
- 1 : Cycle through animation frames once and disappears (Good for special effects eg. Explosions)
- 2 : Cycle through animation frames once, stops animation at last frame 


###### .flipDuration()  
###### .flipDuration(msec)  
*Get/Set how long(ms) to show each frame before showing the next frame in the animation (leave as 0 if sprite is static)* 

###### .ndxFromTo(value_start, value_end)  
*Set index of sprite to animate from value_start to value_end*


## Colliders in game objects
Colliders are useful for troubleshooting during the development process of the game, and for checking if the game objects have collided into other game objects like walls/ enemies/ items. Colliders are part of game objects.


###### .drawCollider(colour)  
*Draws a rectangle in a given colour to represent the collider. By default, the collider is the size of the sprite.* 

Example:
{% highlight python  %}
    def Draw(dt):
        draw.clear()
        cat.draw()
        cat.drawCollider(3)
        pass
{% endhighlight %}

###### .collider(gameObj)  
*Returns True if the game object collided with another game object.* 

Example:
{% highlight python  %}
    def Update(dt):
        food.update(dt)
        cat.moveTowards(food.pos_x, food.pos_y, 20, dt)
        if cat.collider(food):
            print("Collide!")
{% endhighlight %}

###### .colliderEx(gameObj)  
*Similar to collider with extra info* 

Return Value:
- 0 : No collision
- 1 : Collision from the right of game object
- 2 : Collision from the left of game object
- 3 : Collision from the top of game object
- 4 : Collision from the bottom of game object

###### .colliderPt(x, y)  
*Check if a point is inside the gameObj collider* 

###### .colliderPtEx(x, y)  
*Similar to colliderPt with extra info* 

Return Value:
- 0 : No collision
- 1 : Collision from the right of game object
- 2 : Collision from the left of game object
- 3 : Collision from the top of game object
- 4 : Collision from the bottom of game object

###### .collider_xy(gameObj, x, y)  
*Check if gameObj collides with another gameObj at position x,y*

###### .resizeCollider(pos_x, pos_y, width, height)  
*Resize the gameObj collider.*

Example:
Set collider to be 3 pixels bigger all around the player
{% highlight python  %}
    player.resizeCollider(- 3, - 3, player.width +6, player.height +6)
{% endhighlight %}

###### .pos_cx
###### .pos_cy
*Get/Set x and y position of collider* 

###### .bot_cx
###### .bot_cy
*Get bottom x and y position of collider* 

## Getting User Input - `kb`  Members

The retroPy game engine natively supports the handheld game console's 8 button inputs.

Obtaining the 2 states of a button press - Down & Up (release) is easy.


Example:
{% highlight python  %}
    def Update(dt):
        if kb.right_down:
            cat.sprite(p_cat_run,200)
            cat.speed_x = 30
            cat.flip(0) #no flip. cat sprite is already facing right
        if kb.left_down:
            cat.sprite(p_cat_run,200)
            cat.speed_x = -30
            cat.flip(1) #flip sprite horizontally. In this case, from right to left
        if kb.left_up or kb.right_up:
            cat.sprite(p_cat,200) #set back to idle animation
            cat.speed_x = 0
{% endhighlight %}

**Full list below.**

To get the button **Down** (pressed) or **Up** (released) state, check the corresponding buttons in the update loop.

**Directional Buttons:**
###### .left_down
###### .left_up
###### .right_down
###### .right_up
###### .up_down
###### .up_up
###### .down_down
###### .down_up

**Action Buttons:**
###### .A_down
###### .A_up
###### .B_down
###### .B_up

**Shoulder Trigger Buttons:**
###### .Tleft_down
###### .Tleft_up
###### .Tright_down
###### .Tright_up

To read the state of any of the buttons, use the following. Returns bool True/False, where False is the Down(pressed) state.

**Directional Buttons:**
###### .readLeft
###### .readRight
###### .readUp
###### .readDown

**Action Buttons:**
###### .readA
###### .readB

**Shoulder Trigger Buttons:**
###### .readTleft
###### .readTright

To read the current value of the Joystick, use the following.

**Joystick Values**
###### .readJS1
###### .readJS2




## retroPy `rpy` core members
###### .quit()  
*Quits the run loop*

###### .pauseRun()  
*Pauses the run loop*

###### .resumeRun()  
*Resumes the run loop after a pause*

###### .pauseTimer()  
*Pauses game timer*

###### .resumeTimer()  
*Resumes game timer*

