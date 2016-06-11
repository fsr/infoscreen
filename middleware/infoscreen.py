#!/usr/bin/env python3

from flask import Flask, abort, render_template, url_for
from flask_misaka import markdown
import subprocess
import utils
import json
import sys
# from utils.simple_async import AsyncExec, ct

app = Flask(__name__, static_folder='../frontend',
            static_url_path='/../frontend/')
APP_VERSION = '2.1'


@app.route("/")
def render_infoscreen():
    """
    Serves the infoscreen. \o/
    :return: The infoscreen html file for rendering.
    """
    return app.send_static_file('infoscreen.html')


@app.route("/tab")
def render_tablet_screen():
    """
    Serves the page for the tablet backend.
    :return: The tablet html file.
    """
    return app.send_static_file('tablet.html')


@app.route('/assets/<path:path>')
def get_assets(path):
    """
    A wrapper for an html opening a style asset.
    :param path: The path the file _should_ be at.
    :return: The actual file.
    """
    return app.send_static_file('assets/{}'.format(path))


@app.route("/meals")
def json_meals():
    """
    Gets todays meals to display onscreen.
    :return: A json dump of the Meals that are (theoretically) available at the moment of refresh.
    """
    return json.dumps(utils.getmeals())


@app.route("/postillon")
def json_postillon():
    """
    Fetches the Postillon Ticker.
    :return: A json dump of the previously fetched Postillon Newsticker.
    """
    return json.dumps(utils.postillon_ticker())


@app.route("/news")
def json_news():
    """
    Fetches a single News article for display onscreen.
    :return: A rendered version of a markdown-formatted news article as json dump.
    """
    return json.dumps(markdown(utils.get_news()))


@app.route("/stops")
def json_stops():
    """
    Get a json representation of the next departures from all 3 stops.
    :return: A json dump of the `utils.all_departures()` call for all 3 stops.
    """
    return json.dumps(utils.all_departures())


@app.route("/stops/helmholtz")
def json_HhBus():
    """
    Get a json representation of the next departures from the stop 'Helmholtzstraße'.
    :return: A json dump of the `utils.get_departures()` call for the Helmholtzstraße.
    """
    return json.dumps(utils.get_departures('Helmholtzstrasse'))


@app.route("/stops/tud")
def json_TuBus():
    """
    Get a json representation of the next departures from the stop 'Technische Universität'.
    :return: A json dump of the `utils.get_departures()` call for the Technische Universität.
    """
    return json.dumps(utils.get_departures('Technische%20Universitaet',
                                           min_minutes=15))


@app.route("/stops/muenchner")
def json_MPBus():
    """
    Get a json representation of the next departures from the stop 'Münchner Platz'.
    :return: A json dump of the `utils.get_departures()` call for the Münchner Platz.
    """
    return json.dumps(utils.get_departures('Muenchner%20Platz', min_minutes=7))


@app.route("/system/restart")
def restart():
    """
    Restart the Chromium browser the Infoscreen is displayed in.
    """
    subprocess.run(['sudo', 'service', 'infoscreen', 'restart'])


@app.route("/system/shutdown")
def shutdown_pi():
    """
    Shut the Pi down.
    """
    subprocess.run(['sudo', 'poweroff'])


@app.route("/system/reboot")
def reboot_pi():
    """
    Reboots the infoscreen.
    """
    subprocess.run(['sudo', 'reboot'])


@app.route("/weather")
def weather():
    '''
    Return warnings if there are any else returns the current weather
    '''
    result = utils.get_warnings()
    if result is None:
        return json.dumps(utils.get_weather())
    else:
        return json.dumps(result)


@app.route("/zih")
def play_zih_vid():
    """
    Play the 'Route to the ZIH' video.
    """
    command_play = ['DISPLAY=:0', 'sudo', '-u', 'pi', 'omxplayer', '/var/www/zihsd.mp4', '-r', '15', '>', '/dev/null']
    # TODO: evtl stdout mit open(os.devnull) statt '>' ?
    command_refresh = ['sudo', '-u', 'pi', '/usr/bin/xrefresh', '-display', ':0']
    subprocess.run(command_play)
    subprocess.run(command_refresh)


@app.route("/gitpull")
def git_pull():
    command_reset = ['sudo', '-u', 'pi', 'git', '--git-dir=/home/pi/infoscreen/.git',
                     '--work-tree=/home/pi/infoscreen', 'reset', '--hard']
    command_pull = ['sudo', '-u', 'pi', 'git', '--git-dir=/home/pi/infoscreen/.git',
                    '--work-tree=/home/pi/infoscreen', 'pull', 'origin', 'master']
    subprocess.run(command_reset)
    subprocess.run(command_pull)
    restart()
    render_infoscreen()


@app.route("/version")
def version():
    """
    Gets the Version number of the Infoscreen.
    :return: The Version number as String.
    """
    return json.dumps(APP_VERSION)


@app.route("/hash")
def commit_hash():
    """
    Gets the latest commit hash from HEAD
    :return: The short commit hash.
    """
    process = subprocess.run("git rev-parse HEAD".split(),  stdout=subprocess.PIPE)
    return process.stdout[:7].decode("utf-8")


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
