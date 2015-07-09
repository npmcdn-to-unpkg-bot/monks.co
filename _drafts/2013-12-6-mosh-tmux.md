---

layout: default
title: mosh tmux
tags: 
- rpi
- guide
group: general

---


# mosh; tmux

## install

sudo apt-get install mosh
sudo apt-get install tmux

## start tmux on boot

	sudo cp ~/rpi-setup/src/tmux /etc/init.d/tmux
	sudo chmod 755 /etc/init.d/tmux

test:

	sudo /etc/init.d/tmux start
	tmux attach
	[ctrl-b d]
	sudo /etc/init.d/tmux stop
	tmux attach

that last attach shouldn't work

run at startup:

	sudo update-rc.d tmux defaults

## usage

mosh into raspberrypi:

	mosh pi@raspberrypi.local

attach to tmux session:

	tmux attach

detach when you're done:

	^B d

## tmux extras

*	`^B t` current time

*	`^B "` split horizontal

*	`^B %` split vertical

*	`^B [arrow keys]` navigate between panes

### credit

from [stuffaboutcode](http://www.stuffaboutcode.com/2012/06/raspberry-pi-run-program-at-start-up.html)