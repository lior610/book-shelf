from flask import Flask, jsonify, request
from pymongo import MongoClient

MONGO_IP = "192.168.164.136"
MONGO_PORT = 27017

# Create the flask app and creates connections to the db
app = Flask(__name__)
client = MongoClient(MONGO_IP, MONGO_PORT)
db = client.library


def get_all_genres_languages(objects_response):

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
    return jsonify(list(collection.find({}, {'_id' : False})))


@app.route("/genres")
def all_genres():

    collection = db.genres
    genres_dict = list(collection.find({}, {'_id': False}))
    return jsonify(get_all_genres_languages(genres_dict))


@app.route("/languages")
def all_languages():

    collection = db.languages
    lang_dict = list(collection.find({}, {'_id': False}))
    return jsonify(get_all_genres_languages(lang_dict))


@app.route("/author/<string:author>")
def book_by_author(author):

    collection = db.books
    author_query = { "by" : author }
    return jsonify(list(collection.find(author_query, {'_id': False})))


@app.route("/genre/<string:genre>")
def book_by_genre(genre):

    collection = db.books
    genre_query = { "genres" : { "$in" : [genre] } }
    return jsonify(list(collection.find(genre_query, {'_id': False})))

@app.route("/filter/<string:genre>/<string:language>")
def filter_books(genre, language):

    collection = db.books
    query = { "genres" : { "$in" : [genre] }, "languages" : { "$in" : [language] } }
    return jsonify(list(collection.find(query, {'_id': False})))



@app.route("/language/<string:lang>")
def book_by_lang(lang):

    collection = db.books
    genre_query = { "languages" : { "$in" : [lang] } }
    return jsonify(list(collection.find(genre_query, {'_id': False})))


@app.route("/Add", methods = ["GET", "POST"])
def add_book():
    """Adding new book to the database.
    The data is acquired from the form in the book form html.
    
    Keyword arguments:
    no arguments
    Return: successfully added message
    """

    collection = db.books
    if request.method == "GET":
        return "Added Successfully"
    else:
        payload_immutable = request.form
        payload_dict = dict(payload_immutable)

        # Save the multiple values
        languages = payload_immutable.getlist("languages")
        genres = payload_immutable.getlist("genres")
        
        # Updates the dictionary with multiple values and send it
        payload_dict["languages"] = languages
        payload_dict["genres"] = genres
        print(payload_dict)
        id = collection.insert_one(payload_dict)
        print(id.inserted_id)
        return f"{id.inserted_id}"


@app.route("/<string:name>")
def one_book(name):
    """Gets a book by it's name from the database.
    If the book doesn't exist it returns null.
    
    Keyword arguments:
    name -- The name of the book
    Return: json with name: null if the book doesn't exists,
    json with all the book data if it's exists.
    """
    
    collection = db.books
    book = collection.find_one({"name": f"{name}".title()}, {'_id' : False})
    print(book)
    if book == None:
        return jsonify("{'name': 'null'}")
    return jsonify(collection.find_one({"name": f"{name}".title()}, {'_id' : False}))


if __name__ == "__main__":
    app.run("localhost", 5001)
