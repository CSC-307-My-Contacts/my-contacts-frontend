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
    contacts: [],
  };

  constructor(props) {
    super(props);

    this.authenticate = this.authenticate.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.saveContact = this.saveContact.bind(this);
  }

  authenticate = (id, cb) => {
    this.fetchContacts(id, cb);
  };

  isAuthenticated() {
    return this.state.user !== false;
  }

  fetchContacts(id, cb) {
    axios
      .get("http://localhost:5000/api/" + id + "/contacts")
      .then((res) => {
        const contacts = res.data.contact_list;
        this.setState({ contacts: contacts, user: id });
        cb();
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  saveContact(contact, cb) {
    axios
      .post("http://localhost:5000/api/contact", {
        user: this.state.user,
        contact: contact,
      })
      .then((response) => {
        if (response.status === 200) {
          let { contacts } = this.state.contacts;
          contacts = contacts
            .filter((c) => c.id !== contact.id)
            .push(response.data.contact);
          this.setState({ contacts: contacts });
          cb();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.isAuthenticated() ? (
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
          !this.isAuthenticated() ? (
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
          <AccountRoute
            path="/login"
            component={Login}
            authenticate={this.authenticate}
          />
          <AccountRoute path="/register" component={Register} />

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
          />
        </Switch>
      </Router>
    );
  }
}

export default App;