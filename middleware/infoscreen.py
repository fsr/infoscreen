from flask import Flask, render_template, url_for
from flask.ext.misaka import markdown
import utils
import json
from utils.simple_async import AsyncExec, ct

app = Flask(__name__)
APP_VERSION = '1.0'


@app.route("/")
def render_infoscreen():
    url_for('static', filename='style.css')

    meals_future = AsyncExec.create_and_start(utils.getmeals, name='GET MEALS')
    postillon_ticker_future = AsyncExec.create_and_start(
        utils.postillon_ticker, name='POSTILLON')
    latest_news_future = AsyncExec.create_and_start(utils.get_news,
                                                    name='NEWS')
    departure_future = AsyncExec.create_and_start(utils.all_departures,
                                                  name='DEPARTURES')

    meals = meals_future.wait()
    postillon_ticker = postillon_ticker_future.wait()
    latest_news = markdown(latest_news_future.wait())

    dep_helmholtz, dep_muenchner, dep_tu = departure_future.wait()

    return render_template("template_infoscreen.json", meals=meals,
                           ticker=postillon_ticker,
                           ticker_time=int(len(postillon_ticker) / 5),
                           article=latest_news,
                           HhBus=dep_helmholtz,
                           MPBus=dep_muenchner,
                           TuBus=dep_tu)


@app.route("/meals")
def json_meals():
    return json.dumps(utils.getmeals())


@app.route("/postillon")
def json_postillon():
    return json.dumps(utils.postillon_ticker())


@app.route("/news")
def json_news():
    return json.dumps(utils.get_news())


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
    app.debug = True
    app.run()
