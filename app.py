from flask import Flask, render_template

app = Flask(__name__)

# Route for the menu page
@app.route("/")
def menu():
    return render_template("menu.html")

# Route for the game page
@app.route("/game")
def game():
    return render_template("game.html")

if __name__ == "__main__":
    app.run(debug=True)
