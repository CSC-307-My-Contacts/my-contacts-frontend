import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class ContactForm extends Component {
  state = {
    type: "Create",
    contact: {},
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      contact: {
        [name]: value,
      },
    });
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({
        contact: this.props.contacts.find(
          (contact) => contact.id === this.props.match.params.id
        ),
        type: "Edit",
      });
    }
  }

  render() {
    const { name, email, phone } = this.state.contact;

    return (
      <div className="container contact-form">
        <div className="pt-5 text-center">
          <h2 className="mb-3">{this.state.type} Contact</h2>
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <hr />
          <div className="mb-3">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={phone}
              onChange={this.handleChange}
            />
          </div>
          <hr />
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={() => {
              this.props.saveContact(this.state.contact, () =>
                this.props.history.push("/")
              );
            }}
          >
            Save Contact
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(ContactForm);
