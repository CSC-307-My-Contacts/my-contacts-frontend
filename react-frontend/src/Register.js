import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

class Register extends Component {
  state = {
    username: "",
    password1: "",
    password2: "",
    match: true,
    usernameOk: true,
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
          <Image src="/logo192.png" className="mb-4 signin-img" rounded />
          <h1 className="h3 mb-3 font-weight-normal">Register new account</h1>
          <Form.Group>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="off"
              value={this.state.username}
              onChange={this.handleChange}
              isInvalid={!this.state.usernameOk}
            />
            <Form.Control.Feedback type="invalid">
              Request failed, username already in use
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="password"
              name="password1"
              className="input-group-top"
              placeholder="Password"
              autoComplete="off"
              value={this.state.password1}
              onChange={this.handleChange}
              isInvalid={!this.state.match}
            />
            <Form.Control
              type="password"
              name="password2"
              className="input-group-bottom"
              placeholder="Confirm Password"
              autoComplete="off"
              value={this.state.password2}
              onChange={this.handleChange}
              isInvalid={!this.state.match}
            />
            <Form.Control.Feedback type="invalid">
              Passwords must match
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="primary"
            size="lg"
            block
            onClick={() => {
              if (this.state.password1 === this.state.password2) {
                this.setState({ match: true });
                this.props.registerUser(
                  this.state.username,
                  this.state.password1,
                  (success) => {
                    if (success) this.props.history.push("/");
                    else this.setState({ usernameOk: false });
                  }
                );
              } else {
                this.setState({ match: false, usernameOk: true });
              }
            }}
          >
            Register
          </Button>
          <p className="text-muted mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
