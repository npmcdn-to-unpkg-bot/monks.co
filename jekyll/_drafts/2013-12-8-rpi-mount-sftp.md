---

layout: default
title: mount your mac via sftp on raspberry pi
tags:
- guide
- rpi
group: raspberry-pi

---

# Mount your mac on your raspberry pi

I use this technique to stream movies from my mac to my raspberrypi. It's more reliable to transfer the movie on a [usb drive](/rpi-hfs) but if my connection is good and I know I'm going to be connected, ssh works as a lazy solution.

## install

	sudo apt-get install sshfs
	sudo adduser pi fuse

then restart your pi

	sudo reboot

## set up server on mac

in system preferences / sharing, turn on remote login

## mount

mkdir ~/sftp

	sshfs mac-user-name@mac-computer-name.local:/users/mac-user-name ~/sftp