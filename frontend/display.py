from flask import Flask, render_template, request, redirect, url_for
import requests
import hashlib

API_BASE_URL = "http://127.0.0.1:5001/"
API_GET_BOOK = "{}{}".format(API_BASE_URL, "{}")
API_ALL_LANGUAGES = "{}languages".format(API_BASE_URL)
API_ALL_GENRES = "{}genres".format(API_BASE_URL)

API_FILTER = "{}filter/{}/{}".format(API_BASE_URL, "{}", "{}")
API_BY_GENRE = "{}genre/{}".format(API_BASE_URL, "{}")
API_BY_LANGUAGE = "{}language/{}".format(API_BASE_URL, "{}")

VAULT_BASE_URL = "http://127.0.0.1:6000/"


app = Flask(__name__)


@app.route('/<string:book_name>')
def one_book(book_name):
    """web page for one book
    
    Keyword arguments:
    book_name -- the name of the book that we want
    Return: The html rendered with the book info
    """
    
    book_info = requests.get(API_GET_BOOK.format(book_name)).json()
    print(book_info)
    return render_template("book.html", book_info=book_info)


@app.route("/list")
def main():
    """Welcome page that shows all books or filtered books.
    
    Keyword arguments:
    Return: html that rendered with all books or filtered books.
    """
    

    languages = list(requests.get(API_ALL_LANGUAGES).json())
    genres = list(requests.get(API_ALL_GENRES).json())

    language_filter = request.args.get('languages', default = "*", type = str)
    genre_filter = request.args.get('genres', default = "*", type = str)
    if language_filter == "*" and genre_filter == "*":
        book_info = requests.get(API_BASE_URL).json()
    elif language_filter == "*":
        book_info = requests.get(API_BY_GENRE.format(genre_filter.title())).json()
    elif genre_filter == "*":
        book_info = requests.get(API_BY_LANGUAGE.format(language_filter.title())).json()
    else:
        book_info = requests.get(API_FILTER.format(genre_filter.title(), language_filter.title())).json()

    return render_template("index.html", books=book_info, genres=genres, languages=languages)


@app.route('/', methods = ['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template("login.html", reason = "first_time")
    else:
        username = request.form['username']
        password = hashlib.sha256(request.form['password'].encode('utf-8')).hexdigest()
        credentials_object = {"username": username, "pass_hash": password}
        print(credentials_object)
        login_request = requests.post(VAULT_BASE_URL, json = credentials_object).json()
        print(login_request)
        if login_request['login']:
            return redirect(url_for("main"))
        return render_template("login.html", reason = login_request["reason"])


if __name__ == "__main__":
    app.run("127.0.0.1", 5002)