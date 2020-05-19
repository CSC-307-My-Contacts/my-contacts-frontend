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
            self.uid = str(self._id)
        else:
            self.collection.update(
                    {"uid": self.uid}, self)
            self.uid = str(self._id)
        self.reload()

    def reload(self):
        if self.uid:
            result = self.collection.find_one({"uid": self.uid})
            if result :
                #self.update(result)
                self.uid = str(self.uid)
                return True
        return False

    def remove(self):
        if self.uid:
            resp = self.collection.remove({"uid": ObjectId(self.uid)})
            self.clear()
            return resp


class User(Model):
    db_client = pymongo.MongoClient('localhost', 27017)
    collection = db_client["MyContactsApp"]["users_list"]

    def find_by_username(self, username):
        return User(self.collection.find_one({"username": username}))

    def find_by_token(self, token):
        return User(self.collection.find_one({"token": token}))

    def fetch_contacts(self):
        return Contacts().find_by_ids(self['contact_list'])




class Contacts(Model):
    db_client = pymongo.MongoClient('localhost', 27017)
    collection = db_client["MyContactsApp"]["contacts_list"]

    def find_by_id(self, id):
        contact = self.collection.find_one({"uid": id})
        return Contacts(contact)

    def find_by_ids(self, ids):
        contacts = []
        for id in ids:
            contacts = contacts + list(self.collection.find({'uid' : id}))
        return contacts

