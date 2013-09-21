#!/bin/bash
#
# viladasmerces: 21 09 13
# description: Configuration to run the app
#

start() {
        ### start the app ###
        logger "echo -n Starting viladasmerces server: "
        cd /srv/www/viladasmerces && npm start
        ### Creates the lock file ###
        touch /var/lock/viladasmerces
        success $"viladasmerces server startup"
        echo
}

stop() {
        ### stop the app ###
        logger "echo -n Stopping viladasmerces server: "
        cd /srv/www/viladasmerces && npm stop

        ### Deletes the lock file ###
        rm /var/lock/viladasmerces
        echo
}
### main logic ###
case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  status)
        status viladasmerces
        ;;
  restart)
        stop
        start
        ;;
  *)
        echo $"Usage: $0 {start|stop|restart}"
        exit 1
esac
exit 0