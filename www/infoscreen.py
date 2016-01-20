from flask import Flask, render_template, url_for
from flask.ext.misaka import markdown
import utils
app = Flask(__name__)


@app.route("/")
def render_infoscreen():
    url_for('static', filename='style.css')

    meals = utils.getmeals()
    postillon_ticker = utils.postillon_ticker()
    latest_news = markdown(utils.get_news())

    dep_helmholtz = utils.get_departures('Helmholtzstrasse',
                                         'Dresden', 3)
    dep_muenchner = utils.get_departures('Muenchner%20Platz',
                                         'Dresden', 3)
    dep_tu = utils.get_departures('Technische%20Universitaet',
                                  'Dresden', 3)
    return render_template("infoscreen.html", meals=meals,
                           ticker=postillon_ticker,
                           ticker_time=int(len(postillon_ticker)/5),
                           article=latest_news,
                           HhBus=dep_helmholtz,
                           MPBus=dep_muenchner,
                           TuBus=dep_tu)

if __name__ == "__main__":
    app.run()
