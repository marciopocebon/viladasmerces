$packages = [ "apache2", "mongodb", "nodejs", "npm", "git", "curl", "tmux" ]
$services = [ "apache2", "mongodb", "viladasmerces" ]
$apt_update = "apt-get update"
$PATH = "/usr/bin:/usr/sbin"

# update packages
exec { "apt-get update":
	path => $PATH,
	user => "root"
}

# dependencias
package { $packages:
	ensure 	=> installed,
	require => Exec[$apt_update]
}

# apache
file { "/etc/apache2/httpd.conf":
	ensure => present,
	group 	=> "root",
	owner 	=> "root",
	mode 	=> 0644,
	source 	=> "puppet:///files/httpd.conf"
}

# nodejs
file { "/etc/init/viladasmerces.conf":
	ensure 	=> present,
	group 	=> "root",
	owner 	=> "root",
	mode 	=> 0775,
	source 	=> "puppet:///files/viladasmerces.conf"
}

# mongodb
file { "/etc/mongodb.conf":
	ensure 	=> present,
	group 	=> "root",
	owner 	=> "root",
	mode 	=> 0644,
	source 	=> "puppet:///files/mongodb.conf"
}

file { "/etc/init/mongodb.conf":
	ensure 	=> present,
	group 	=> "root",
	owner 	=> "root",
	mode 	=> 0775,
	source 	=> "puppet:///files/init_mongodb.conf"
}

# services
service { $services:
	ensure 	=> running,
	require => Package[$packages]
}