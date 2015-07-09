---

layout: default
title: initial beaglebone black setup
tags:
- guide
- rpi
group: beaglebone

---

#	beaglebone black setup steps

1.	

from beagleboard.org/latest-images get the latest sd boot image *not the emmc flasher* (the emmc has so little memory you end up having to use the microsd slot anyway which gets weird)

2.

use Pi Filler http://ivanx.com/raspberrypi/ to put it on a microsd card

3.

plug bbb into ethernet and sd card. Boot while holding down the button 

4.

CRUCIAL expand partition to size of sd card using gparted or http://www.gigamegablog.com/2012/09/26/beaglebone-101-linux-tricks-for-backing-up-and-resizing-your-microsd-card/

5.

http://derekmolloy.ie/set-ip-address-to-be-static-on-the-beaglebone-black/

do step 1 of ^^ to set nameservers:

	/usr/lib/connman/test/get-services
	/usr/lib/connman/test/set-nameservers ethernet_9059af5bb675_cable_or_something 192.168.1.1 8.8.8.8

also edit /etc/resolv.conf to last until reboot

6.

	opkg --tmp-dir ~ update
	opkg --tmp-dir ~ upgrade

**froze once during this**

7.

set clock

/usr/bin/ntpdate -b -s -u pool.ntp.org