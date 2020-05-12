from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
import random
import string
from database import User, Contacts

app = Flask(__name__)

# CORS stands for Cross Origin Requests.
CORS(app)  # Here we'll allow requests coming from any domain. Not recommended for production environment.

@app.route('/users/<userId>/contacts/<contactId>', methods=['POST', 'DELETE','PATCH'])
def get_contact(userId, contactId):
    if request.method == 'DELETE':
        user = User({"_id": userId})
        contacts = user['contact_list']
        contacts.remove(contactId)
        resp = user.reload()
        if resp["n"] == 1:
            return jsonify(success=True), 200
        return {}, 204
    if request.method == 'PATCH':
        contactToUpdate = request.get_json()
        contactToUpdate = Contacts(contactToUpdate)
        resp = contactToUpdate.save()
        if resp["n"] == 1:
            return jsonify(success=True), 200
        return {}, 204

def add_contact(userId):
    if request.method == 'POST':
        user = User({"_id": userId})
        contactToAdd = request.get_json()
        newContact = Contacts(contactToAdd)
        resp = newContact.save()
        user['contact_list'].append(str(newContact['_id']))
        if resp["n"] == 1:
            return jsonify(success=True), 200
        return {}, 204
