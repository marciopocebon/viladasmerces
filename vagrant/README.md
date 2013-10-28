# Running the app from a virtual machine using vagrant

### Download the box
$ vagrant box add viladasmerces /path/to/the/package.box

### Go to repository's vagrant directory
$ cd viladasmerces/vagrant/

### Edit vagrantfile and set up the synced folder

### Start the VM
$ vagrant up

### Verify if the VM is running
Go to http://192.168.33.10/rest/ and check for the welcome message: 'opa'
