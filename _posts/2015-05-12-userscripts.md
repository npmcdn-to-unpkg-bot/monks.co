---
categories:
  - writing
  - howto
layout: default
title:  "User Scripts"
slug:     "userscripts"
year: "2015"
date: 2015-05-12
tagline:    "Intro To User Scripting"
---
{% gist amonks/b68fe6fc0c447719f2a9 0-pftv-skip-interstitial-ads.user.js %}

Above is a browser user script to skip the annoying interstitial ad pages on Project Free TV. The ones where you have to wait 10 seconds before seeing your video.

Below are [installation instructions](#installation), a detailed description of how I wrote it, and an introduction to user scripts in general.

<!--more-->

## Contents

- [Installation](#installation)
    - [Chrome Users](#chrome-users)
    - [Firefox Users](#firefox-users)
    - [Safari Users](#safari-users)
- [What Is This?](#what-is-this)
    - [Backstory](#backstory)
    - [How?](#how)
    - [What are user scripts?](#what-are-user-scripts)
    - [Ok so how do we do this?](#ok-so-how-do-we-do-this)
        - [First we need to find all the links to interstitial pages](#first-we-need-to-find-all-the-links-to-interstitial-pages)
        - [Then we need to run a function on all those links](#then-we-need-to-run-a-function-on-all-those-links)
        - [And we need to write that function](#and-we-need-to-write-that-function)
        - [It should take the old href value, and set a new href value](#it-should-take-the-old-href-value-and-set-a-new-href-value)
        - [And it should be able to figure out the new href value](#and-it-should-be-able-to-figure-out-the-new-href-value)
        - [Now let's put it together.](#now-lets-put-it-together)
        - [We'll have to load it into the browser, though...](#well-have-to-load-it-into-the-browser-though)

<!-- end toc 4 -->

# Installation

## Chrome Users
1. Download and install [Tampermonkey](https://tampermonkey.net/)
2. Click "Raw" next to the script above to install it

## Firefox Users
1. Download and install [Greasemonkey](http://www.greasespot.net/)
2. Follow Greasemonkey's instructions to install the script

## Safari Users
1. Download and install [Tampermonkey](https://tampermonkey.net/)
2. Click "Raw" next to the script above to install it

# What Is This?

## Backstory

Sometimes I like to watch pirated streaming TV. One popular website is [Project - Free TV](http://www.free-tv-video-online.info/). It operates by embedding and linking to video files hosted elsewhere. The videos are often deleted due to copyright violations, so to find a functional link for a TV episode often means going through a sea of broken links. To make money, PFTV places an interstitial advertising page between the list of videos and the video itself. To get through the page, the user must wait 10 seconds while watching an ad.

Since I use adblock anyway, this interstitial page does nobody any good and takes a great deal of time: I open 10 or 15 links at a time, wait 10 seconds, and then go through the tabs one by one and click "SKIP THIS AD". Only then can I go through and try to play each video. It's a pain. But it's also a great opportunity to learn about user scripts. Let's get started.

## How?

Let's say you're trying to watch the first season of Mad Men. Good choice. Here's the [season page](http://www.free-tv-video-online.info/internet/mad_men/season_1.html), which contains links to videos for each episode. Each link points to an [interstitial page](http://www.free-tv-video-online.info/interstitial2.html?lnk=%2Fplayer%2Fnovamov.php%3Fid%3Da4po6y6yswr2s&ttl=Mad+Men+Season+1+Episode+1). The interstitial page then links to a [player page](http://www.free-tv-video-online.info/player/novamov.php?id=a4po6y6yswr2s).

Normally we have to wait for 10 seconds on the interstitial page before we get a link to the player page. We want to be able to get to the player page directly from the season page, skipping the interstitial page entirely.

Let's take a look at those URLs:

* Season page: `http://www.free-tv-video-online.info/internet/mad_men/season_1.html`
* Interstitial page: `http://www.free-tv-video-online.info/interstitial2.html?lnk=%2Fplayer%2Fnovamov.php%3Fid%3Da4po6y6yswr2s&ttl=Mad+Men+Season+1+Episode+1`
* Player page: `http://www.free-tv-video-online.info/player/novamov.php?id=a4po6y6yswr2s`

The URL of the interstitial page has a chunk in it that looks a lot like the URL of the player page! That means we can probably figure out the player page URL just from looking at the links on the season page. Let's take the every link to an interstitial page, and directly replace it with a link to the appropriate player page.

Replacing stuff on a webpage is a great use for user srcipts.

## What are user scripts?

User scripts let you write your own javascript and have it run on particular pages. User scripts started around 2005, when the Greasemonkey extension for Firefox was released. Greasemonkey made it easy to change up websites one visited without having to deal with making a packaged browser extension. It became very popular, and paved the way for powerful browser extensions like Adblock. For whatever reason, user scripting has fallen somewhat out of favor, but it's still a wonderful tool.

## Ok so how do we do this?

First we have to find all the links to interstitial pages. A good way to programmatically find stuff on websites is to use [jQuery](https://jquery.com/). We can check whether PFTV loads jquery already by opening up the javascript console (command-option-j in Chrome) and typing `jQuery`. If it autocompletes (it does) jQuery is loaded (it is). I talk about how to load jQuery (or other scripts) into existing pages over [here](https://github.com/amonks/load-script).

### First we need to find all the links to interstitial pages

We want to find every link that has `interstitial` in it. In HTML, every link is an `<a>` tag. It stands for anchor. Here's an example:

    <a onclick="visited(2187218)" href="/interstitial2.html?lnk=%2Fplayer%2Fmovshare.php%3Fid%3D24b12c34773a9&amp;ttl=Game+of+Thrones+Season+3+Episode+10" target="_blank"> [a bunch of stuff] </a>

The only part of that tag we care about is the `href="url"` part. It tells the browser what url to open when the link is clicked.

To find every link with the word `interstitial` in the `href=` part, we can use a jQuery selector:

```javascript
$("a[href*='interstitial']");
```

### Then we need to run a function on all those links

`$()` looks fancy, but it's a normal function. It's the jQuery function. we could also use `jQuery()`. If you pass jQuery a string (in quotes), it'll be used as a selector. We want `a` tags with a specific `href` attribute. The `*` before the `=` means the `href` doesn't have to *be* `interstitial`, it just has to *include* `interstitial`. This function returns a collection of `a` tags.

jQuery's `map()` takes two arguments: a collection and a function. It goes through each item in the collection, and calls the function with that collection item as an argument.

```javascript
var interstitialLinks = $("a[href*='interstitial']");
$.map( interstitialLinks, linkChangerFunction );
```

### And we need to write that function

We don't have a linkChangerFunction yet, so I guess that's our next step.

linkChangerFunction needs to take an `a` tag as an argument, and change the `href` of that `a` tag from the URL of the interstitial page to the URL of the player page.

```javascript
var linkChangerFunction = function(a) {
  // change the link
}
var interstitialLinks = $("a[href*='interstitial']");
$.map( interstitialLinks, linkChangerFunction );
```

### It should take the old href value, and set a new href value

In jQuery, when we want to change a tag's attribute, we can use the `attr()` function:

```javascript
var linkChangerFunction = function(a) {
  a.attr( 'href', 'new href value' );
}
var interstitialLinks = $("a[href*='interstitial']");
$.map( interstitialLinks, linkChangerFunction );
```

We want to construct a new href value from the old href value. Handily, to get the old href value, we can also use the `attr()` function but without the second argument. Let's log a list of old href values and make sure it's working:

```javascript
var linkChangerFunction = function(a) {
  var oldHrefValue = a.attr( 'href' );
  console.log( oldHrefValue );
}
var interstitialLinks = $("a[href*='interstitial']");
$.map( interstitialLinks, linkChangerFunction );
```

![it doesn't work](https://s3.amazonaws.com/f.cl.ly/items/233r3G2j17091U2c2z2Q/Screen%20Shot%202015-05-10%20at%2011.17.53%20PM.png)

It isn't!

`a` doesn't have an `attr()` function. `a` is an element, but we need to convert it into a jQuery object. It's easy! We just have to feed it into the jQuery `$` function.

```javascript
var linkChangerFunction = function(a) {
  var oldHrefValue = $(a).attr( 'href' );
  console.log( oldHrefValue );
}
var interstitialLinks = $("a[href*='interstitial']");
$.map( interstitialLinks, linkChangerFunction );
```

Now it works. We get a huge list of href attributes logged to the console.

### And it should be able to figure out the new href value

Our old href value is something like this:

`/interstitial2.html?lnk=%2Fplayer%2Fnovamov.php%3Fid%3Da4po6y6yswr2s&ttl=Mad+Men+Season+1+Episode+1`

Those `%`s are a good indicator that we're dealing with something URI encoded. If we run it through  `decodeURIComponent( )`, we'll get something like this:

`/interstitial2.html?lnk=/player/novamov.php?id=a4po6y6yswr2s&ttl=Mad+Men+Season+1+Episode+1`

And remember, our goal is something like this:

`/player/novamov.php?id=a4po6y6yswr2s`

All we have to do is remove the `/interstitial2.html?lnk=` part!

There are a bunch of good ways to do that. Since the part we're removing doesn't change, it's always exactly 24 characters long and we can use the `slice()` function. We want to keep from after the 24th character through the very last.

Putting the slice and the decodeURIComponent together, we get the following:

```javascript
var newHrefValue = decodeURIComponent(oldHrefValue).slice(24, -1);
```

### Now let's put it together.

Combining everything we have so far, here's our complete script:

```javascript
var linkChangerFunction = function(a) {
  var oldHrefValue = $(a).attr( 'href' );
  var newHrefValue = decodeURIComponent(oldHrefValue).slice(24, -1);
  $(a).attr( 'href', newHrefValue );
}
var interstitialLinks = $("a[href*='interstitial']");
$.map( interstitialLinks, linkChangerFunction );
```

Since we're only using `interstitialLinks` and `linkChangerFunction` once each, we can stick them right into `$.map()` instead of defining them separately. We get this:

```javascript
$.map( $("a[href*='interstitial']"), function(a) {
  var oldHrefValue = $(a).attr( 'href' );
  var newHrefValue = decodeURIComponent(oldHrefValue).slice(24, -1);
  $(a).attr( 'href', newHrefValue );
} );
```

We can do the same with `oldHrefValue` and `newHrefValue`:

```javascript
$.map( $("a[href*='interstitial']"), function(a) {
  $(a).attr( 'href', decodeURIComponent( $(a).attr( 'href' ) ).slice(24, -1); );
} );
```

### We'll have to load it into the browser, though...

User Scripts have a standard header with a bit of information about the script:

```javascript
// ==UserScript==
// @name         Skip Interstitial Ad Pages on Project Free TV
// @namespace    https://gist.github.com/amonks/b68fe6fc0c447719f2a9
// @version      1.0
// @description  Skip the annoying interstitial wait-10-seconds ad page when watching pirated videos on Project Free TV
// @author       Andrew Monks
// @match        http://www.free-tv-video-online.info/internet/*
// @grant        none
// ==/UserScript==

$.map( $("a[href*='interstitial']"), function(a) {
  $(a).attr( 'href', decodeURIComponent( $(a).attr( 'href' ) ).slice(24, -1); );
} );
```

That's our final, complete script.

`@namespace` is the script's homepage. `@match` tells the browser which pages should load the script. We'd need `@grant` if we wanted to access any special Greasemonkey APIs, for example to manipulate the user's clipboard.

If the script is saved as `something.user.js` and the user has Greasemonkey, Tampermonkey, or an old version of Chrome, it'll automatically prompt a user to install our script when they click any link to it.
