---

layout: default
title: Wifi at SAIC
tags: 
- rpi
- guide
group: raspberry-pi

---

# wifi at SAIC

## credit

a lot of this page is directly copy-and-pasted from an email from Chris Baker. Props to him.

## Chris Baker's warnings, verbatim

Several notes about my setup:

1.  I used an Edimax (http://www.amazon.com/EW-7811UN-IEEE-802-11n-draft-USB/dp/B005CLMJLU) USB wireless interface.  I tried other wireless interfaces (even some that claimed to use the same realtek chipset) and they did not work.  Other interfaces with compatible chipsets should work as well.  Check the http://elinux.org/RPi_VerifiedPeripherals for ideas. 

2. Plugging the wireless interface into a powered USB hub did not work.  The wireless interface had to be plugged directly into the PI.  Everything else (keyboard, etc) was plugged into a powered usb hub.  I'm assuming this was a power issue, but it could have been anything including interference, etc.

3. It is currently impossible (from my research) to hash / encrypt inner auth passwords when using a PAP inner authentication scheme (like we use here).  It is possible to NT hash some inner auth schemes (e.g. MSCHAPV2), but I can't find a way to do it with PAP.  Thus, the security of your wireless password (and by extension your ARTIC password) can only be protected by:

*	Choosing a secure ROOT password on your PI (don't use the default pi/raspberry user/pass !!!).  The wpa_supplicant.conf file is limited to root access, but the default "pi" user is set up as a a passwordless sudoer by default, so sudo vi ... gets you in if you have the pi password.

*	 Securing your physical SD Card / PI for installations.  If someone swipes your SD card, the filesystem (and thus the user/password) is easily accessible.  If this happens (or even if you momentarily misplace an SD CARD), change your SAIC user / pass immediately.

## now here's how to do it

copy wpa_supplicant file

	sudo cp ~/rpi-setup/src/wpa_supplicant.conf.saic /etc/wpa_supplicant/wpa_supplicant.conf

edit it with your SAIC username and password

	sudo nano /etc/wpa_supplicant/wpa_supplicant.conf

After you edit the file you can plug / unplug your USB wifi interface, or you can reboot the pi or you can do:

	sudo ifdown wlan0
	sudo ifup wlan0

After that it should associate with the ssid automagically in the future on startup.