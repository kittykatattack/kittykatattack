"Ga" game engine [interesting]
----------------------------------------------------

### A minimalist game engine for everyone

*"Ga!"*
*- A baby's exclamation of surprise.*

Ga is a minimalist game engine for making HTML5 games or any other
kind interactive media. 

[Ga game enigne](https://github.com/kittykatattack/ga)

Its design was inspired by the [js13k game
competition](http://js13kgames.com) where contestants are required to make a
game with a total file of size no more than 13k. 

How can you make a game with such a small file size?

It's a useful to use a game engine, because starting any game first
requires writing a lot of tedious boilerplate code. You don't' want to
have to re-write all that stuff for every game you make. But most full-featured HTML5
game engines, even small and fast ones like
[Phaser](https://github.com/photonstorm/phaser), are still at least 1
Megabyte-ish in size. The goal for Ga was to design a full-featured,
fun-to-use 2D game engine with a
compressed file size of no more than 6.5k. 

6.5k?

Yes, it can be done!

Take a look at the feature list and the `examples` folder to get started. 

### Features

Here's Ga's full feature list:

- All the most important sprites you need: rectangles, circles, lines,
  text, image sprites and animated "MovieClip" style sprites. You can make any of these
  sprites with one only line of code. You can also create your own custom sprite
  types.
- A complete scene graph with nested child-parent hierarchies (including
  a `stage`, and `addChild`/`removeChild` methods), local and global coordinates, and depth layers.
- `group` sprites together to make game scenes. 
- A game loop with a user-definable `fps` and fully customizable and
  drop-dead-simple game state manager. `pause` and `resume` the game
  loop at any time.
- Tileset (spritesheet) support using `frame` and `filmstrip` methods to make
  sprites using tileset frames.
- Built-in texture atlas support for the popular Texture Packer format.
- A keyframe animation and state manager for sprites. Use `show` to
  display a sprite's image state. Use `play` or `playSequence` to play
  a sequence of frames (in a `loop` if you want to). Use
  `gotoAndStop` to go to a specific frame number. Use `fps` to set the
  frame rate for sprite animations which is independent from the game's
  frame rate.
- Interactive `button` sprites with `up`, `over` and `down` states.
- Any sprite can be set as `interactive` to receive mouse and touch
  actions.
  Intuitive `press` and `release` methods for buttons and interactive
  sprites.
- Easy-to-use keyboard key bindings. The arrow and space keys are
  built-in, and you can easily define your own with the `keyboard`
  method.
- A built-in universal `pointer` that works with both the mouse and
  touch. Define as many pointers as you need for multi-touch.
- Import and play sounds using a built-in WebAudio API sound manager.
  Control sounds with `play`, `pause`, `stop`, `restart`, and
  `playFrom` methods. Change a sound's `volume` and `pan`.
- Useful built-in tweening functions like `slide`, `fadeIn` and `fadeOut`.
- A handful of useful convenience functions: `ease`, `follow`,
  `angle`, `distance`, `rotateAround`, `rotatePoint`, `wait`, `random` and `contain`. Position
  sprites relative to other sprites using `put`.
- A universal asset loader to pre-load images, fonts, sounds and JSON
  data files. All popular file formats are supported. You can load new assets into the game at
  any time.
- An optional `load` state that lets you run actions while assets are
  loading. You can use the `load` state to add a loading progress bar.
- A fast and focused canvas-based rendering engine.
- A plugins.js file full of extra features. Just copy/paste the code you
  want to use into your game. Or, if you're not worried about the
  extra size, just link the whole thing; it's pretty tiny anyway.
- A compact and expressive "Haiku" style API. Achieve powerful
  results with minimal code.
- Yes, Ga is mobile friendly!
- Yes, the core `ga.js` engine is less than 6k minified and zipped!
  It's all you need to start making any any 2D action, puzzle or
  strategy game. 

And the coolest part? If you were alone on a desert island with only
a saltwater powered laptop, an unlimited supply of
coconuts, and a copy of `ga.js` you could recreate the entire history of 2D video games,
from Spacewar! to Flappy Bird.

