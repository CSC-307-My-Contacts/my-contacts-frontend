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
    user: false,
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

  tokenRequest(username, password, callback, type) {
    axios
      .post("http://localhost:5000/" + type, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ token: res.data.token });
          callback(false);
        } else {
          callback(false);
        }
      })
      .catch((error) => {
        console.log(error);
        callback(false);
      });
  }

  contactsRequest(callback) {
    axios
      .get("http://localhost:5000/", {
        headers: { token: this.state.token },
      })
      .then((res) => {
        const contacts = res.data.contact_list;
        this.setState({ contacts: contacts });
        callback();
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  saveContact(contact, cb) {}

  deleteContact(cid, cb) {}

  login(username, password, callback) {
    this.tokenRequest(
      username,
      password,
      (success) => {
        if (success) this.contactsRequest(callback);
        else callback(false);
      },
      "login"
    );
  }

  isLoggedIn() {
    return this.state.user !== false;
  }

  logout(cb) {
    this.setState({ user: false, contacts: [] });
    cb();
  }

  registerUser(username, password, callback) {
    this.tokenRequest(username, password, callback, "create");
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
