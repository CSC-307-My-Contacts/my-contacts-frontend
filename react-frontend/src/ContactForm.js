import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

class ContactForm extends Component {
  state = {
    type: "Create",
    contact: {
      name: "",
      emails: [{ address: "", type: "none" }],
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

  handleListChange = (event, list, index, field) => {
    let contact = this.state.contact;
    contact[list][index][field] = event.target.value;
    this.setState({ contact: contact });
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
    const { name, emails, phone, labels } = this.state.contact;

    const emailFields = emails.map((email, index) => {
      return (
        <div className="d-flex flex-md-nowrap" key={index}>
          <Form.Control
            type="email"
            id="email"
            name="email"
            value={email.address}
            onChange={(event) =>
              this.handleListChange(event, "emails", index, "address")
            }
          />
          <select
            className="col-3 form-control mx-2"
            value={email.type}
            onChange={(event) =>
              this.handleListChange(event, "emails", index, "type")
            }
          >
            <option value="none">Type...</option>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="other">Other</option>
          </select>
          <Button aria-label="Close" className="close">
            <span aria-hidden="true">&times;</span>
          </Button>
        </div>
      );
    });

    const labelButtons = labels.map((label_text, index) => {
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
            <div>
              <h5>
                Email Addresses{" "}
                <Button size="sm" variant="outline-secondary">
                  {" "}
                  Add Email
                </Button>
              </h5>
            </div>
            {emailFields}
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
              <div className="mw-50">{labelButtons}</div>
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
          <Row>
            <Button
              className="col mr-3"
              size="lg"
              variant="secondary"
              onClick={() => this.props.history.push("/")}
            >
              Cancel
            </Button>
            <Button
              className="col"
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
          </Row>
        </Form>
      </Container>
    );
  }
}

export default withRouter(ContactForm);
