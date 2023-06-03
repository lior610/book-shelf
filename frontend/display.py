from flask import Flask, render_template, request
import requests

API_BASE_URL = "http://127.0.0.1:5001/"
API_GET_BOOK = "{}{}".format(API_BASE_URL, "{}")
API_ALL_LANGUAGES = "{}languages".format(API_BASE_URL)
API_ALL_GENRES = "{}genres".format(API_BASE_URL)

API_FILTER = "{}filter/{}/{}".format(API_BASE_URL, "{}", "{}")
API_BY_GENRE = "{}genre/{}".format(API_BASE_URL, "{}")
API_BY_LANGUAGE = "{}language/{}".format(API_BASE_URL, "{}")


app = Flask(__name__)


@app.route('/<string:book_name>')
def one_book(book_name):
    book_info = requests.get(API_GET_BOOK.format(book_name)).json()
    print(book_info)
    return render_template("book.html", book_info=book_info)


@app.route("/")
def main():

    languages = list(requests.get(API_ALL_LANGUAGES).json())
    genres = list(requests.get(API_ALL_GENRES).json())

    language_filter = request.args.get('language', default = "*", type = str)
    genre_filter = request.args.get('genre', default = "*", type = str)
    if language_filter == "*" and genre_filter == "*":
        book_info = requests.get(API_BASE_URL).json()   
    elif language_filter == "*":
        book_info = requests.get(API_BY_GENRE.format(genre_filter.title())).json()
    elif genre_filter == "*":
        book_info = requests.get(API_BY_LANGUAGE.format(language_filter.title())).json()
    else:
        book_info = requests.get(API_FILTER.format(genre_filter.title(), language_filter.title())).json()

    return render_template("index.html", books=book_info, genres=genres, languages=languages)

if __name__ == "__main__":
    app.run("127.0.0.1", 5002)