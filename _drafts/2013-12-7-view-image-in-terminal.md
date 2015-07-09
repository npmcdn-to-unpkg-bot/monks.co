---

layout: default
title: view images inside a terminal
tags: 
- rpi
- guide
group: general

---


# view images inside a terminal

I often use my pi over ssh (or really [mosh](/mosh-tmux)). Sometimes I want to view an image on the pi, but I don't want to mess with an x server or anything fancy. 

I use caca-utils for this; it converts images into ascii-art and renders them directly into the terminal

## install

	sudo apt-get install caca-utils

## usage

	cacaview image.png

## controls

*	*+* Zoom in

*	*-* Zoom out

*	*d* Change differ

*	*hjkl*: Move

### credit

from [mark's space](http://marks-space.com/2012/12/03/view-images-as-ascii-in-the-terminal-on-a-raspberry-pi/)