import logging
from flask import Flask, render_template, request
import requests
import sys

API_ADD_URL = "http://127.0.0.1:5001/Add"
API_LANGUAGES_URL = "http://127.0.0.1:5001/languages"
API_GENRES_URL = "http://127.0.0.1:5001/genres"

app = Flask(__name__)

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()
logger.addHandler(logging.StreamHandler(sys.stdout))
logger.addHandler(logging.FileHandler('app.log', mode='w'))


@app.route('/', methods=['GET', 'POST'])
def form():
    """form function that asks the user to add a book.
    Passes the data to the API so it will be in the database.

    Keyword arguments:
    No arguments
    Return: HTML form in case of GET request.
    Success in case of POST request.
    """

    if request.method == 'GET':
        logger.info("Rendering form")
        genres_list = requests.get(API_GENRES_URL).json()
        languages_list = requests.get(API_LANGUAGES_URL).json()

        return render_template("index.html", genres=genres_list, languages=languages_list)
    else:
        # Gets the data and converts it to a dictionary
        payload_immutable = request.form
        logger.info("Received form data: %s", payload_immutable)
        payload_dict = dict(payload_immutable)

        # Save the multiple values
        languages = payload_immutable.getlist("languages")
        genres = payload_immutable.getlist("genres")

        # Updates the dictionary with multiple values and sends it
        payload_dict["languages"] = languages
        payload_dict["genres"] = genres
        payload_dict["name"] = payload_dict["name"].title()

        logger.info("Sending data to API: %s", payload_dict)
        req = requests.post(API_ADD_URL, payload_dict)

        logger.info("API response: %s", req.text)
        return req.text


if __name__ == "__main__":
    app.run("127.0.0.1", 5000)
