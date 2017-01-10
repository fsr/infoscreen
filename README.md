# iFSR Infoscreen for the office Raspberry Pi

[![githubissues](http://img.shields.io/github/issues/fsr/infoscreen.svg?style=flat)](https://github.com/fsr/infoscreen/issues)

All new version 2.1! :sparkles:

This is the second iteration of the **iFSR Infoscreen** for the display in our office window which is still under development.


## Development Environment

If you want to work on this project, there are two possibilities:

### Using Vagrant

If you have [Vagrant](https://vagrantup.com) installed, simply run `vagrant up`
in the repository folder on your machine to get started. Vagrant will take care of installing all dependencies inside a VM.

If your VM is up and running, you can ssh into the machine using `vagrant ssh`.
Start the _Flask_ application (living in /home/vagrant/infoscreen/middleware) with the command:
```shell
$ python3 infoscreen.py vm
```
It's now accessible via [192.168.33.10:5000](http://192.168.33.10:5000) in your browser.  


The (temporary) backend of the Infoscreen lives inside of the VM at `/var/www/public`
and is accessible via [192.168.33.10/backend.php](http://192.168.33.10/backend.php).

`vagrant halt` stops the VM and `vagrant destroy` will remove all traces of the development environment.

You can work on the code right on your system, all folders are synced with the Virtual Machine and Flask reloads itself when a file is changed.

### The Old-Fashioned Way

1.  Make sure you have the latest version of [Python3](https://python.org) and pip installed.
2.  Install all dependencies using `pip3 install -r requirements.txt`
3.  Run the Flask server from your terminal using:  
`$ python3 infoscreen.py dev`
4.  Access the application via [127.0.0.1:5000](http://127.0.0.1:5000).  

The backend requires a working webserver so you might have to install one on your PC or upload the `backend/` folder to a webhoster.



## Setting up the Infoscreen
### Installing Base System
Installing the Base System is pretty easy and can be done in three simple steps:  

1.  Download the [latest release](https://github.com/debian-pi/raspbian-ua-netinst/releases/latest) of the [raspbian-ua-netinst](https://github.com/debian-pi/raspbian-ua-netinst) and flash it to the SD-Card  
2.  Copy `installer-config.txt` into `/` of the SD-Card  
3.  Connect the pi to the internet and power it up. The script will install the system  

The last Step may take some time (ETA 90 Minutes)

### Configuration
Congratulations! You have successfully installed the Raspbian image! Now it's time to configure it. Therefore, log in as `root` at infoscreen.ifsr.de (you may use the IP instead of the hostname if there is an old Infoscreen instance still running). The password is `fsrberry`, as usual. You can also attach a screen and a keyboard to the Pi and do the configuration there.

At first, run `apt-get update` and `apt-get dist-upgrade` to update the system.

Run `dpkg-reconfigure locales` and select the locales you want to use and set a standard locale

Then, download, unpack and install the latest release of **python3**. This is necessary since Debians/Raspbians package management sucks and doesn't provide the required Python version (3.5+) for Wheezy ARMv6, unfortunately.

```
wget https://www.python.org/ftp/python/3.5.2/Python-3.5.2.tgz
tar xzf Python-3.5.2.tgz
cd Python-3.5.2 && sed -ie 's/^#zlib/zlib/' Modules/Setup.dist
./configure --enable-optimizations
make -j4
make test
make install
```

Now would be an excellent time to get a coffee, do your homework or get some sleep. This will take hours. Seriously.

```
cd ..
rm -rf Python-3.5.2*
```

It is time to install Node.js to use electron

```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
apt install nodejs
```

Add a new user named `pi` to the system. We recommend using the same password the root account has.
```
adduser pi
```

Next, add the `pi` user to the sudoers file using the `visudo` command. Add the following line to the file:
```
pi ALL=(ALL) NOPASSWD:ALL
```

You can now switch to the `pi` user and clone the infoscreen repository:
```
su pi
cd /home/pi
git clone https://github.com/fsr/infoscreen.git
cd infoscreen
sudo pip3 install -r requirements.txt
npm install
```

TODO: Bürostatus  
TODO: Printerscript

Copy the `backend.json.example` file in the middleware folder to `backend.json` and provide it with the required information.
-   copy infoscreen to /etc/init.d/ (sudo)
-   run `sudo ./deployment/lightdm.sh` to set up lightdm-config
-   run `sudo ./deployment/cron.sh` to setup all needed cron jobs
