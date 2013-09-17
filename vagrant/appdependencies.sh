#!/bin/bash

## installs the following packages on the system if it is not installed yet:
# apache2
# mongodb
# nodejs
# npm

echo '# app dependencies:  '

# apache2
installed_status=$( dpkg -s apache2 | grep Status )
if [[ $installed_status == *'install'* ]] ; then
	echo '[apache2] -> already installed'
else
	echo '[apache2] -> installing...'
	echo
	sudo apt-get install apache2 -y || sudo apt-get install apachectl -y
fi

# mongodb-10gen
installed_status=$( dpkg -s mongodb | grep Status )
if [[ $installed_status == *'install'* ]] ; then
    echo '[mongodb] -> already installed'
else
	echo '[mongodb] -> installing...'
	echo
	sudo apt-get install mongodb -y
fi

# nodejs
installed_status=$( dpkg -s nodejs | grep Status )
if [[ $installed_status == *'install'* ]] ; then
    echo '[nodejs] -> already installed'
else
    echo '[nodejs] -> installing...'
    echo
    sudo apt-get nodejs -y
fi

# npm
installed_status=$( dpkg -s npm | grep Status )
if [[ $installed_status == *'install'* ]] ; then
	echo '[npm] -> already installed'
else
	echo '[npm] -> installing...'
	echo
	sudo apt-get install npm -y
fi

echo 'OK. Finished installing app dependencies!'
