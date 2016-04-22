#!/usr/bin/env python3

from flask import Flask, abort, render_template, url_for
from flask.ext.misaka import markdown
import subprocess
import utils
import json
import sys
# from utils.simple_async import AsyncExec, ct

app = Flask(__name__, static_folder='../frontend',
            static_url_path='/../frontend/')
APP_VERSION = '1.0'
# latest Commit Hash:
# https://api.github.com/repos/fsr/infoscreen/commits/new_version


@app.route("/")
def render_infoscreen():
    return app.send_static_file('infoscreen.html')

@app.route("/tab")
def render_tablet_screen():
    return app.send_static_file('tablet.html')

@app.route('/assets/<path:path>')
def get_assets(path):
    return app.send_static_file('assets/{}'.format(path))


@app.route("/meals")
def json_meals():
    return json.dumps(utils.getmeals())


@app.route("/postillon")
def json_postillon():
    return json.dumps(utils.postillon_ticker())


@app.route("/news")
def json_news():
    return json.dumps(markdown(utils.get_news()))


@app.route("/stops")
def json_stops():
    return json.dumps(utils.all_departures())


@app.route("/stops/helmholtz")
def json_HhBus():
    return json.dumps(utils.get_departures('Helmholtzstrasse'))


@app.route("/stops/tud")
def json_TuBus():
    return json.dumps(utils.get_departures('Technische%20Universitaet',
                                           min_minutes=1))


@app.route("/stops/muenchner")
def json_MPBus():
    return json.dumps(utils.get_departures('Muenchner%20Platz', min_minutes=7))


@app.route("/system/restart")
def restart_browser():
    command_kill_chrome = ['sudo', 'killall', 'chromium']
    command_start_chrome = ['DISPLAY=:0', 'sudo', '-u', 'pi', 'chromium', '--disk-cache-dir="/var/tmp"',
                            '--disable-translate', '--incognito', '--kiosk', '"http://localhost:5000/"']

    subprocess.call(command_kill_chrome)
    subprocess.call(command_start_chrome)

    # TODO: IF Python3.5
    # subprocess.run(command_kill_chrome)
    # subprocess.run(command_start_chrome)


@app.route("/system/shutdown")
def shutdown_pi():
    subprocess.call(['sudo', 'shutdown', '-h', 'now'])

    # TODO: If Python3.5
    # subprocess.run(['sudo', 'shutdown', '-h', 'now'])


@app.route("/system/reboot")
def reboot_pi():
    subprocess.call(['sudo', 'reboot'])

    # TODO: If Python3.5
    # subprocess.run(['sudo', 'reboot'])


@app.route("/zih")
def play_zih_vid():
    command_play = ['DISPLAY=:0', 'sudo', '-u', 'pi', 'omxplayer', '/var/www/zihsd.mp4', '-r', '15', '>', '/dev/null']
    # TODO: evtl stdout mit open(os.devnull) statt '>' ?
    command_refresh = ['sudo', '-u', 'pi', '/usr/bin/xrefresh', '-display', ':0']
    subprocess.call(command_play)
    subprocess.call(command_refresh)

    # TODO: IF Python3.5
    # subprocess.run(command_play)
    # subprocess.run(command_refresh)


@app.route("/version")
def version():
    return json.dumps(APP_VERSION)


if __name__ == "__main__":
    args = sys.argv
    if len(args) < 2 or args[1] == 'dev':
        app.debug = True
        app.run()
    elif args[1] == 'vm':
        app.debug = True
        app.run(host="0.0.0.0")
    elif args[1] == 'production':
        app.debug = False
        app.run(host="0.0.0.0")
    else:
        print('[INFO] Invalid command. Starting in development mode...')
        app.debug = True
        app.run()
