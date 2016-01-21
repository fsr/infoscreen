from flask import Flask, render_template, url_for
from flask.ext.misaka import markdown
import utils
app = Flask(__name__)

from utils.simple_async import AsyncExec, ct


@app.route("/")
def render_infoscreen():
    url_for('static', filename='style.css')

    meals_future = AsyncExec.create_and_start(utils.getmeals, name='GET MEALS')
    postillon_ticker_future = AsyncExec.create_and_start(utils.postillon_ticker, name='POSTILLON')
    latest_news_future = AsyncExec.create_and_start(utils.get_news, name='NEWS')
    departure_future = AsyncExec.create_and_start(utils.all_departures, name='DEPARTURES')

    meals = meals_future.wait()
    postillon_ticker = postillon_ticker_future.wait()
    latest_news = markdown(latest_news_future.wait())

    dep_helmholtz, dep_muenchner, dep_tu = departure_future.wait()

    return render_template("infoscreen.html", meals=meals,
                           ticker=postillon_ticker,
                           ticker_time=int(len(postillon_ticker) / 5),
                           article=latest_news,
                           HhBus=dep_helmholtz,
                           MPBus=dep_muenchner,
                           TuBus=dep_tu)

if __name__ == "__main__":
    app.debug = True
    app.run()
