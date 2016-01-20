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

    dep_helmholtz, dep_muenchner, dep_tu = utils.all_departures()

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
