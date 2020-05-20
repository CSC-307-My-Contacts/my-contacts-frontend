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
  state = {
    token: false,
    contacts: [],
  };

  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.saveContact = this.saveContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }

  tokenRequest(type, username, password, callbackFailure) {
    axios
      .post("http://localhost:5000/" + type, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ token: res.data.token });
        } else {
          callbackFailure();
        }
      })
      .catch((error) => {
        console.log(error);
        callbackFailure();
      });
  }

  contactsRequest() {
    axios
      .get("http://localhost:5000/", {
        headers: { token: this.state.token },
      })
      .then((res) => {
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
        "http://localhost:5000/",
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

  deleteContact(cid, cb) {}

  login(username, password, callbackFailure) {
    this.tokenRequest("login", username, password, (success) => {
      if (success) this.contactsRequest();
      else callbackFailure();
    });
  }

  isLoggedIn() {
    return this.state.token !== false;
  }

  logout() {
    this.setState({ token: false, contacts: [] });
  }

  registerUser(username, password, callbackFailure) {
    this.tokenRequest("create", username, password, callbackFailure);
  }

  saveContact(contact, callback) {
    this.saveContactRequest(contact, (c) => {
      const contacts = this.state.contacts;
      this.setState({
        contacts: [
          ...contacts.filter((con) => {
            return con.uid !== c.uid;
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
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
