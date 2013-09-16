#!/bin/bash

## installs the following packages on the system if it is not installed yet:
# apache2
# mongodb
# nodejs
# npm
# git - x

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

# # git
# installed_status=$( dpkg -s git | grep Status )
# if [[ $installed_status == *'install'* ]] ; then
# 	echo '[git] -> already installed'

# 	# repo
# 	repo_exists=$( cd /var/www/ | ls | grep -i viladasmerces )
# 	if [ $repo_exists == 'viladasmerces' ] ; then
# 		echo '[git] -> repo already downloaded'
# 	else
# 		sudo git clone https://github.com/marioluan/viladasmerces.git
# 	fi
# else
# 	echo '[git] -> installing...'
# 	sudo apt-get install git -y && cd /var/www/ && sudo git clone https://github.com/marioluan/viladasmerces.git
# fi

echo '  '
echo 'OK. Finished installing app dependencies!'