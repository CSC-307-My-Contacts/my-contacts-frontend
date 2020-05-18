import pymongo
from bson import ObjectId


class Model(dict):
    """
    A simple model that wraps mongodb document
    """
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__

    def save(self):
        if not self._id:
            self.collection.insert(self)
        else:
            self.collection.update(
                {"_id": ObjectId(self._id)}, self)
        self._id = str(self._id)

    def reload(self):
        if self._id:
            self.update(self.collection \
                        .find_one({"_id": ObjectId(self._id)}))
            self._id = str(self._id)

    def remove(self):
        if self._id:
            resp = self.collection.remove({"_id": ObjectId(self._id)})
            self.clear()
            return resp


class User(Model):
    db_client = pymongo.MongoClient('localhost', 27017)
    collection = db_client["MyContactsApp"]["users_list"]

    def find_all(self):
        users = list(self.collection.find())
        for user in users:
            user["_id"] = str(user["_id"])
        return users

    def find_by_username(self, username):
        users = list(self.collection.find({"username": username}))
        return users


class Contacts(Model):
    db_client = pymongo.MongoClient('localhost', 27017)
    collection = db_client["MyContactsApp"]["contacts_list"]

    def find_by_id(self, id):
        contacts = list(self.collection.find({"_id": id}))
        for contact in contacts:
            contact["_id"] = str(contact["_id"])
        return contacts

    def find_by_ids(self, ids):
        contacts = []
        for id in ids:
            # TODO THIS SHOULD BE DONE IN THE DATABASE
            contacts = contacts + list(self.collection.find({'_id' : id}))
        #allContacts = list(self.collection.find({}))
        #for x in range(len(allContacts)):
        #    print(x, ids)
        #    if ids[x] is allContacts[x]["_id"]:
        #        contacts.append(allContacts[x])
        return contacts
