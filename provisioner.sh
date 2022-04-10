# Provisioning Script for the Vagrant VM
sudo apt-get install -y python3 python3-pip libffi-dev
sudo pip3 install -r /home/vagrant/infoscreen/requirements.txt

# Muting the locale warning
sudo touch /var/lib/cloud/instance/locale-check.skip

