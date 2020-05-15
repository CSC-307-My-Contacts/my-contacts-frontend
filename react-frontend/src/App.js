import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'

import Login from "./Login";
import Register from "./Register";
import Mission from "./Mission";

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        cb();
    },
    signout(cb) {
        this.isAuthenticated = false;
        cb();
    },
}


const Private = () => <h3>Private</h3>

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to='/login'/>
    )}/>
)

const AccountRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated !== true
            ? <Component {...props} />
            : <Redirect to='/'/>
    )}/>
)

class App extends Component {
    state = {
        user: false,
        contacts: [],
    }

    constructor(props) {
        super(props)

        this.authenticate = this.authenticate.bind(this);
    }


    authenticate = (id, cb) => {
        this.setState({user: id})
        fakeAuth.authenticate(cb)
    }

    render() {
        return (
            <Router>

                <div>
                    For Development Only
                    <Link to='/'> Private</Link>
                    <Link to='/mission'> Public</Link>
                    user: {this.state.user}
                </div>

                <Switch>
                    <AccountRoute path='/login'> <Login authenticate={this.authenticate} /> </AccountRoute>
                    <AccountRoute path='/register'><Register /></AccountRoute>

                    <Route path='/mission' component={Mission}/>

                    <PrivateRoute path='/' component={Private}/>
                </Switch>

            </Router>
        )
    }

}

export default App