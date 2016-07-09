---

title: Raspberry Pi Setup
categories:
  - howto
  - hardware
year: 2013
---
## image

You need an SD card, the largest one you can find.

Downnload the newest raw raspbian image from http://www.raspberrypi.org/downloads.

use [pi filler](http://ivanx.com/raspberrypi/) to put the image onto the SD card

## boot

plug your pi into ethernet and then power.

If you have a keyboard and display plugged in, it'll prompt you to set a few things. Otherwise, you can connect using:

  	ssh pi@raspberrypi.local

The default password is `raspberry`.

## first steps

  	sudo apt-get update
  	sudo apt-get upgrade

