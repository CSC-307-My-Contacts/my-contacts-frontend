import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import axios from "axios";

import Login from "./Login";
import Register from "./Register";
import Mission from "./Mission";
import ContactList from "./ContactList";

class App extends Component {
  state = {
    user: false,
    contacts: [],
  };

  constructor(props) {
    super(props);

    this.authenticate = this.authenticate.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
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
