from pymongo import MongoClient
from flask import Flask, jsonify
# import pprint

app = Flask(__name__)

@app.route("/")
def main():
    client = MongoClient("192.168.164.129", 27017)
    db = client.library
    collection = db.books
    # print(collection.find_one({"name": "the hunger games".title()}, {'_id' : False}))
    return jsonify(collection.find_one({"name": "the hunger games".title()}, {'_id' : False}))


if __name__ == "__main__":
    # main()
    app.run("localhost", 5000)