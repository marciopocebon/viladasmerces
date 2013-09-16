#!/bin/bash

echo '# services status:'

# apache 2
instance=$( ps aux | grep -v grep | grep apache2 | head -n1 | awk '{print $2}' )
if [ $instance -gt 0  ] ; then
	echo '[apache2] -> running'
else
	echo '[apache2] -> starting...'
	echo
	sudo service apache2 start
fi

# mongod
instance=$( ps aux | grep -v grep | grep mongod | head -n1 | awk '{print $2}' )
if [ $instance -gt 0  ] ; then
	echo '[mongod] -> running'
else
	echo '[mongod] -> starting...'
	echo
	sudo mongod --dbpath /viladasmerces/data/db/
fi