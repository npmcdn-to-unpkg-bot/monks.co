---
layout: default
title: Stream video with the RaspberryPi Camera
category: howto
year: 2014
---
The [raspberry pi camera](http://www.raspberrypi.org/camera) is a cheap (though not compared to the pi itself...) camera addon for the pi. I'm using it to make a front-door for my apartment, so I can see who's buzzing my buzzer. Here's how.

## install camera

First, you have to connect the camera to the pi. The camera's ribon cable goes in the slot between the HDMI and ethernet ports, with the metal connectors facing the HDMI.

The video on the [raspberry pi camera](http://www.raspberrypi.org/camera) page is helpful.

Once it's installed, run `sudo raspi-config` and select `5 Enable Camera`. Reboot when prompted.

## test camera

run `raspivid -t 10000` (t is measured in ms, so 10000 is 10 seconds).

You should see a super cool video feed!

## basic streaming

The aforelinked raspberrypi foundation guide suggests streaming by setting up a connection with `nc` and then piping `raspivid` directly into it. It works pretty well, except you have to start the client listening before starting the camera—you can't just leave the camera running and connect to it as-needed (as would be ideal for a security camera). We're gonna stream differently, but it's a good way to test things out.

You'll need mplayer installed on your client machine. I'm using a mac, and I installed it with `brew install mplayer`. (if you don't have [homebrew (the osx package manager)](http://brew.sh/) you'll need to install that too)

On the client computer, start listening with `nc -l 5001 | mplayer -cache 1024 -`. The `-l` means "listen". You're listening to (arbitrarily chosen) port 5001, and then piping the output of that to mplayer.

On the pi side, run `raspivid -t 999999 -o - | nc [insert the IP address of the client] 5001`

## web streaming

Rather than establishing a persistant connection, as above, I want to stream the video using a simple always-on webserver on the pi so I can check who's at the door from any internet browser (even on mobile).

I followed [Miguel Grinberg's instructions](http://blog.miguelgrinberg.com/post/how-to-build-and-run-mjpg-streamer-on-the-raspberry-pi) to build mjpg-streamer. He goes into more depth, but the commands are:

	sudo apt-get install libjpeg8-dev imagemagick libv4l-dev
	sudo ln -s /usr/include/linux/videodev2.h /usr/include/linux/videodev.h
	wget http://sourceforge.net/code-snapshots/svn/m/mj/mjpg-streamer/code/mjpg-streamer-code-182.zip
	unzip mjpg-streamer-code-182.zip
	cd mjpg-streamer-code-182/mjpg-streamer
	make mjpg_streamer input_file.so output_http.so
	sudo cp mjpg_streamer /usr/local/bin
	sudo cp output_http.so input_file.so /usr/local/lib/
	sudo cp -R www /usr/local/www
	cd ../../
	rm -rf mjpg-streamer-182

Hopefully that all worked. Now we can start the camera with

	mkdir /tmp/stream
	raspistill --nopreview -w 640 -h 480 -q 5 -o /tmp/stream/pic.jpg -tl 100 -t 9999999 -th 0:0:0 &

The (`&`) at the end makes the command run in the background. It'll pretty-constantly continue to output into your terminal prompt, so it might be better to just run it in a separate tty. Anyway, remember you can kill it with `killall raspistill`

To start mjpg-streamer, run

	LD_LIBRARY_PATH=/usr/local/lib mjpg_streamer -i "input_file.so -f /tmp/stream -n pic.jpg" -o "output_http.so -w /usr/local/www"

Now you can watch the stream by pointing your browser to the pi over port 8080! `http://localhost:8080` if you're viewing from on the pi, or `http://[pi ip address]:8080` if you (more likely) aren't.
