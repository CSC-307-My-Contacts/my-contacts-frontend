import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
          (contact) => contact._id === this.props.match.params.id
        ),
        type: "Edit",
      });
    }
  }

  render() {
    const { name, email, phone } = this.state.contact;

    return (
      <Container className="contact-form">
        <div className="pt-5 text-center">
          <h2 className="mb-3">{this.state.type} Contact</h2>
        </div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Full name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <hr />
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="phone">Phone Number</Form.Label>
            <Form.Control
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={this.handleChange}
            />
          </Form.Group>
          <hr />
          <Button
            variant="primary"
            size="lg"
            block
            onClick={() => {
              this.props.saveContact(this.state.contact, () =>
                this.props.history.push("/")
              );
            }}
          >
            {" "}
            Save Contact{" "}
          </Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(ContactForm);
