import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";

class Login extends Component {
  state = {
    username: "",
    password: "",
    valid: true,
    waiting: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  login = () => {
    this.setState({ waiting: true });
    this.props.login(this.state.username, this.state.password, () => {
      this.setState({ valid: false, waiting: false, password: "" });
    });
  };

  render() {
    const LoginButton = () => (
      <Button
        disabled={this.state.waiting}
        variant="primary"
        size="lg"
        block
        onClick={this.login}
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
            Logging In&hellip;
          </>
        ) : (
          <>Login</>
        )}
      </Button>
    );

    return (
      <div className="center-contents h-100">
        <div className="form-signin text-center">
          <Image src="/logo192.png" className="mb-4 signin-img" rounded />
          <h1 className="h3 mb-3 font-weight-normal">Please log in</h1>
          <div className="mb-3">
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              className="input-group-top"
              onChange={this.handleChange}
              value={this.state.username}
              isInvalid={!this.state.valid}
            />
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              className="input-group-bottom"
              onChange={this.handleChange}
              value={this.state.password}
              isInvalid={!this.state.valid}
            />
            <Form.Control.Feedback type="invalid">
              Login Failed, Username or Password Invalid
            </Form.Control.Feedback>
          </div>
          <LoginButton />
          <p className="text-muted mt-3">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
