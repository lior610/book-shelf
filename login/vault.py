import logging
from flask import Flask, jsonify, request
from pymongo import MongoClient, errors
import os
import sys

CONNECTION_STRING = os.environ["ATLAS_CONNECTION_STRING"]

# Create the flask app and creates connections to the db
app = Flask(__name__)
client = MongoClient(CONNECTION_STRING)

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()
logger.addHandler(logging.StreamHandler(sys.stdout))
logger.addHandler(logging.FileHandler('app.log', mode='w'))

try: 
    client.list_database_names()
except errors.ServerSelectionTimeoutError:
    logging.error("IP is not approved in Atlas")


db = client.login

def generate_return_dict(reason):
    """Helper function to generate response to the HTML login page in
    case of success or failure.
    
    Keyword arguments:
    reason -- If the username or password is wrong - which one is wrong
    Return: dictionary to the HTML login page to show successful or not login
    """
    
    return_dict = {"login": False}
    if reason == "username":
        return_dict["reason"] = "username_not_exist"
        return return_dict
    elif reason == "password":
        return_dict["reason"] = "password_incorrect"
        return return_dict
    else:
        return_dict["login"] = True
        return return_dict


@app.route("/", methods=['POST'])
def main():
    """Secure way to check password in the db.
    Uses POST request to get the credentials and check them.
    
    Keyword arguments:
    Gets the credentials from the POST request body
    Return: successful or not login and reason in JSON.
    """
    
    collection = db.users
    username, password = request.json['username'], request.json['pass_hash']
    crerdentials_query = {"username": username}
    user_credentials = collection.find(crerdentials_query, {'_id': False})
    try:
        username = user_credentials[0]['username']
    except IndexError:
        logging.info("Invalid username: %s", username)
        return jsonify(generate_return_dict("username"))
    else:
        if password == user_credentials[0]['password']:
            logging.info("Successful login for user: %s", username)
            return jsonify(generate_return_dict("success"))
        else:
            logging.info("Incorrect password for user: %s", username)
            return jsonify(generate_return_dict("password"))


@app.route("/signup", methods=["GET", "POST"])
def signup():
    collection = db.users
    if request.method == 'GET':
        return "Added Successfully"
    else:
        user_details = dict(request.form)
        user_details.pop("confirm-password")
        id = collection.insert_one(user_details)
        logging.info("New user signed up with ID: %s", id.inserted_id)
        return f"{id.inserted_id}"


if __name__ == "__main__":
    app.run("127.0.0.1", 6000)
import logging
from flask import Flask, jsonify, request
from pymongo import MongoClient, errors
import os

CONNECTION_STRING = os.environ["ATLAS_CONNECTION_STRING"]

# Create the flask app and creates connections to the db
app = Flask(__name__)
client = MongoClient(CONNECTION_STRING)

# Set up logging
logging.basicConfig(level=logging.INFO, filename='app.log', filemode='w', format='%(asctime)s - %(levelname)s - %(message)s')

try: 
    client.list_database_names()
except errors.ServerSelectionTimeoutError:
    logging.error("IP is not approved in Atlas")


db = client.login

def generate_return_dict(reason):
    """Helper function to generate response to the HTML login page in
    case of success or failure.
    
    Keyword arguments:
    reason -- If the username or password is wrong - which one is wrong
    Return: dictionary to the HTML login page to show successful or not login
    """
    
    return_dict = {"login": False}
    if reason == "username":
        return_dict["reason"] = "username_not_exist"
        return return_dict
    elif reason == "password":
        return_dict["reason"] = "password_incorrect"
        return return_dict
    else:
        return_dict["login"] = True
        return return_dict


@app.route("/", methods=['POST'])
def main():
    """Secure way to check password in the db.
    Uses POST request to get the credentials and check them.
    
    Keyword arguments:
    Gets the credentials from the POST request body
    Return: successful or not login and reason in JSON.
    """
    
    collection = db.users
    username, password = request.json['username'], request.json['pass_hash']
    crerdentials_query = {"username": username}
    user_credentials = collection.find(crerdentials_query, {'_id': False})
    try:
        username = user_credentials[0]['username']
    except IndexError:
        logging.info("Invalid username: %s", username)
        return jsonify(generate_return_dict("username"))
    else:
        if password == user_credentials[0]['password']:
            logging.info("Successful login for user: %s", username)
            return jsonify(generate_return_dict("success"))
        else:
            logging.info("Incorrect password for user: %s", username)
            return jsonify(generate_return_dict("password"))


@app.route("/signup", methods=["GET", "POST"])
def signup():
    collection = db.users
    if request.method == 'GET':
        return "Added Successfully"
    else:
        user_details = dict(request.form)
        user_details.pop("confirm-password")
        id = collection.insert_one(user_details)
        logging.info("New user signed up with ID: %s", id.inserted_id)
        return f"{id.inserted_id}"


if __name__ == "__main__":
    app.run("127.0.0.1", 6000)
