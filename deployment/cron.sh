cat <<__EOF__ | crontab
# m h  dom mon dow   command
0 0   * * *   /opt/vc/bin/tvservice -o &
0 7   * * *   /opt/vc/bin/tvservice -p && timeout 1 startx &
* *   * * *   /usr/local/bin/python3 /home/pi/buerostatus/raspi.py
@reboot /usr/bin/tmux -f /dev/null new-session -s "printerStatus" -d "/usr/local/bin/python3 /home/pi/printer-monitor/pi/printerstatus.py"
__EOF__
