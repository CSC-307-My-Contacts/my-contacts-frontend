import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Mission from "./Mission";
import axios from "axios";

const Private = () => <h3>Private</h3>;

const PrivateRoute = ({
  auth: isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const AccountRoute = ({
  auth: isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

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
    this.setState({ user: id });
    cb();
  };

  isAuthenticated() {
    return this.state.user !== false;
  }

  fetchContacts() {
    axios
      .get("http://localhost:5000/api/" + this.state.user + "/contacts")
      .then((res) => {
        const contacts = res.data.contact_list;
        this.setState({ contacts: contacts });
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  render() {
    return (
      <Router>
        <div>
          For Development Only
          <Link to="/"> Private</Link>
          <Link to="/mission"> Public</Link>
          user: {this.state.user}
        </div>

        <Switch>
          <AccountRoute auth={this.isAuthenticated} path="/login">
            <Login authenticate={this.authenticate} />
          </AccountRoute>
          <AccountRoute auth={this.isAuthenticated} path="/register">
            <Register />
          </AccountRoute>

          <Route path="/mission" component={Mission} />

          <PrivateRoute
            auth={this.isAuthenticated}
            path="/"
            component={Private}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
