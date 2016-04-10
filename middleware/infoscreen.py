#!/usr/bin/env python3

from flask import Flask, abort, render_template, url_for
from flask.ext.misaka import markdown
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
    return json.dumps(utils.get_departures('Helmholtzstrasse', 'Dresden', 3))


@app.route("/stops/tud")
def json_TuBus():
    return json.dumps(utils.get_departures('Technische%20Universitaet',
                                           'Dresden', 3))


@app.route("/stops/muenchner")
def json_MPBus():
    return json.dumps(utils.get_departures('Muenchner%20Platz', 'Dresden', 3))


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
    elif args[2] == 'production':
        app.debug = False
        app.run()
    else:
        print('[INFO] Invalid command. Starting in development mode...')
        app.debug = True
        app.run()
