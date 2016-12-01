cat <<__EOF__ | crontab
# m h  dom mon dow   command
0 0   * * *   /opt/vc/bin/tvservice -o &
0 7   * * *   /opt/vc/bin/tvservice -p && timeout 1 startx &
* *   * * *   /usr/local/bin/python3 /home/pi/buerostatus/raspi.py
@reboot /etc/init.d/infoscreen start
@reboot screen -dmS printerStatus /usr/local/bin/python3 /home/pi/printer-monitor/pi/printerstatus.py

# Reboot everyday at 0715 in the morning
15 7  * * *   reboot
__EOF__
