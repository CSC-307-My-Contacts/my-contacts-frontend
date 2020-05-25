import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import axios from "axios";

import Login from "./Login";
import Register from "./Register";
import Mission from "./Mission";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

class App extends Component {
  API_ROOT = "http://localhost:5000/";
  API_LOGIN = "login";
  API_CREATE = "create";

  LOGGED_OUT_STATE = {
    token: false,
    contacts: [],
  };

  constructor(props) {
    super(props);

    this.state = this.LOGGED_OUT_STATE;

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.saveContact = this.saveContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.importCsv = this.importCsvRequest.bind(this);
  }

  tokenRequest(type, username, password, callback) {
    axios
      .post(this.API_ROOT + type, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ token: res.data.token });
          callback(true);
        } else {
          callback(false);
        }
      })
      .catch((error) => {
        console.log(error);
        callback(false);
      });
  }

  contactsRequest() {
    axios
      .get(this.API_ROOT, {
        headers: { token: this.state.token },
      })
      .then((res) => {
        console.log(res);
        const contacts = res.data.contacts;
        this.setState({ contacts: contacts });
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  saveContactRequest(contact, callback) {
    axios
      .post(
        this.API_ROOT,
        {
          contact: contact,
        },
        {
          headers: { token: this.state.token },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          callback(res.data.contact);
        }
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  deleteContactRequest(id, callback) {
    axios
      .delete(this.API_ROOT, {
        headers: { token: this.state.token },
        data: { _id: id },
      })
      .then((res) => {
        if (res.status === 204) {
          callback();
        }
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  importCsvRequest(data, callback) {
    axios
      .post(this.API_ROOT + "csv", data)
      .then((res) => {
        if (res.status === 200) {
          callback();
        }
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  importCsv(data) {
    this.importCsvRequest(data, () => {});
  }

  deleteContact(id, callback) {
    this.deleteContactRequest(id, () => {
      const contacts = this.state.contacts;
      this.setState({
        contacts: contacts.filter((c) => {
          return c._id !== id;
        }),
      });
      callback();
    });
  }

  login(username, password, callbackFailure) {
    this.tokenRequest(this.API_LOGIN, username, password, (success) => {
      if (success) this.contactsRequest();
      else callbackFailure();
    });
  }

  isLoggedIn() {
    return this.state.token !== false;
  }

  logout() {
    this.setState(this.LOGGED_OUT_STATE);
  }

  registerUser(username, password, callbackFailure) {
    this.tokenRequest(this.API_CREATE, username, password, (result) => {
      if (!result) callbackFailure();
    });
  }

  saveContact(contact, callback) {
    this.saveContactRequest(contact, (c) => {
      console.log(c);
      const contacts = this.state.contacts;
      this.setState({
        contacts: [
          ...contacts.filter((con) => {
            return con._id !== c._id;
          }),
          c,
        ],
      });
      callback();
    });
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.isLoggedIn() ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );

    const AccountRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          !this.isLoggedIn() ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );

    return (
      <Router>
        <Switch>
          <AccountRoute path="/login" component={Login} login={this.login} />
          <AccountRoute
            path="/register"
            component={Register}
            registerUser={this.registerUser}
          />
          <Route path="/mission" component={Mission} />
          <PrivateRoute
            path="/create"
            component={ContactForm}
            saveContact={this.saveContact}
          />
          <PrivateRoute
            path="/edit/:id"
            component={ContactForm}
            contacts={this.state.contacts}
            saveContact={this.saveContact}
          />
          <PrivateRoute
            path="/"
            component={ContactList}
            contacts={this.state.contacts}
            logout={this.logout}
            deleteContact={this.deleteContact}
            importCsv={this.importCsv}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
