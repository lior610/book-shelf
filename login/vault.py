from flask import Flask, jsonify, request
from pymongo import MongoClient, errors
import os

CONNECTION_STRING = os.environ["ATLAS_CONNECTION_STRING"]

# Create the flask app and creates connections to the db
app = Flask(__name__)
client = MongoClient(CONNECTION_STRING)

try: 
    client.list_database_names()
except errors.ServerSelectionTimeoutError:
    print("IP is not approved in atlas")


db = client.login

def generate_return_dict(reason):
    """Helper function to generate response to the html login page in
    case of success or failure.
    
    Keyword arguments:
    reason -- If the username or password is wrong - which one is wrong
    Return: dictionary to the html login page to show successful or not login
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


@app.route("/", methods = ['POST'])
def main():
    """Secure way to check password in the db.
    uses post request to get the credentials and check them.
    
    Keyword arguments:
    Gets the credentials from the post request body
    Return: successful or not login and reason in json.
    """
    
    
    collection = db.users
    username, password = request.json['username'], request.json['pass_hash']
    crerdentials_query = { "username" : username }
    user_credentials = collection.find(crerdentials_query, {'_id': False})
    try:
        username = user_credentials[0]['username']
    except IndexError:
        return jsonify(generate_return_dict("username"))
    else:
        if password == user_credentials[0]['pass_hash']:
            return jsonify(generate_return_dict("success"))
        else:
            return jsonify(generate_return_dict("password"))


if __name__ == "__main__":
    app.run("127.0.0.1", 6000)