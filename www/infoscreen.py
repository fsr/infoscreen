from flask import Flask, render_template
import utils
app = Flask(__name__)


@app.route("/")
def render_infoscreen():
    meals = utils.getmeals()
    postillon_ticker = utils.postillon_ticker()
    return render_template("infoscreen.html", meals=meals,
                           ticker=postillon_ticker)

if __name__ == "__main__":
    app.run()
