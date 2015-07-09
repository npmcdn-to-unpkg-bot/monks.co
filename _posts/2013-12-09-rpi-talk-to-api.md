---
layout: default
title: talk to an api from raspberry pi
categories:
  - howto
  - writing
year: 2013
---
I'm pretty into web development, so I'm really excited by using the rpi to connect data from physical sensors to a server.

The [olab](http://olab.io), for example, is considering using a light sensor connected to a raspberry pi in the lab to control the background color of their new webpage. If the lights are off, the background color is dark, if they're on, it's bright, making it easy to see if someone's in the lab.

It's possible to accomplish this by serving the website directly from the pi; but a more robust solution is to set up a proper data-center server listen for messages from your pi.

In this example, I'm going to use a mic hooked up to the pi to record speech and convert it to text using the google traslate API. Then, I'll send that text to a server to display the last thing I've said.

## google translate shell script

Here's a shell script by Dave Conroy that uses alsa te record speech, converts it to flac, sends it to google, and prints the response to a text file.

stt.sh:

	#DaveConroy.com
	#10/29/13
	#stt.sh
	#modified by Andrew Monks

	mkdir -p stt-output

	echo "Recording your Speech (Ctrl+C to Transcribe)"
	arecord -D plughw:0,0  -f cd -t wav -d 0 -q -r 16000 stt-output/stt-recording.wav &
	PID=$!
	#set duration of recording
	sleep 5s
	kill $PID
	sleep 1s

	echo "Converting speech to FLAC"
	flac -5 -s -f --best --sample-rate 16000 -o stt-output/stt-recording.flac stt-output/stt-recording.wav

	echo "Converting Speech to Text..."
	wget -q -U "Mozilla/5.0" --post-file stt-output/stt-recording.flac --header "Content-Type: audio/x-flac; rate=16000" -O - "http://www.google.com/speech-api/v1/recognize?lang=en-us&client=chromium" | cut -d\" -f12 > stt-output/stt-text.txt

	echo "You Said:"
	value=`cat stt-output/stt-text.txt`
	echo "$value"

then make it executable

	sudo chmod +x stt.sh

You'll need `flac` installed. Use

	apt-get install flac

## api

### make it

Now we need an API. I made a super-simple app (ready for free hosting on heroku) that listens for incoming text and then displays it.

It's available in a [separate repo](https://github.com/amonks/rpi-heroku-api-demo)

It's also live at [http://gentle-inlet-8461.herokuapp.com/](http://gentle-inlet-8461.herokuapp.com/).

Here's the sinatra code to make it happen:

	# Require the bundler gem and then call Bundler.require to load in all gems
	# listed in Gemfile.
	require 'bundler'
	Bundler.require

	# set up string array to keep sayings in
	data = Array.new

	# serve pages
	get '/' do
	  data.to_s
	end

	get '/newtext/*' do
	  data.push(params[:splat])
	  redirect '/'
	end

### host it

A big reason why I use sinatra so much is free hosting on Heroku. Here's how to do it. Commands assume you're in the directory of the app you're trying to host. Further instructions available on [heroku's website](https://devcenter.heroku.com/articles/getting-started-with-ruby#local-workstation-setup)

1. [create a heroku account](https://id.heroku.com/signup)

2. install the [heroku toolbest](https://toolbelt.heroku.com/)

3. `heroku login`

4. `git init`

5. `git add --all .`

6. `git commit -am "initial commit"`

7. `heroku create`

8. `git push heroku master`

## update shell script

I added the following to my shell script to make it send results to the server on heroku. You'll get a different domain name in your heroku setup.

	echo "put to server"
	url="http://gentle-inlet-8461.herokuapp.com/newtext/$value"
	echo "$url"
	wget -qO- "$url" &> /dev/null


### credits

speech to text script by [dave conroy](http://www.daveconroy.com/turn-raspberry-pi-translator-speech-recognition-playback-60-languages/)
