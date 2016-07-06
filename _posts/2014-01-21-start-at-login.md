---

title: Start Something At Login on Linux with init.d
categories:
  - howto
  - linux
year: 2014
---

## Info

Put this file in /etc/init.d/ and edit {THING-TO-LAUNCH} as appropriate.

You can run `sudo update-rc.d {THIS-FILE'S-NAME} defaults` to `start` at boot and `stop` at shutdown.

## The Script

    #! /bin/sh
    # /etc/init.d/{THING-TO-LAUNCH}

    ### BEGIN INIT INFO
    # Provides:          {THING-TO-LAUNCH}
    # Required-Start:    $remote_fs $syslog
    # Required-Stop:     $remote_fs $syslog
    # Default-Start:     2 3 4 5
    # Default-Stop:      0 1 6
    # Short-Description: Simple script to start a program at boot
    # Description:       Simple, conventional, practical launch script.
    ### END INIT INFO

    # run `sudo update-rc.d {THING-TO-LAUNCH} defaults` to `start` at boot and `stop` at shutdown.

    # Carry out specific functions when asked to by the system
    case "$1" in
      start)
        echo "Starting {THING-TO-LAUNCH}"
        # run application you want to start
        # runs as root by default, hence the `su`
        su pi -c '/usr/bin/{THING-TO-LAUNCH} new -d' # or whatever
        ;;
      stop)
        echo "Stopping {THING-TO-LAUNCH}"
        # kill application you want to stop
        su pi -c 'killall {THING-TO-LAUNCH}' # or whatever
        ;;
      *)
        echo "Usage: /etc/init.d/{THING-TO-LAUNCH} {start|stop}"
        exit 1
        ;;
    esac

    exit 0
