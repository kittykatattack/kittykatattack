Custom event dispatcher for JavaScript [interesting]
----------------------------------------------------

### Observing object properties

It's often very useful to obseve property changes in objects in JavaScript. In a game, you might want to have something happen when an object's state changes. For example, maybe the witch's state has changed from sleeping to awake. Other objects in the game might need to know about this. Being able to observe when the witch's "sleeping" property changes from true to false could be extremely useful.

If you've used Flash/AS3.0 and wondered how to use its discpatchEvent method in JavaScript, this article will show you how. Or, if you're buiding a classical MVC system in JavaScript and need a property observer, these techniques will work just as well. 

*(Are you building an MVC system for JavaScript? You don't need to. JavaScript has basic some built-in features that render a classical MVC obsolete - see below!)*

There are two different ways to observe property changes in JavaScript. The most interesting way is to tell objects to inform the main program that one of their properties has changed using a callback function. The less exciting (but better) way is to check for property changes inside a requestAnimationFrame loop. Let's look at the interesting way first.

### The observe and unobserve functions

First, here are two important functions that you'll nee to use: observe() and unobserve(). They use JavaScript's little-known but extremely powerful [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) function.

<pre class="prettyprint">
//1. observe
//A function to modify an object property's getters and 
//setters so that a custom callback handler can be run in the main
//program each time the property is changed

function observe(subject, property, callbackHandler) {
  Object.defineProperty(subject, property, {
    //Return the default value of the property
    //("value" automatically gives you the property's current value)
    get: function () {
      return value;
    },

    //Set the property with a new value
    set: function (newValue) {
      //Assign the new value
      value = newValue;

      //Bind the observer's changeHandler to the subject
      subject.changeHandler = callbackHandler;

      //Tell the subject to call the changeHandler when this
      //property is changed. (This is like a custom event dispatcher)
      subject.changeHandler(subject, property);
    },

    //Set the default parameters for how this property can be 
    //accessed and changed.You probably don't need to change these
    //unless you want to lock down the property values to prevent your 
    //program from changing them
    enumerable: true,
    configurable: true,
    writeable: true
  });
}

//2. unobserve
//An optional function to stop watching properties.
//It normalizes the getter and setter and removes the callback handler

function unobserve(subject, property) {
  //Delete the changeHandler
  delete subject.changeHandler;

  //Reset the getter and setter
  Object.defineProperty(subject, property, {
    get: function () {
      return value;
    },
    set: function (newValue) {
      value = newValue;
    },
    enumerable: true,
    configurable: true,
    writeable: true
  });
}
</pre>

Here's how to use these functions:

1. Create a an object with a few properties. This is the "subject" that you're going to observe.

<pre class="prettyprint">
var testSubject = {
  x: 1,
  y: 56,
  name: "",
};
</pre>

2. Start observing the testSubject's "x" property with the observe function The observe function uses 3 arguments:
a) the object, 
b) the property you want to observe (as a string),
c) the callback handler, bound to "this object".

<pre class="prettyprint">
observe(testSubject, "x", callbackHandler.bind(this));
</pre>

3. create the "callbackHandler" function that reacts to this change.

<pre class="prettyprint">
function callbackHandler(subject, property) {
  //Find out if a subject changed any of its properties
  if (subject === testSubject) {
    console.log("A property changed on testSubject");

    //Do something if a specific property you're observing changes
    if (property === "y") {
      console.log("Its y property changed");
    }
  }
}
</pre>

To stop observing property changes, you can use the optional unobserve function.

<pre class="prettyprint">
unobserve(subjectOne, "x");
</pre>

[Here's a JSFiddle example of all this code in action.](http://jsfiddle.net/d131/mPPU3/)

### Listening for changes in DOM elements

You can use these functions to listen for changes in DOM elements. Here's how:

1. Create a DOM element.

<pre class="prettyprint">

&lt;p id=&quot;text&quot;&gt;Any text you like&lt;/p&gt;

</pre>

2. Get a reference to the DOM element

<pre class="prettyprint">
var text = document.querySelector("#text");
</pre>

3. Create a data object to store DOM values.

<pre class="prettyprint">
var data = {
  text: undefined,
  initialize: function(config) {
    this.text = config.text;
  }
};
</pre>

4. Load the text into the data object.

<pre class="prettyprint">
data.initialize({
  text: text.innerHTML
});
</pre>

Start observing the text property on the data object. Arguments: the object you want to observe, the property as a string, and the name of the callback handler, bound to this scope.

<pre class="prettyprint">
observe(data, "text", callbackHandler.bind(this));
</pre>

6. Create a callback handler to do something interesting when the property changes

<pre class="prettyprint">
function callbackHandler(subject, property) {
  if (subject === data && property === "text") {
    //Notify the console that the property has been changed
    console.log("data." + property + ": " + subject[property]);

    //Update the DOM element with the new value
    text.innerHTML = subject[property];
  }
}
</pre>

To test this, change the text value in the data object. The DOM will refresh automatically.

<pre class="prettyprint">
data.text = "The DOM text has been changed"
</pre>

[Check out this JSFiddle to see it all in action.](http://jsfiddle.net/d131/SXQXg/)


### Should you do this?

Maybe not! Property observers like this make sense in programming languages that aren't aware of the passage of time. If you were building an MVC system in C++ for example, you'd need something like what I've shown above. JavaScript is different: it's event-driven. That means it can wait for things to happen, like mouse clicks, and change the way the program runs when they do. That's fundamental to the way JavaScript is designed. 

JavaScript handles time extremely effciently with [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame). Here's how to use it to easily create an object property observer.

1. Create two DOM elements, an input and output

<pre class="prettyprint">

&lt;input type=&quot;text&quot; value=&quot;Enter some text...&quot;&gt;
&lt;p id=&quot;output&quot;&gt;

</pre>

2. Set up a requestAnimationFrame loop and start observing.

<pre class="prettyprint">
//Get a reference to the input and output
var input = document.querySelector("input");
var output = document.querySelector("#output");

//Set up a requestAnimationFrame loop
function update () {
  window.requestAnimationFrame(update);
  
  //Change the output to match the input
  output.innerHTML = input.value;
}
update();
</pre>

That's all!

(If you need it, here's a simple requestAnimationPolyfill)

<pre class="prettyprint">
//Polyfill for requestAnimationFrame
window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();
</pre>

[See this code in action here.](http://jsfiddle.net/d131/FXXDb/1/)

### Why this is the best way

requestAnimationFrame uses system resources extremely efficiently, and also has the benefit of synchronizing all the observations into one update cycle. That's really important if you are watching properties on more than one object. Why? Because a property change in one object, might affect a property change in another object. If you check them all in the same cycle, you can control the order in which these changes affect the rest of the code or other objects. That's critical for ensuring that all object properties reflect the most current state of the application.

### The source code

[You can find all this code on GitHub.](https://github.com/kittykatattack/propertyObserver)