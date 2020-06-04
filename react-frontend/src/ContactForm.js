import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import ContactImage from "./ContactImage";

class ContactForm extends Component {
  state = {
    type: "Create",
    contact: {
      name: "",
      emails: [{ address: "", type: "None" }],
      phones: [{ number: "", type: "None" }],
      labels: [],
    },
    label_edit: "",
    imageFile: null,
  };

  onFileChangeHandler = (event) => {
    console.log(event.target.files[0]);
    this.setState({
      imageFile: event.target.files[0],
      loaded: 0,
    });
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

  handleListRemove = (event, list, index) => {
    let contact = this.state.contact;
    contact[list].splice(index, 1);
    this.setState({ contact: contact });
    event.preventDefault();
  };

  handelListAdd = (event, list, add) => {
    let contact = this.state.contact;
    contact[list] = [...contact[list], add];
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
    const { name, emails, phones, labels, image } = this.state.contact;

    const typeOption = (type) => {
      if (["None", "Home", "Work", "Other"].includes(type)) {
        return <option value="None">Type...</option>;
      } else {
        return <option value={type}>{type}</option>;
      }
    };

    const emailFields = emails.map((email, index) => {
      return (
        <div className="d-flex flex-md-nowrap mb-1" key={index}>
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
            {typeOption(email.type)}
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
          <button
            aria-label="Close"
            className="close"
            onClick={(event) => {
              this.handleListRemove(event, "emails", index);
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    });

    const phoneFields = phones.map((phone, index) => {
      return (
        <div className="d-flex flex-md-nowrap mb-1" key={index}>
          <Form.Control
            type="tel"
            name="phone"
            value={phone.number}
            onChange={(event) =>
              this.handleListChange(event, "phones", index, "number")
            }
          />
          <select
            className="col-3 form-control mx-2"
            value={phone.type}
            onChange={(event) =>
              this.handleListChange(event, "phones", index, "type")
            }
          >
            {typeOption(phone.type)}
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
          <button
            aria-label="Close"
            className="close"
            onClick={(event) => {
              this.handleListRemove(event, "phones", index);
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
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

          <Card bg="light" className="mb-3">
            <Card.Body>
              <Media>
                <div className="d-table pr-3 border-right">
                  <ContactImage image={image} className="modal-image d-block" />
                  <span className="text-muted text-center">current image</span>
                </div>
                <div className="px-3">
                  <h5 className="mb-3">Replace Image</h5>
                  <Form.Control
                    type="file"
                    name="file"
                    onChange={this.onFileChangeHandler}
                  />
                  <small className="form-text text-muted mb-2">
                    Select an image for the contact (*.png, *.jpg, *.gif,
                    *.svg). <br />
                    Note that the current image will not be updated until the
                    contact is saved.
                  </small>
                </div>
              </Media>
            </Card.Body>
          </Card>

          <hr />
          <Form.Group className="mb-3">
            <div>
              <h5>
                Email Addresses{" "}
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={(event) => {
                    this.handelListAdd(event, "emails", {
                      address: "",
                      type: "none",
                    });
                  }}
                >
                  {" "}
                  Add Email
                </Button>
              </h5>
            </div>
            {emailFields}
          </Form.Group>

          <Form.Group className="mb-3">
            <h5>
              Phone Number{" "}
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={(event) => {
                  this.handelListAdd(event, "phones", {
                    number: "",
                    type: "none",
                  });
                }}
              >
                {" "}
                Add Phone
              </Button>
            </h5>
            {phoneFields}
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
                this.props.saveContact(
                  this.state.contact,
                  this.state.imageFile,
                  () => this.props.history.push("/")
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
