from flask import Flask, render_template
import utils
app = Flask(__name__)


@app.route("/")
def render_infoscreen():
    meals = utils.getmeals()
    return render_template("infoscreen.html", meals=meals)

if __name__ == "__main__":
    app.run()
