from flask import Flask, jsonify, request
from pymongo import MongoClient

MONGO_IP = "192.168.164.135"
MONGO_PORT = 27017

# Create the flask app and creates connections to the db
app = Flask(__name__)
client = MongoClient(MONGO_IP, MONGO_PORT)
db = client.login

@app.route("/")
def main():
    pass


if __name__ == "__main__":
    app.run("localhost", 6000)