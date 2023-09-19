---
layout: post
title: "API Reference"
date: 2023-08-30 02:22:22 +0800
category: game-engine
author: retrocat
short-description: A reference and guide to retroPy's API
---

# retroPy's API reference

While the core game engine is written in c and handled at the machine level to ensure a refresh rate of 50fps, we have exposed some key functions in micro-python as a library for user control and access.

To use the library, we'll need to import it and ensure we have the minimum basic setup as shown.

{% highlight python %}

from retroPy import rpy

def update(dt):
	pass

def draw():
	pass
#====================================================
rpy.run(update, draw)

{% endhighlight %}

## The retroPy Game Engine Class
.quitRun()
.pauseRun()
.resumeRun()
.pauseTimer()
.resumeTimer()
.color_p(color)
.color_palette(val)
.color_reset()

## Colour Palette
By default, retroPy uses [PICO-8's 16 colour palette](https://lospec.com/palette-list/pico-8). Every number (0-15) represents a colour.
![retroPy's 16 colour palette](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/retropy-colour-palette.png)



## Loading Sprites
retroPy supports 2 methods of storing and loading sprites.

In the `Assets` folder, you will notice 2 types of sprites assets.
- **.rs4 files** (Recommended for speed and memory efficiency)
retroPy's own 4-bit retroSprite files.
Images are stored in a 4-bit binary format. 
- **.py "Sprite String" files** (Slower and larger files)
Sprites and animation frames are stored in strings of numbers (representing palette colours). 

To load **rs4 sprites**, provide the file path to the rs4 file.
{% highlight python  %}
    from retroPy import rpy, LoadSprite
    p_fire = LoadSprite("Assets/fire1.rs4") #<< rs4 file 
{% endhighlight %}
To load sprites stored in **python Sprite String** files
{% highlight python  %}
    from retroPy import rpy, LoadSpriteStr
    from Assets import heart
    p_player = LoadSpriteStr(heart.heart) #<< python string file
{% endhighlight %}
Where `Assets` is the folder name, and heart is the python file name (`heart.py`), followed by the variable named `heart`.
> retroPy comes with standard assets for you to quickly get started. More on this here.


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

from retroPy import rpy, gameObj LoadSpriteStr
from Assets import cat

#1. Load sprite image into memory
p_cat = LoadSpriteStr(cat.idle)
#2. Create game object
cat = gameObj(p_cat, 10, 220, 200, 0, 0)

#3. Use in update/draw loop
def update(dt):
	cat.update(dt) #update required for animation. (not needed for static images eg. terrain.)
    pass

def draw():
    rpy.clear()
    cat.draw()
    pass

#====================================================
rpy.run(update, draw)  

{% endhighlight %}

You should see the cat on the screen with an idle animation like so.

## gameObj Members


 **.pos(pos_x, pos_y)**   
**.pos_x** 
**.pos_y**
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
**mid_x, mid_y, bot_x, bot_y**  
*Get/Set the middle (center point) or bottom (bottom right) position of the game object*

Example:
{% highlight python  %}
    player.mid_x = 7
    player.mid_y = 7

    player.bot_x = 15
    player.bot_y = 15
{% endhighlight %}
**speed(speed_x, speed_y), speed_x, speed_y** 
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

**acc(acc_x, acc_y), acc_x, acc_y** 
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

**.dist(gameObj)**
*Get distance in pixels from another game object* 

Example:
{% highlight python  %}
    cat.dist(food)
{% endhighlight %}
**.moveTowards(x, y, speed, dt)**
*Move game object to a given coordinate at a given speed.* 

Example:
{% highlight python  %}
    def update(dt):
        cat.moveTowards(food.pos_x, food.pos_y, 20, dt)
        pass
{% endhighlight %}

**.bound(xmin, xmax, ymin, ymax)**
**.bound_x(xmin, xmax)**
**.bound_y(ymin, ymax)**
*Set movement boundaries of game object. Game objects will not move past these boundaries.*

## Sprite-related gameObj members
The following game object members are specific to the sprites used in the game object.
These are especially useful for changing sprite properties on the fly. 

**.sprite(ptr_Sprite, flip_duration)**
*Set pointer to sprite to be used. *

Example:
{% highlight python  %}
    if rpy.btnADown():
        cat.sprite(p_cat_attack, 200)
{% endhighlight %}


**.currNdx(ndx)** 
*Set current index of sprite to be used. Pick index frame from animation.*

Example use: Ending off a moving sprite animation to a final static image. 

**.flip(val)**  
*Flip sprite horizontally and/or vertically*

Flip Options:
 - 0 : no flip 
 - 1 : flip sprite horizontally 
 - 2 : flip sprite vertically 
 - 3 : flip sprite both horizontally and vertically

Example use: Changing player walking direction, without needing separate sprites for each direction.
{% highlight python  %}
    if rpy.btnRightDown():
        cat.sprite(p_cat_run,200)
        cat.speed_x = 30
        cat.flip(0) #no flip. cat sprite is already facing right
    if rpy.btnLeftDown():
        cat.sprite(p_cat_run,200)
        cat.speed_x = -30
        cat.flip(1) #flip sprite horizontally. In this case, from right to left
{% endhighlight %}


**.mode(val)** 
*Sprite animation display mode*

Mode Options:
0 : (default) Continuous frame cycle animation
1 : Cycle through animation frames once and disappears (Good for special effects eg. Explosions)
2 : Cycle through animation frames once, stops animation at last frame 


**.flipDuration(msec)**
*Set how long(ms) to show each frame before showing the next frame in the animation (leave as 0 if sprite is static)* 

## Colliders in game objects
Colliders are useful for troubleshooting during the development process of the game, and for checking if the game objects have collided into other game objects like walls/ enemies/ items. Colliders are part of game objects.


**.drawCollider(colour)**  
*Draws a rectangle in a given colour to represent the collider. By default, the collider is the size of the sprite.* 

Example:
{% highlight python linenos %}
    def draw():
        rpy.clear()
        cat.draw()
        cat.drawCollider(3)
        pass
{% endhighlight %}
**.collider(gameObj)**  
*Returns True if the game object collided with another game object. * 

Example:
{% highlight python linenos %}
    def update(dt):
        food.update(dt)
        cat.moveTowards(food.pos_x, food.pos_y, 20, dt)
        if cat.collider(food):
            print("Collide!")
{% endhighlight %}
**.colliderEx(gameObj)**  
*Similar to collider with extra info* 

**.colliderPt(x, y)**  
*Check if a point is inside the gameObj collider* 

**.resizeCollider(x, y, w, h)**  
*Resize the gameObj collider. *
Example use: AOE damage
 
**.collider_xy(gameObj, x, y)**
*Check if gameObj collides with another gameObj at position x,y*

## Drawing Primitives
While drawing primitives is more costly and slower than drawing a sprite, they have their uses. 
retroPy supports the following primitive draw functions.

**.pixel(x, y, color)**
*Draw a pixel at position x, y using a given colour*

**.circle(x, y, radius, color)** 
**.filled_circle(x, y, radius, color)**  
*Draw an outline circle or filled circle given the center-point and radius.*

**.line(x1, y1, x2, y2, color)**
*Draw a line given the starting and ending x,y position*

**.hline(x, y, length, color)** 
**.vline(x, y, length, color)**
*Draw a horizontal/ vertical line given the starting x,y position and length of the line *

**.rect(Rect, color)**
**.filled_rect(Rect, color)**
*Using the Rect class, draw an outline or filled rectangle.*

Rect(x,y,width,length) - Built in class

**.text(string, x, y, color)**
*Write text to screen at position x,y*
By default, retroPy uses a monospace 16x16 font size. Position x,y is the top left starting position.


## Getting User Input

The retroPy game engine natively supports the handheld game console's 8 button inputs.

Obtaining the 2 states of a button press - Down & Up (release) is easy.

Example:
{% highlight python linenos %}
    def update(dt):
        if rpy.btnRightDown():
            cat.sprite(p_cat_run,200)
            cat.speed_x = 30
            cat.flip(0) #no flip. cat sprite is already facing right
        if rpy.btnLeftDown():
            cat.sprite(p_cat_run,200)
            cat.speed_x = -30
            cat.flip(1) #flip sprite horizontally. In this case, from right to left
        if rpy.btnLeftUp() or rpy.btnRightUp():
            cat.sprite(p_cat,200) #set back to idle animation
            cat.speed_x = 0
{% endhighlight %}

**Full list below.**

To get the button **Down** state, check the corresponding buttons in the update loop.

**Directional Buttons:**
{% highlight python  %}
    .btnUpDown()
    .btnDownDown()
    .btnLeftDown()
    .btnRightDown()
{% endhighlight %}
**Action Buttons:**
{% highlight python  %}
    .btnADown()
    .btnBDown()
{% endhighlight %}
**Shoulder Trigger Buttons:**
{% highlight python  %}
    .btnTrigLeftDown()
    .btnTrigRightDown()
{% endhighlight %}

Again, to check if the button is released and back Up, check for the button **Up** state.

**Directional Buttons:**
{% highlight python  %}
    .btnUpUp()
    .btnDownUp()
    .btnLeftUp()
    .btnRightUp()
{% endhighlight %}
**Action Buttons:**
{% highlight python  %}
    .btnAUp()
    .btnBUp()
{% endhighlight %}
**Shoulder Trigger Buttons:**
{% highlight python  %}
    .btnTrigLeftUp()
    .btnTrigRightUp()
{% endhighlight %}


