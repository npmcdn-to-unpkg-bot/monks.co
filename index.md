---
layout: index
title: Andrew Monks
shorten: true
---

## Hi! I'm Andrew Monks.

I make arts, websites and computer programs, build communities, and sometimes VJ.

{% include contact.html %}

* * *

Here are some of my favorite things I've done:

* [Belgian Man Records](/belgian-man/), an experimental record label
* [sellf.org](/sellf/), a parafictional company about online personal data
* [Where At?](/where-at/), a tool for drawing on Google Maps and sharing them
* [Line Describing The Body](/fog/), a piece of interactive Light+Space art
* [Love](/love/), an augmented reality hands-free game
* [Lyric Generator](/lyrics/), a markov-chain generator inspired by Lil B

* * *

There are many other works on this website, I try to keep it up to date. You see [a huge list of everything](/everything/), or use these links to filter by medium:

<ul class="fa-ul">
  {% include category-links.html %}
</ul>

* * *

Here are some projects I'm working on right now:

#### Subway Game

I'm making a multiplayer 90s-style text game (`you're in a dark room, Andrew is here`, `go east`, `say hi to Andrew`, `look around`) to deployed to a guerrilla mesh wifi network on the subway. The game will automatically pop up on people's phones and hopefully some % will play.

I'd like to create a social (if potentially a bit intrusive) experience from the antisocial reality of the commute. It's a lot easier to type `say hello` than to actually say "hello" to a stranger on a train.  Basically a chatroom, but I think styling it as a text adventure gives the whole project a kind of friendly-nostalgic vibe, and gives people a reason to stick around and explore until somebody else connects.

#### Livecoding Web Remix Browser System

I'm working on a multipurpose in-browser livecoding system for remixing the Web.

*Imagine:*

You make a Facebook-style popup, and throw a Google map in it. You make an oscillator, and pipe its output into the longitude and latitude of the Google map. Then you pipe the oscillator into the x and y position of the popup. Etc.

I've been working on various iterations of this for a while, but I haven't been satisfied with any. The current iteration uses the [Redux](https://www.npmjs.com/package/redux) (kinda like Flux) architecture, and the modules are React components. I like where it's headed.
