cat >> /etc/lightdm/lightdm.conf <<__EOF__
# General configuration
#
[LightDM]

[SeatDefaults]
xserver-command=X :0 -ac -nocursor -s 0 -dpms
xserver-allow-tcp=false
greeter-session=lightdm-greeter
greeter-hide-users=true
session-wrapper=/etc/X11/Xsession
session-setup-script=/home/pi/infoscreen/node_modules/.bin/electron /home/pi/infoscreen
#session-setup-script=chromium --disk-cache-dir="/var/tmp" --start-maximized --window-size=1920,1200 --disable-translate --incognito --user-data-dir="/home/pi/.chromium" --kiosk "http://localhost:5000"
autologin-user=pi

[XDMCPServer]

[VNCServer]

__EOF__
