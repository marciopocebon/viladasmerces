# Rodando a aplicação de uma máquina virtual através do vagrant

### Download
``
$ vagrant box add viladasmerces http://www.marioluan.com.br/viladasmerces.box
``

### Acesse o diretório do vagrant
``
$ cd viladasmerces/vagrant/
``

### Configure as propriedades do Vagrantfile

### Suba a VM
``
$ vagrant up
``

### Acesse a máquina via ssh
``
$ vagrant ssh
``

### Vá até o diretório backend, onde se encontra a 'shared_folder' do repositório
``
$ cd caminho/para/repo/viladasmerces/
``
### Suba o servidor
``
$ node index.js
``

Se tudo correr bem, o app já estará escurando conexões em:
http://app.viladasmerces/
