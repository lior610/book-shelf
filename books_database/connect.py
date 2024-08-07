import logging
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient, errors
import os
import sys

CONNECTION_STRING = os.environ["ATLAS_CONNECTION_STRING"]

# Create the flask app and create connections to the db
app = Flask(__name__)
CORS(app)
client = MongoClient(CONNECTION_STRING)

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()
logger.addHandler(logging.StreamHandler(sys.stdout))
logger.addHandler(logging.FileHandler('app.log', mode='w'))

try: 
    client.list_database_names()
except errors.ServerSelectionTimeoutError:
    logging.error("IP is not approved in atlas")


db = client.library


def get_all_genres_languages(objects_response):
    """generate languages lists
    
    Keyword arguments:
    object_response -- the response from the db - dictionary
    Return: A list that the site can work with
    """
    
    objects_list = []
    for object in objects_response:
        objects_list.append(object["name"]) 
    
    return objects_list


@app.route("/")
def all_books():
    """Gets a list of the books from the database.
    
    Keyword arguments:
    no arguments
    Return: Json of all the books in the database
    """

    collection = db.books
    logging.info("all books query")
    return jsonify(list(collection.find({}, {'_id' : False})))


@app.route("/genres")
def all_genres():
    """DB query to get all genres from a collection
    
    Keyword arguments:
    Return: A list of all the genres.
    """
    

    collection = db.genres
    logging.info("all Genres query")
    genres_dict = list(collection.find({}, {'_id': False}))
    return jsonify(get_all_genres_languages(genres_dict))


@app.route("/languages")
def all_languages():
    """DB query to get all the languages from a collection
    
    Keyword arguments:
    Return: a list of all the languages.
    """
    

    collection = db.languages
    logging.info("all languages query")
    lang_dict = list(collection.find({}, {'_id': False}))
    return jsonify(get_all_genres_languages(lang_dict))


@app.route("/author/<string:author>")
def book_by_author(author):
    """All the books that were written by author
    
    Keyword arguments:
    argument -- The name of author (string)
    Return: A list of all the books object that were written by the same author
    """
    

    collection = db.books
    author_query = { "by" : author }
    logging.info(f"Author Query: {author_query}")
    return jsonify(list(collection.find(author_query, {'_id': False})))


@app.route("/genre/<string:genre>")
def book_by_genre(genre):
    """All the books from the same genre
    
    Keyword arguments:
    argument -- The genre (string)
    Return: A list of all the books object from that genre
    """


    collection = db.books
    genre_query = { "genres" : { "$in" : [genre] } }
    logging.info(f"Genre Query: {genre_query}")
    return jsonify(list(collection.find(genre_query, {'_id': False})))


@app.route("/filter/<string:genre>/<string:language>")
def filter_books(genre, language):
    """Filter books by genres and language
    
    Keyword arguments:
    genre --  The genre we want to filter by
    language -- The language we want to filter by
    Return: A list of book object that matches the genre and language
    """
    
    collection = db.books
    query = { "genres" : { "$in" : [genre] }, "languages" : { "$in" : [language] } }
    logging.info(f"Filter Query: {query}")
    return jsonify(list(collection.find(query, {'_id': False})))


@app.route("/language/<string:lang>")
def book_by_lang(lang):
    """All the books from the same language
    
    Keyword arguments:
    argument -- The language (string)
    Return: A list of all the books object from that language
    """


    collection = db.books
    genre_query = { "languages" : { "$in" : [lang] } }
    logging.info(f"Language Query: {genre_query}")
    return jsonify(list(collection.find(genre_query, {'_id': False})))


@app.route("/Add", methods=["GET", "POST"])
def add_book():
    """Adding a new book to the database.
    The data is acquired from the form in the book form HTML.
    
    Keyword arguments:
    no arguments
    Return: successfully added message
    """

    collection = db.books
    if request.method == "GET":
        return "Added Successfully"
    else:
        payload_dict = dict(request.json)

        logging.info(f"Payload: {payload_dict}")
        id = collection.insert_one(payload_dict)
        logging.info(f"Inserted ID: {id.inserted_id}")
        return str(id.inserted_id)


@app.route("/<string:name>")
def one_book(name):
    """Gets a book by its name from the database.
    If the book doesn't exist, it returns null.
    
    Keyword arguments:
    name -- The name of the book
    Return: JSON with name: null if the book doesn't exist,
    JSON with all the book data if it exists.
    """
    
    collection = db.books
    book = collection.find_one({"name": f"{name}".title()}, {'_id': False})
    logging.info(f"Book: {book}")
    if book is None:
        return jsonify({"name": "null"})
    return jsonify(collection.find_one({"name": f"{name}".title()}, {'_id': False}))


if __name__ == "__main__":
    app.run("0.0.0.0", 5001)
