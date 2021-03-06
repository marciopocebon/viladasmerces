#!/bin/bash

## installs the following packages on the system if they are not installed yet:
# apache2
# mongodb
# nodejs
# npm
# curl

echo '# app dependencies:  '

# apache2
installed_status=$( dpkg -s apache2 | grep Status )
if [[ $installed_status == *'install'* ]] ; then
	echo '[apache2] -> already installed'
else
	echo '[apache2] -> installing...'
	echo
	sudo apt-get update
	sudo apt-get install apache2 -y || sudo apt-get install apachectl -y
fi

# mongodb-10gen
installed_status=$( dpkg -s mongodb | grep Status )
if [[ $installed_status == *'install'* ]] ; then
    echo '[mongodb] -> already installed'
    sudo mkdir -p /data/db/
else
	echo '[mongodb] -> installing...'
	echo
	sudo apt-get update
	sudo apt-get install mongodb -y
fi

# nodejs
installed_status=$( dpkg -s nodejs | grep Status )
if [[ $installed_status == *'install'* ]] ; then
    echo '[nodejs] -> already installed'
else
    echo '[nodejs] -> installing...'
    echo
    sudo apt-get update
    sudo apt-get nodejs -y
fi

# npm
installed_status=$( dpkg -s npm | grep Status )
if [[ $installed_status == *'install'* ]] ; then
	echo '[npm] -> already installed'
else
	echo '[npm] -> installing...'
	echo
	sudo apt-get update
	sudo apt-get install npm -y
fi

# curl
installed_status=$( dpkg -s curl | grep Status )
if [[ $installed_status == *'install'* ]] ; then
	echo '[curl] -> already installed'
else
	echo '[curl] -> installing...'
	echo
	sudo apt-get update
	sudo apt-get install curl -y
fi

echo 'OK. Finished installing app dependencies!'