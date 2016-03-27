# iFSR Infoscreen for the office Raspberry Pi

[![githubissues](http://img.shields.io/github/issues/fsr/infoscreen.svg?style=flat)](https://github.com/fsr/infoscreen/issues)

All new version 2.0! :sparkles:

This is the second incarnation of the **iFSR Infoscreen** for the display in our office window which is still under development.


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
_Note that the real Infoscreen html file is at the moment not part of the Flask application and lives inside of the `templates` folder. This will be fixed soon._

The (temporary) backend of the Infoscreen lives inside of the VM at `/var/www/public`
and is accessible via [192.168.33.10/backend.php](http://192.168.33.10/backend.php).

`vagrant halt` stops the VM and `vagrant destroy` will remove all traces of the development environment.

You can work on the code right on your system, all folders are synced with the Virtual Machine and Flask reloads itself when a file is changed.

### The Old-Fashioned Way

1. Make sure you have the latest version of [Python3](https://python.org) and pip installed.
2. Install all dependencies using `pip3 install -r requirements.txt`
3. Run the Flask server from your terminal using:  
`$ python3 infoscreen.py dev`
4. Access the application via [127.0.0.1:5000](http://127.0.0.1:5000).  
_Note that the real Infoscreen is at the moment not part of the Flask application and lives inside of the `templates` folder. This will be fixed soon._

The backend requires a working webserver so you might have to install one on your PC or upload the `backend/` folder to a webhoster.


_TODO: Extend this._
