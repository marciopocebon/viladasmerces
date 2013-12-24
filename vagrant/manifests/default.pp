$packages = [ "apache2", "mongodb", "nodejs", "npm", "git", "curl", "tmux" ]
$services = [ "apache2", "mongodb", "viladasmerces" ]
$apt_update = "apt-get update"
$PATH = "/usr/bin:/usr/sbin"

# update packages
exec {
	$apt_update:
	path => $PATH,
	user => "root"
}

# dependencias
package {
	$packages:
	ensure 	=> installed,
	require => Exec[$apt_update]
}

# apache
file {
	"/etc/apache2/httpd.conf":
	ensure => present,
	group 	=> "root",
	owner 	=> "root",
	mode 	=> 0644,
	source 	=> "puppet:///files/httpd.conf"
}

# nodejs
file {
	"/etc/init/viladasmerces.conf":
	ensure 	=> present,
	group 	=> "root",
	owner 	=> "root",
	mode 	=> 0775,
	source 	=> "puppet:///files/viladasmerces.conf";

	"/var/log/viladasmerces/":
	ensure 	=> directory,
	group 	=> "root",
	owner 	=> "root",
	mode 	=> 0755
}

# mongodb
file {
	"/etc/mongodb.conf":
	ensure 	=> present,
	group 	=> "root",
	owner 	=> "root",
	mode 	=> 0644,
	source 	=> "puppet:///files/mongodb.conf";

	"/etc/init/mongodb.conf":
	ensure 	=> present,
	group 	=> "root",
	owner 	=> "root",
	mode 	=> 0775,
	source 	=> "puppet:///files/init_mongodb.conf"
}

# services
service {
	$services:
	ensure 	=> running,
	require => Package[$packages]
}