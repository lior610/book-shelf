import logging
from flask import Flask, render_template, request, redirect, url_for, session
import requests
import hashlib
import sys

API_BASE_URL = "http://172.17.0.1:5001/"
API_GET_BOOK = "{}{}".format(API_BASE_URL, "{}")
API_ALL_LANGUAGES = "{}languages".format(API_BASE_URL)
API_ALL_GENRES = "{}genres".format(API_BASE_URL)

API_FILTER = "{}filter/{}/{}".format(API_BASE_URL, "{}", "{}")
API_BY_GENRE = "{}genre/{}".format(API_BASE_URL, "{}")
API_BY_LANGUAGE = "{}language/{}".format(API_BASE_URL, "{}")

VAULT_BASE_URL = "http://172.17.0.1:6000/"
VAULT_ADD_USER = "{}signup".format(VAULT_BASE_URL)


app = Flask(__name__)
app.secret_key = 'What should I put here anyway?'

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()
logger.addHandler(logging.StreamHandler(sys.stdout))
logger.addHandler(logging.FileHandler('app.log', mode='w'))


@app.route('/<string:book_name>')
def one_book(book_name):
    """web page for one book
    
    Keyword arguments:
    book_name -- the name of the book that we want
    Return: The html rendered with the book info
    """
    if not session.get("name"):
        return redirect(url_for("login"))

    logger.info("Requesting book info for: %s", book_name)
    book_info = requests.get(API_GET_BOOK.format(book_name)).json()
    return render_template("book.html", book_info=book_info)


@app.route("/list")
def main():
    """Welcome page that shows all books or filtered books.
    
    Keyword arguments:
    Return: html that rendered with all books or filtered books.
    """
    
    if not session.get("name"):
        return redirect(url_for("login"))

    logger.info("Requesting all books")

    languages = list(requests.get(API_ALL_LANGUAGES).json())
    genres = list(requests.get(API_ALL_GENRES).json())

    language_filter = request.args.get('languages', default="*", type=str)
    genre_filter = request.args.get('genres', default="*", type=str)

    if language_filter == "*" and genre_filter == "*":
        logger.info("Getting all books")
        book_info = requests.get(API_BASE_URL).json()
    elif language_filter == "*":
        logger.info("Filtering books by genre: %s", genre_filter)
        book_info = requests.get(API_BY_GENRE.format(genre_filter.title())).json()
    elif genre_filter == "*":
        logger.info("Filtering books by language: %s", language_filter)
        book_info = requests.get(API_BY_LANGUAGE.format(language_filter.title())).json()
    else:
        logger.info("Filtering books by genre: %s and language: %s", genre_filter, language_filter)
        book_info = requests.get(API_FILTER.format(genre_filter.title(), language_filter.title())).json()

    return render_template("index.html", books=book_info, genres=genres, languages=languages)


@app.route('/', methods=['GET', 'POST'])
def login():
    """Login page and checking with the api
    
    Keyword arguments:
    Gets the credentials from the form and pass it to the api
    Return: login page if get request, redirects to home page if successful login
    """
    
    if request.method == 'GET':
        return render_template("login.html", reason="first_time")
    else:
        username = request.form['username']
        password = hashlib.sha256(request.form['password'].encode('utf-8')).hexdigest()
        credentials_object = {"username": username, "pass_hash": password}
        logger.info("Logging in with username: %s", username)

        login_request = requests.post(VAULT_BASE_URL, json=credentials_object).json()

        if login_request['login']:
            session["name"] = username
            logger.info("Successful login for username: %s", username)
            return redirect(url_for("main"))

        logger.warning("Login failed for username: %s. Reason: %s", username, login_request["reason"])
        return render_template("login.html", reason=login_request["reason"])


@app.route("/signup", methods=['GET', 'POST'])
def signup():
    if request.method == 'GET':
        return render_template("signup.html", reason="ok")
    else:
        user_details = dict(request.form)
        user_details["password"] = hashlib.sha256(user_details["password"].encode('utf-8')).hexdigest()
        user_details["confirm-password"] = hashlib.sha256(user_details["confirm-password"].encode('utf-8')).hexdigest()

        if user_details["password"] == user_details["confirm-password"]:
            logger.info("Signing up user: %s", user_details["username"])

            req = requests.post(VAULT_ADD_USER, user_details)
            if req.status_code != 200:
                logger.error("Failed to sign up user: %s. Status code: %s", user_details["username"], req.status_code)
                return render_template("signup.html", reason="status-code")
            else:
                logger.info("Successfully signed up user: %s", user_details["username"])
                return redirect(url_for("login"))
        else:
            logger.warning("Sign up failed for user: %s. Reason: Passwords don't match", user_details["username"])
            return render_template("signup.html", reason="passwords")


if __name__ == "__main__":
    app.run("0.0.0.0", 5002)
