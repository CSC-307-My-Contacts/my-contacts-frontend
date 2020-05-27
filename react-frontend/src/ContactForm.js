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
      labels: [],
    },
    label_edit: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let contact = this.state.contact;
    contact[name] = value;
    this.setState({
      contact: contact,
    });
  };

  handleLabelChange = (event) => {
    const text = event.target.value;
    if (/\s/g.test(text)) {
      let contact = this.state.contact;
      contact.labels = [
        ...contact.labels,
        ...text
          .trim()
          .split(" ")
          .filter((s) => s !== ""),
      ];
      this.setState({ contact: contact, label_edit: "" });
    } else {
      this.setState({ label_edit: text });
    }
  };

  removeLabel = (text) => {
    let contact = this.state.contact;
    contact.labels = contact.labels.filter((l) => l !== text);
    this.setState({ contact: contact });
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
    const { name, email, phone, labels } = this.state.contact;

    const label_buttons = labels.map((label_text, index) => {
      return (
        <Button
          key={index}
          variant="dark"
          className="mr-2 mb-2"
          onClick={() => this.removeLabel(label_text)}
        >
          {label_text} <span aria-hidden="true">&times;</span>
        </Button>
      );
    });

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
          <Form.Group>
            <Form.Label>Labels</Form.Label>
            <div className="d-flex flex-row">
              <div className="mw-50">{label_buttons}</div>
              <div className="col p-0">
                <Form.Control
                  type="text"
                  value={this.state.label_edit}
                  onChange={this.handleLabelChange}
                />
              </div>
            </div>
            <small className="form-text text-muted">
              Enter in labels separated by whitespace.
            </small>
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
