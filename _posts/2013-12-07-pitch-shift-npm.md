---

title: Using pitch-shift.js ++ what's NPM?
github: https://github.com/amonks/pitch-shift-installation
categories:
  - howto
  - writing
  - javascript
year: 2013
---
The problem with pitch-shift is the examples. The super-bare-bones minimal example they provide doesn't actually play any audio, so it's hard to tell if it works.

The online demo requires 2 packages that aren't required by pitch-shift itself, so if you try to run its `index.html` locally without installing those first, it throws hella errors.

Here I'll take you through both install processes: how to install the non-functional super-bare-bones minimal pitch-shift example, and how to install the working demo. Here goes.

<!--more-->

## browserify

First you'll need browserify, node normally installs packages into the working directory (so that each project / library / whathaveyou can have its own version of each dependency without causing conflicts, which is awesome). Use the `-g` flag to install browserify globally, since it's a command-line tool rather than a project dependency.

	sudo npm install browserify -g

## minimal pitch-shift install

### files (`minimal/`):

`./app.js` (from the Pitch-shift readme):

```js
//Create a pitch shifting object
var shifter = require("pitch-shift")(
  function onData(frame) {
    //Play / write out frame.  Called whenver data is ready
  },
  function onTune(t, pitch) {

    console.log("Got pitch ", pitch, " at time ", t)

    //This is the amount to scale the sample by
    return 1.0
  })

//Feed some data to the shifter
shifter(new Float32Array([1, 1, 0, 1, 0, 0, 0 /* ... etc */ ]))
```

`./index.html`:

```html
<!DOCTYPE html>
<html>
<head>
	<title>pitch-shift demo</title>
</head>
<body>
	<script src="bundle.js"></script>
</body>
</html>
```


### install pitch-shift itself:

```bash
cd ./minimal
npm install pitch-shift
browserify ./app.js -o ./bundle.js
```

### Done!

Pitch-shift is now installed into `./minimal`. If you open up `index.html` you'll notice that it doesn't actually do anything.

## functional demo install

That wasn't very useful, let's try to run the [demo](http://mikolalysenko.github.io/pitch-shift/).

### files (`demo/`)

[`./index.js`](https://github.com/mikolalysenko/pitch-shift/blob/master/example/index.js)

[`./index.html, ./gettysburg.mp3, ./guitar_c.mp3`](https://github.com/mikolalysenko/pitch-shift/blob/master/example/www)

### install pitch-shift + app dependencies

our `./index.js` file two dependencies of its own that are *not* required by pitch-shift itself. We'll need to install these manually.

```bash
cd ./demo
npm install pitch-shift
npm install typedarray-pool
npm install domready
```

### Done!

You're done! Note: if you try to open up `file:///.../demo/index.html` in your browser, you'll get a cross-origin request error because your computer isn't serving the mp3s properly.

You'll have to move `demo/` do a webserver of some kind to get it to run. I'm on OSX, so I like to use OSX's built-in apache server. If you've never used it, you can turn it on by running `sudo apachectl start`, and then it'll automatically serve anything in `/Library/WebServer/Documents` at `http://localhost`.

## but why?

### Why npm?

npm is becoming the de-facto javascript package/dependency manager, for both server-and-client applications, so it's pretty useful to pick up.

It's a bit different from apt-like package managers you may have used, in that it installs everything *into the working directory* rather than globally. If you install a package with a dependency, it installs the package into ./node_modules/package, and the dependency into ./node_modules/package/node_modules/dependency.

This is super rad if you've ever been to dependency hell: need two libraries that depend on two different versions of the same package? Great! Want to run an old project with a library for which the API has changed? Who cares!

### why browserify?

If you're using npm with a node.js server, all you need to do is make a `packages.json` file that declares what your project depends on, and node automatically makes sure all the proper javascript files get combined into one and served with your application.

If you *aren't* using a node.js server, you can still benefit from npm, you just need to compile all those dependencies manually.

Thus, Browserify. Declare npm package dependencies within your javascript file using require syntax: `require("npm-package-that-i-want")`. If you then run `browserify ./app.js -o ./bundle.js`, it'll take `./app.js`, `npm-package-that-i-want`, and anything else you've `required`, and paste them all into your `./bundle.js` output file. You can now load all your javascript with a single request. If this excites you, check out `npm-css` also. It does the same thing but with .css files.

protip: run browserify with a `-w` flag to make it watch your `app.js` file for changes and automatically generate as-needed. If *this* excites you, look into `grunt`. It's a build manager targetted for websites: you tell it your build operations, and it runs them when you run `grunt`. Very customizably.

## more resources:

[browserify tutorial](http://engineering.yp.com/post/browserify)

[npm on the client-side tutorial](http://dontkry.com/posts/code/using-npm-on-the-client-side.html)
