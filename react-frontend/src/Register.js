import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Register extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="center-contents h-100">
        <div className="form-signin text-center">
          <h1 className="h3 mb-3 font-weight-normal">Register new account</h1>
          <input
            type="name"
            id="username"
            name="username"
            className="form-control mb-4"
            placeholder="User ID"
            required=""
            onChange={this.handleChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            className="form-control mb-4"
            placeholder="Password"
            required=""
            onChange={this.handleChange}
          />
          <button
            className="btn btn-lg btn-primary btn-block"
            onClick={() => {
              this.props.createUser(
                this.state.username,
                this.state.password,
                () => this.props.history.push("/")
              );
            }}
          >
            Register
          </button>
          <p className="text-muted mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
