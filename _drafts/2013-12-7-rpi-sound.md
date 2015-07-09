---

layout: default
title: rapsberry pi sound
tags: 
- rpi
- guide
- sound
group: raspberry-pi

---

# 	sound on raspberrypi

The volume usually seems to start at zero; you'll need to turn it up within the alsa mixer, which you can open up with:

	alsamixer

navigate with arrow keys.

## usb sound card

I'm using a [cheap usb audio interface](http://www.amazon.com/gp/product/B001MSS6CS/) for a crappy mic input. it works.

To use a usb soundcard by default, edit `/etc/modprobe.d/alsa-base.conf`. The last line should be 

	options snd-usb-audio index=-2

Change the index to 0, making it 

	options snd-usb-audio index=0

and reboot. After rebooting, you can test it with

	aplay /usr/share/scratch/Media/Sounds/Animal/Bird.wav 

or

	speaker-test -c2 -D hw:0,0

### credits

from [adafruit](http://learn.adafruit.com/usb-audio-cards-with-a-raspberry-pi/instructions)