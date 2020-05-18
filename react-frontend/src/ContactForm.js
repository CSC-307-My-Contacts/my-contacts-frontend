import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ContactForm extends Component {
  state = {
    type: "Create",
    contact: {
      name: "",
      email: "",
      phone: "",
    },
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let contact = this.state.contact;
    contact[name] = value;
    this.setState({
      contact: contact,
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
    console.log(name, email);

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
          <input
            className="btn btn-primary btn-lg btn-block"
            type="button"
            value="Save Contact"
            onClick={() => {
              this.props.saveContact(this.state.contact, () =>
                this.props.history.push("/")
              );
            }}
          />
        </form>
      </div>
    );
  }
}

export default withRouter(ContactForm);
