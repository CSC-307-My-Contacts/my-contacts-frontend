import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class Login extends Component {
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
          <h1 className="h3 mb-3 font-weight-normal">Please log in</h1>
          <div className="mb-3">
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
            />
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>
          <Button
            variant="primary"
            size="lg"
            block
            onClick={() => {
              this.props.login(
                this.state.username,
                this.state.password,
                (success) => {
                  if (success) this.props.history.push("/");
                }
              );
            }}
          >
            Login
          </Button>
          <p className="text-muted mt-3">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
