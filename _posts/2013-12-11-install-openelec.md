---
layout: default
title: Install openELEC on RaspberryPi
category: howto
year: 2013
---
OpenELEC is a media-center-specific distribution that runs well on the raspberry pi. It includes built in for things like

## setup sd card

1. download the [latest rpi image](http://openelec.thestateofme.com/official_images/)

2. plug in your SD card

3. open /Applications/Utilities/Disk Utility

4. click on your SD card

5. open 'info', look for the 'disk identifier'

6. unmount the SD card

7. `sudo dd if=OpenELEC-RPi.arm-3.2.4.img of=/dev/disk1` (if your disk identifier is 'disk1') (this will take **forever** and won't give any updates. It's working.)

Once that's done, plug it into your pi, plug your pi into a display//projector, and you should be good to go.

## Usage

The first time I booted my raspberrypi with openELEC it showed an on-screen configuration utility in which I set the hostname, internet connection, and language. For the most part it worked out of the box.

### Airplay

Perhaps the coolest thing openELEC/xbmc can do out of the box is Airplay. Once turned on in settings, your network-connected raspberrypi becomes an Airplay server—which means you can stream media to it directly / easily from iOS or itunes, by clicking the TV-like icon to the right of the play button.

![airplay button in itunes](http://cl.ly/Suaq/Screen%20Shot%202013-12-11%20at%2010.31.07%20PM.png)

On my network, it streams well with about a 6-second buffer.
