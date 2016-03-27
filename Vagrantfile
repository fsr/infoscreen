# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    config.vm.box = "scotch/box"
    config.vm.network "private_network", ip: "192.168.33.10"
    config.vm.hostname = "infoscreen"
    config.vm.synced_folder "backend/", "/var/www/public", :mount_options => ["dmode=777", "fmode=666"]
    config.vm.synced_folder ".", "/home/vagrant/infoscreen"

    config.vm.provision "shell", path: "provisioner.sh"
end
