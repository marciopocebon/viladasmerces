#!/bin/bash
# chkconfig: 35 90 12

start() {
  echo $"Starting viladasmerces application: "
  cd /srv/www/viladasmerces && npm start
  echo
}

stop() {
  echo $"Stopping viladasmerces server: "
  cd /srv/www/viladasmerces && npm stop
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