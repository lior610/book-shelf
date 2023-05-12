from flask import Flask, render_template, request
import requests

API_ADD_URL = "http://127.0.0.1:5001/Add"
API_LANGUAGES_URL = "http://127.0.0.1:5001/languages"
API_GENRES_URL = "http://127.0.0.1:5001/genres"

app = Flask(__name__)


@app.route('/', methods = ['GET', 'POST'])
def form():
    """form function that asks from the user to add a book.
    pass the data to the api so it will be in the sb.
    
    Keyword arguments:
    no arguments
    Return: HTML form in case of GET request.
    success in case of POST request
    """
    
    if request.method == 'GET':
        
        genres_list = requests.get(API_GENRES_URL).json()
        languages_list = requests.get(API_LANGUAGES_URL).json()

        return render_template("index.html", genres=genres_list, languages=languages_list)
    else:
        # Gets the data and converts it to dictionary
        payload_immutable = request.form
        print(payload_immutable)
        payload_dict = dict(payload_immutable)

        # Save the multiple values
        languages = payload_immutable.getlist("languages")
        genres = payload_immutable.getlist("genres")
        
        # Updates the dictionary with multiple values and send it
        payload_dict["languages"] = languages
        payload_dict["genres"] = genres
        payload_dict["name"] = payload_dict["name"].title()
        req = requests.post(API_ADD_URL, payload_dict)
        return(req.text)

if __name__ == "__main__":
    app.run("127.0.0.1", 5000)