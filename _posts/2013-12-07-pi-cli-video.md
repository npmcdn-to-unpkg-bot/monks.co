---

title: CLI video control on RPI
categories:
  - hardware
  - howto
  - video
year: 2013
---
I often like to watch movies on a projector, but I don't always want to commit to keeping my laptop plugged in. So, I load up the video on a [hfs+ usb stick](/rpi-hfs), and control the video via ssh.

Omxplayer is cool because it uses the GPU (rad for 1080p). It's uncool because it doesn't support ALSA: audio can't be routed to a USB interface, only HDMI or the built-in 8th-inch jack.

##  install omxplayer

    sudo apt-get update
    sudo apt-get install omxplayer

## play video

    omxplayer ./video.mkv

<!--more-->

## options

    Usage: omxplayer [OPTIONS] [FILE]
    Options :
    -h / --help                print this help
    -n / --aidx  index         audio stream index    : e.g. 1
    -o / --adev  device        audio out device      : e.g. hdmi/local
    -i / --info                dump stream format and exit
    -s / --stats               pts and buffer stats
    -p / --passthrough         audio passthrough
    -d / --deinterlace         deinterlacing
    -w / --hw                  hw audio decoding
    -3 / --3d mode             switch tv into 3d mode (e.g. SBS/TB)
    -y / --hdmiclocksync       adjust display refresh rate to match
                               video (default)
    -z / --nohdmiclocksync     do not adjust display refresh rate to
                               match video
    -t / --sid index           show subtitle with index
    -r / --refresh             adjust framerate/resolution to video
    -l / --pos                 start position (in seconds)
        --boost-on-downmix     boost volume when downmixing
        --subtitles path       external subtitles in UTF-8 srt form at
        --font path            subtitle font
                               (default: /usr/share/fonts/truetype/
                                          freefont/FreeSans.ttf)
        --font-size size       font size as thousandths of screen height
                               (default: 55)
        --align left/center    subtitle alignment (default: left)
        --lines n              number of lines to accommodate in the
                               subtitle buffer (default: 3)

## keyboard shortcuts

    Space or p   Pause/Resume
    q            Exit OMXPlayer
    z            Show Info

    -            Decrease Volume
    +            Increase Volume

    i            Previous Chapter
    o            Next Chapter

    Left Arrow   Seek -30
    Right Arrow  Seek +30
    Down Arrow   Seek -600
    Up Arrow     Seek +600

    1            Increase Speed
    2            Decrease Speed

    j            Previous Audio stream
    k            Next Audio stream
    n            Previous Subtitle stream
    m            Next Subtitle stream
    s            Toggle subtitles
    d            Subtitle delay -250 ms
    f            Subtitle delay +250 ms
