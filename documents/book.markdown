Kittykatattack!
===============

The Foundation and AdvancED series [books]
------------------------------------------

The best-selling Foundation and AdvancED series of books show you everything you need to know about how to make video games.
Which book should you get? If you're new to the world of video game design, start with _Foundation Game Design with HTML5 and JavaScript_. You can follow that with the forthcoming _AdvancED Game Design with HTML5 and JavaScript_, which will be available in the middle of 2014. 
If you want to make games using Flash/AS3.0, start with _Foundation Game Design with AS3.0_ and follow it with _AdvancED Game Design with Flash_.

### Foundation Game Design with HTML5 and JavaScript
[![](images/gameDesignHTML5.jpg)](http://www.apress.com/programming/javascript/9781430247166)

Foundation Game Design with HTML5 and JavaScript_teaches you everything you need to know about how to make video games. If you’ve never done any programming before and don’t know where to start, this book will show you how to make games from start to finish. You’ll learn all the latest programming technologies (HTML5, CSS, and JavaScript) to create your games. All written in a fun and friendly style with open-ended projects that encourage you to build your own original games.

Foundation Game Design with HTML5 and JavaScript_starts by showing you how you can use basic programing to create logic games, adventure games, and create interactive game graphics. Design a game character, learn to control it with the keyboard, mouse, or touch screen interface, and then learn how to use collision detection to build an interactive game world. You’ll learn to make maze games, platform jumping games, and fast paced action games that cover all the popular genres of 2D gaming. Create intelligent enemies, use realistic physics, sound effects and music, and learn how to animate game characters. Whether you're creating games for the web or mobile devices, everything you need to get started on a career as a game designer is right here.

* [Read More...](http://www.apress.com/programming/javascript/9781430247166)
* [Buy at Amazon](http://www.amazon.com/gp/product/1430247169/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1430247169&linkCode=as2&tag=kittykatattac-20)

### Foundation Game Design with ActionScript 3.0

[![](images/foundationActionScript.jpg)](http://www.apress.com/9781430239932)

In response to the success of the first edition of _Foundation Game Design with Flash_, Rex van der Spuy has revised and updated all the code to meet current programming best practices, and the focus is now on accurate ActionScript 3.0, regardless of the IDE that you use. 

We’ve all sneaked the odd five minutes here or there playing the latest Flash game that someone sent around the office, but creating those games is trickier than it looks. The aim of _Foundation Game Design with ActionScript 3.0_ is to take you, even if you’ve minimal multimedia or programming experience, through a series of step-by-step examples and detailed case studies—to the point where you'll have the skills to independently design any conceivable 2D game using Flash and ActionScript. 

Foundation Game Design with ActionScript 3.0 is a non-technical one-stop shop for all the most important skills and techniques a beginning game designer needs to build games with Flash from scratch. Whether you're creating quick blasts of viral amusement, or more in-depth action or adventure titles, this is the book for you. 

* [Read More...](http://www.apress.com/9781430239932)
* [Buy at Amazon](http://www.amazon.com/gp/product/143023993X/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=kittykatattac-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=143023993X)

### Advanced Game Design with Flash

[![](images/advancedGameDesign.jpg)](http://www.apress.com/9781430227397)

Creating games in Flash is a never-ending journey of exploration, learning, and most of all, fun. Once you’ve mastered the basics, a new world is opened up to you, enabling you to take your existing skills to the next level and discover new skills that will in turn open new doors. This book is a direct continuation of _Foundation Game Design with Flash_, and is a complete point-by-point roundup of the most important skills a Flash game designer needs to know. You’ll increase your ActionScript knowledge and your game design skills while creating some excellent example games. You’ll learn advanced collision detection skills; professional AI and pathfinding; and how to load and save game data, create destructible environments, and build and switch game levels. 

* [Read More...](http://www.apress.com/9781430227397)
* [Buy at Amazon](http://www.amazon.com/gp/product/1430227397?ie=UTF8&tag=kittykatattac-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1430227397)
* [Find the source code here](http://www.apress.com/9781430227397)

### Foundation Game Design with Flash

[![](images/foundationGameDesign.jpg)](http://www.apress.com/9781430218210)

This is a first-edition, which has now been replaced by the much more up-to-date _Foundation Game Design with ActionScript 3.0_. Get that book instead. However, if you're using Adobe Flash Professional as your primary tool to make games, especially CS3 and CS4, you might still find this book useful.

* [Read More...](http://www.apress.com/9781430218210)
* [Buy at Amazon](http://www.amazon.com/gp/product/1430218215?ie=UTF8&tag=kittykatattac-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1430218215)
* [Source code, CS4](http://www.kittykatattack.com/source/978-1-4302-1821-0.zip)
* [Source code, CS3](http://www.kittykatattack.com/source/978-1-4302-1821-0-CS3version.zip)


A better A-Star for AS3.0 [interesting]
---------------------------------------

Thanks to reader Zhan for this improvement to the A`*` algorithm in Advanced Game Design with Flash. He found some maps where the A* algorithm doesn't skip diagonal paths around corners as expected. Here's the code from the book on page 685 that routes the path around corners:

<pre class="prettyprint">
if(nodeMap[testRow][testColumn].id != centerNode.id
&& map[testRow][testColumn] != wall
&& map[testRow][centerNode.column] != wall
&& map[centerNode.row][testColumn] != wall)
{
</pre>

He made this change to the code:

<pre class="prettyprint">
for(var column:int = -1; column < 2; column++)
{
  for(var row:int = -1; row < 2; row++)
  {
    if (Math.Abs(col) + Math.Abs(row) == 2)
    {
      continue;
    }
</pre>

It now seems to work for all map types. Thanks Zhan!

Gallery [games]
---------------

### The game engine gallery

If you've read the Foundation and AdvancED series of books about how to make video games, you'll recognize many of these examples. Those books explain how to make all of these demos in detail, as well as dozens of other games. These aren't fully developed games; they're _game engines_. A game engine is a complete working model of all the technical features you need to create a complete game using that model. With a working game engine, there's no limit to the kinds of games you can make. 

Most of these demos will require the latest versions of [Chrome](http://www.google.com/chrome), [Safari](http://www.apple.com/safari), or [Firefox](http://www.mozilla.org/en-US/firefox/new/) and the [Flash Player](http://www.adobe.com/support/flashplayer/downloads.html).

They were all coded from scratch in pure JavaScript or AS3.0. All the code is open source, completely free to use for anything, and created to be learned from.

### Angry cat

[![](images/kittykatattack.jpg)](http://www.kittykatattack.com/gallery/kittykatattack/kittykatattack.html)

Physics-based platform game engine. Why it's cool: Box2D physics with canvas!

### Monster Mayhem

[![](images/monsterMayhem.jpg)](gallery/monsterMayhem/src/monsterMayhem.html)

2 level tile-based scrolling maze game engine with interactive AI. Collect all the stars without being eaten. Why its cool: because you can use this engine to make any sized game world, with any number of levels. It's the foundation for making your own RPG action game. 

### Hedgehog Apocalypse

[![](images/hedgehogApocalypse.jpg)](gallery/hedgehogApocalypse/src/hedgehogApocalypse.html)

Tile-based platform game engine. Why it's cool: Fast, minimal code using a super-optimized physics engine. This game engine can be extended to make a game world of any size with dozens of envirionments, enemies, puzzles and objectives.

### Killer Bee Pandemonium

[![](images/killerBee.jpg)](gallery/killerBeePandemonium/src/killerBeeMouse.html)

360 shooter. Why it's cool: A highly optimized action game running in canvas demonstrating sprite rotation.

### Monster Smash

[![](images/monsterSmash.jpg)](gallery/monsterSmash/src/monsterSmashFinished.html)

How many monsters can you smash in 30 seconds? Why it's cool: It demonstrates how to use HTML5 sprites in combination with canvas animation to create a simple point-and-click action game.	

### Escape

[![](images/escape.jpg)](gallery/escape.html)

Escape from the underground cave to the planet surface and shoot down the mothership to win. Why it's cool: It features a custom bitmap collision system and algorithmic music track. Requires the latest Flash player

### The Forest of Lyrica

[![](images/lyrica.jpg)](gallery/lyrica.html)

A text-based adventure game engine. Why it's cool: It's a model for creating a complex puzzle solving and exploration game. This basic engine can easily be extended to create a huge interactive world. The code is based on forgotten, beautifully efficient classic adventure game programming techniques developed in the 1960s and 70's.

### Alien Armada

[![](images/alienArmada.jpg)](gallery/alienArmada/src/alienArmada.html)

Simple demo of custom canvas-based sprite engine. Why it's cool: A bare-bones example of canvas-based sprites using tilesheets, collision detection, and HTML5 audio. It's a model of the simplest complete action game you can build in HTML5 and JavaScript.

### Driving game

[![](images/drivingGame.jpg)](gallery/drivingGame.html)

Tile-based driving game engine featuring interactive AI. Why it's cool: It shows how you can use an extremely simple _influence map_ to create the very sophisticated AI behavior.

### Rock blaster

[![](images/rockBlaster.jpg)](gallery/rockBlaster.html)

Destructible environment engine. Why it's cool: Play it and find out ;)	

### Polygon environment

[![](images/polygon.jpg)](gallery/polygon.html)

Optimized SAT (Separating Axis Theory) collision engine for games. Why it's cool: Because it uses a tiny, super-optmized physics engine written from scratch which is only a few hundred lines of code. It shows what you can do with a bit of simple vector math and an understanding of basic geometry.

Getting help [what?]
---------------------------

If you're looking for help or information about HTML5 games, the best
place to go is:

* [HTML5 Game Devs](http://www.html5gamedevs.com)

Visit the [Coding and Game Desing
2D](http://www.html5gamedevs.com/forum/3-2d/) forum for general help with
HTML5 games.

If you have any specific questions about any of [the code in the books](#thefoundationandadvancedseries), or want help with your own game projects, go here:

<http://gamedev.stackexchange.com/>

Create an account, post a question, and use any of these combinations of *tags* to make sure the right people see it:

* If your interest is HTML5/JavaScript games, use these tags:

*html5, javascript*

* If you're into Flash/AS3.0 games, use these tags:

*flash, actionscript-3*

When you're asking questions, add as much detail as you need so that you can get help from people who may not necessarily have read the books.

If you're looking for general help about programming, not just games, try Stackoverflow:

<http://stackoverflow.com/>

If you want stay in touch with new developments in these fields, and see what other people with similar interests to you are talking about, visit these gamedev.stackexchange links:

* [New HTML5/JavaScript game design questions](http://gamedev.stackexchange.com/questions/tagged/html5+javascript)
* [New Flash/AS3.0 game design questions](http://gamedev.stackexchange.com/questions/tagged/flash+actionscript-3)

Bookmark these links, and I'll see you there!

kittykatawhat? [what?]
---------------------------

Kittykatattack.com is an information and learning website for people who love to make videogames. However, most of the information in this website... is not in this website.

[It's in these books](#thefoundationandadvancedseries). 

Read them, and make wonderful games!

Why does kittykatattack.com not look like other websites? That's because it's based on new ideas about *[website design minimalism](http://kittykatattack.github.io/thepoetrybook)*. How much stuff can you take out of a website and still have a website? How little technology can you use? The entire website is generated from easy-to-write markdown documents and uses JavaScript to magically self-organize the content.

Kittykatattack.com is completely free, entirely non-commercial, open for anyone to learn from, and made with love.

*"Those who have learned to walk on the threshold of the unknown
worlds ... may then with the fair while wings of Imagination hope to
soar futher into the unexplored amidst which we live."*
- Ada Byron, the world's computer programmer, from an essay she wrote
  in 1841.


<a class="googlePlusLink" rel="author" href="https://plus.google.com/u/0/117683289179923128627?rel=author">GooglePlus</a>
