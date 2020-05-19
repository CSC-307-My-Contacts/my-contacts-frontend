import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
          <Button
            variant="primary"
            size="lg"
            block
            onClick={() => {
              this.props.registerUser(
                this.state.username,
                this.state.password,
                (success) => {
                  if (success) this.props.history.push("/");
                }
              );
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
