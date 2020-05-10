from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
import random
import string
from db import User, Contacts

app = Flask(__name__)

# CORS stands for Cross Origin Requests.
CORS(app)  # Here we'll allow requests coming from any domain. Not recommended for production environment.


# users = {
#     'users_list' :
#     [
#         {
#             'id' : 'xyz789',
#             'name' : 'Charlie',
#             'job': 'Janitor',
#         },
#         # {
#         #     'id' : 'abc123',
#         #     'name': 'Mac',
#         #     'job': 'Bouncer',
#         # },
#         # {
#         #     'id' : 'ppp222',
#         #     'name': 'Mac',
#         #     'job': 'Professor',
#         # },
#         # {
#         #     'id' : 'yat999',
#         #     'name': 'Dee',
#         #     'job': 'Aspring actress',
#         # },
#         # {
#         #      'id' : 'zap555',
#         #     'name': 'Dennis',
#         #     'job': 'Bartender',
#         # }
#     ]
# }

@app.route('/users/<id>/contacts/<id>', methods=['POST', 'DELETE'])
def get_contact(userId, contactId):
    if request.method == 'DELETE':
        user = User({"_id": userId})
        contacts = user['contact_list']
        contacts.remove(contactId)
        resp = user.reload()
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
        if resp["n"] == 1 :
            return jsonify(success=True), 200
        return {}, 204
        resp = jsonify(newUser), 201
        return resp


# def find_users_by_name(name):
#     subdict = {'users_list' : []}
#     for user in users['users_list']:
#         if user['name'] == name:
#             subdict['users_list'].append(user)
#     return subdict

def find_users_by_name_job(name, job):
    subdict = {'users_list': []}
    for user in subdict['users_list']:
        if user['name'] == name and user['job'] == job:
            subdict['users_list'].append(user)
    return subdict

# def generate_id():
#     lettersAndDigits = string.ascii_letters + string.digits
#     return ''.join((random.choice(lettersAndDigits) for i in range(6)))
