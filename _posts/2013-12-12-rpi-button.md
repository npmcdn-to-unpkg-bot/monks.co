---
layout: default
title: make a raspberrypi respond to a button
category: howto
year: 2013
---
In [talk to an API](/rpi-talk-to-api) we used a script to record voice input and send it out to Google's speech to text API.

We used the command line to control that script, and we set it to loop infinitely. so let's update it to use a button. Push to talk.

First we'll edit the shell script, then we'll make a python script to listen for the button, and launch the shell script.

## edit the shell script

We want to take out the stuff about looping. We're left with the following:

    #DaveConroy.com
    #10/29/13
    #stt.sh
    #modified by Andrew Monks

    mkdir -p stt-output

    echo "Recording your Speech ($time seconds)"
    arecord -D plughw:0,0  -f cd -t wav -d 0 -q -r 16000 stt-output/stt-recording-$i.wav &
    PID=$!
    #set duration of recording
    sleep 5s
    kill $PID
    echo "End recording"
    sleep 1s

    echo "Converting speech to FLAC"
    flac -5 -s -f --best --sample-rate 16000 -o stt-output/stt-recording-$i.flac stt-output/stt-recording-$i.wav

    echo "Converting Speech to Text..."
    wget -q -U "Mozilla/5.0" --post-file stt-output/stt-recording-$i.flac --header "Content-Type: audio/x-flac; rate=16000" -O - "http://www.google.com/speech-api/v1/recognize?lang=en-us&client=chromium" | cut -d\" -f12 > stt-output/stt-text-$i.txt

    echo "You Said:"
    value=`cat stt-output/stt-text-$i.txt`
    echo "$value"

    echo "put to server"
    url="http://gentle-inlet-8461.herokuapp.com/newtext/$value"
    echo "$url"
    wget -qO- "$url" &> /dev/null

## Trigger the shell script

Here's a simple python script to listen for a button on GPIO pin 23

    #!/usr/bin/env python

    from time import sleep
    import os
    import RPi.GPIO as GPIO

    GPIO.setmode(GPIO.BCM)
    GPIO.setup(23, GPIO.IN)

    while True:
            if ( GPIO.input(23) == False ):
                    os.system('./stt.sh &')
            sleep(0.1);

It requires RPi.GPIO, which comes preinstalled on Adafruit's Occidentalis distro, or which you can easily install with:

    sudo apt-get update
    sudo apt-get install python-dev
    sudo apt-get install python-rpi.gpio

## button hardware

![schematic](http://learn.adafruit.com/system/assets/assets/000/000/887/medium800/butt-schem.png?1342097271)

