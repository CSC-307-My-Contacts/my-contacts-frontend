import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";

class Register extends Component {
  state = {
    username: "",
    password1: "",
    password2: "",
    match: true,
    usernameOk: true,
    waiting: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  register = () => {
    if (this.state.password1 === this.state.password2) {
      this.setState({ match: true, waiting: true });
      this.props.registerUser(this.state.username, this.state.password1, () => {
        this.setState({ usernameOk: false, waiting: false });
      });
    } else {
      this.setState({ match: false, usernameOk: true });
    }
  };

  render() {
    const RegisterButton = () => (
      <Button
        disabled={this.state.waiting}
        variant="primary"
        size="lg"
        block
        onClick={this.register}
      >
        {this.state.waiting ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="m-1"
            />{" "}
            Registering&hellip;
          </>
        ) : (
          <>Register</>
        )}
      </Button>
    );

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
          <RegisterButton />
          <p className="text-muted mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
