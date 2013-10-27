# Running the app from a virtual machine using vagrant

## Download the box
$ vagrant box add viladasmerces_box /path/to/the/package.box

## Head over vagrant dir
$ cd app_root_dir/vagrant/

## Start the VM
$ vagrant up

## Verify if the VM is running
Go to http://192.168.33.10/rest/

You sould see a welcome message.

That's it for now!