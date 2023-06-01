from flask import Flask, render_template
import requests

API_GET_BOOK = "http://127.0.0.1:5001/{}"
API_ALL_BOOKS = "http://127.0.0.1:5001/"
API_ALL_LANGUAGES = "http://127.0.0.1:5001/languages"
API_ALL_GENRES = "http://127.0.0.1:5001/genres"

app = Flask(__name__)


@app.route('/<string:book_name>')
def one_book(book_name):
    book_info = requests.get(API_GET_BOOK.format(book_name)).json()
    print(book_info)
    return render_template("book.html", book_info=book_info)


@app.route("/")
def main():
    languages = list(requests.get(API_ALL_LANGUAGES).json())
    print(languages)
    genres = list(requests.get(API_ALL_GENRES).json())
    book_info = requests.get(API_ALL_BOOKS).json()
    return render_template("index.html", books=book_info, genres=genres, languages=languages)

if __name__ == "__main__":
    app.run("127.0.0.1", 5002)