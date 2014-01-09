Story Maker [interesting]
----------------------------------------------------

### A story making machine

Here's a fun little interactive toy for making random stories from a template:

<http://kittykatattack.github.io/storymaker/>

The actual storyMaker.js file that does all this is actually quite simple, and you can find it here:

<https://github.com/kittykatattack/storymaker>

If you want to use it in your own projects, here' how:

Start with a story template, that could look like this:

<pre class="prettyprint">
template = "[hero] lived in a [place] and was a [prince of the realm, lonely wanderer, skilled magician]. One day he came across [a venomous toad, an evil fairy, a suspicious old crone] and immediately [reached for his sword, fell asleep, wondered what would happen next]. But in the next instant, [hero] felt [a drop of rain, strangely quesy, a small hand tugging at his sleeve] and realized [how bad the situation really was, that he was dreaming, that he had been followed by a dwarf].";
</pre>

Any single words in square brackets are your *story keys*. Any phrases seperated by commas inside square brackets are your *story options*.

Use the `story.make` method to make your story from the template. 

<pre class="prettyprint">
var newStory = story.make({
    template: template,
    keys: {
      hero: "Gilfroblom",
      place: "palace in the clouds"
    },
    optionNumber: 1,
    gender: "male"
  });
</pre>

Here's the result of the above code:

<pre class="prettyprint">
Gilfroblom lived in a palace in the clouds and was a prince of the realm. One day he came across a venomous toad and immediately reached for his sword. But in the next instant, Gilfroblom felt a drop of rain and realized how bad the situation really was.
</pre>

Changing the `keys` and the `optionNumber` will give you a different story. 

The `keys` determine how the story keys should be interpreted. Each key name should match the same key in the story. The value should be whatever you want to use for that key. For example `hero: "Gilfroblom"` will replace `[hero]` with the word `Gilfroblom` when the story is created.

`optionNumber` lets you choose which of the story options should be chosen. For example, if your `optionNumber` is `2`, "an evil fairy" will be chosen from the story options below:

<pre class="prettyprint">
[a venomous toad, an evil fairy, a suspicious old crone]
</pre>

If you set `optionNumber` to `undefined` the story maker will choose a random story option (which is a lot of fun to read!)

`gender` is optional, but can be "male" or "female". It sets the story pronouns: "she", "her" or "he" "him". If you leave this out or set it to `undefined` gender pronouns won't be changed.

The [little interactice toy](http://kittykatattack.github.io/storymaker/) was really just a test to see if it worked - it does! But how could it be used? 

Here's an idea. You could create AI game characters that inhabit a huge world. Each AI character has its own *story template*. It can collect *story keys* and *story options* as it wanders around the world. If it meets other AI characters, those characters could share templates, keys and options. They could combine their story elements to create new ones, and end up with rich, unexpected and complex stories about their lives and experiences in that world. 

That might need more than one evening's work... but it's worth a try!