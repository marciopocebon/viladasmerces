#!/bin/bash
#
# processname: viladasmerces
# description: Configuration script to run the app
# usage : sudo service viladasmerces ( start | stop | restart )

start() {
        ### start the app ###
        echo $"Starting viladasmerces application: "
        cd /srv/www/viladasmerces && npm start
        ### Creates the lock file ###
        touch /var/lock/viladasmerces
        echo
}

stop() {
        ### stop the app ###
        echo $"Stopping viladasmerces server: "
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