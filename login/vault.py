from flask import Flask, jsonify, request
from pymongo import MongoClient

MONGO_IP = "192.168.164.136"
MONGO_PORT = 27017

# Create the flask app and creates connections to the db
app = Flask(__name__)
client = MongoClient(MONGO_IP, MONGO_PORT)
db = client.login

def generate_return_dict(reason):
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