import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

class Login extends Component {
  state = {
    username: "",
    password: "",
    valid: true,
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
                  else this.setState({ valid: false, password: "" });
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
