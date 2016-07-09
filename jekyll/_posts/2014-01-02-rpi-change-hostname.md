---

title: Change hostname on RaspberryPi
categories:
  - howto
  - linux
year: 2014
---
If you have more than one Pi, and they all try to identify themselves on the network as raspberrypi.local, shit will get weird.

Fortunately, there are two ways to change the hostname.

## Easy way

My version of raspi-setup doesn't seem to support hostname changing, but I'm told this should work.

	raspi-setup

<!--more-->

## Hard(er) way

Edit the last line of `/etc/hosts`, replacing `raspberrypi` with whatever you'd like.

Edit `/etc/hostname`, replacing `raspberrypi` with whatever you'd like.

Run `sudo /etc/init.d/hostname.sh`

(it'll work when you next reboot)
