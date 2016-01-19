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
    return render_template("infoscreen.html", meals=meals,
                           ticker=postillon_ticker,
                           article=latest_news)

if __name__ == "__main__":
    app.run()
