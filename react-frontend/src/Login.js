import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    uid: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="form-signin text-center">
        <h1 className="h3 mb-3 font-weight-normal">Please log in</h1>
        <input
          type="name"
          id="uid"
          name="uid"
          className="form-control mb-4"
          placeholder="User ID"
          required=""
          onChange={this.handleChange}
        />
        <button
          className="btn btn-lg btn-primary btn-block"
          onClick={() => {
            this.props.authenticate(this.state.uid, () =>
              this.props.history.push("/")
            );
          }}
        >
          Login
        </button>
        <p className="text-muted mt-3">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    );
  }
}

export default withRouter(Login);
