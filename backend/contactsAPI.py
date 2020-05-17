from flask import Flask, Response
from flask import request
from flask import jsonify
from flask_cors import CORS
import random
import string
from database import User, Contacts

app = Flask(__name__)

# CORS stands for Cross Origin Requests.
CORS(app)  # Here we'll allow requests coming from any domain. Not recommended for production environment.

@app.route('/api/<userId>/contacts', methods=['POST', 'DELETE', 'PATCH', 'GET'])
def get_contacts(userId):
    if request.method == 'GET':
        user = User({"_id": userId})
        user.reload()
        contact_ids  = user['contact_list']
        resp = Contacts().find_by_ids(contact_ids)
        return jsonify(contact, success=True), 200



@app.route('/api/<userId>/contacts/<contactId>', methods=['POST', 'DELETE', 'PATCH', 'GET'])
def get_contact(userId, contactId):
    if request.method == 'POST':
        return add_contact(userId)

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

    if request.method == 'GET':
        contact = Contacts().find_by_id(contactId)
        if contact == []:
            return {}, 404

        return jsonify(contact, success=True), 200

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


@app.route('/login', methods=['POST'])
def get_user():
    if request.method == 'POST':
        user = request.get_json()['user']

        possible_users = User().find_by_username(user['username'])
        password = user['password']

        for possible_user in possible_users:
            if possible_user['password'] == password:
                user = possible_user

        if (user):
            resp = Response()
            resp.status_code = 200
            resp.headers['WWW-Authenticate'] = 'Basic realm=Access to contacts'
            return resp
        return Response(status=401)

@app.route('/create_account', methods=['POST'])
def create_user():
    if request.method == 'POST':
        user = User(request.get_json())
        possible_users = user.find_by_username(request.args.get('username'))
        if possible_users != []:
            return 403

        user['contact_list'] = {}
        resp = user.save()

        if resp['n'] == 1:
            return jsonify(success=True), 201
        return {}, 204

if __name__ == "__main__":
    app.run()
