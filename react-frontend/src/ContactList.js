import React from "react";
import { Link, withRouter } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";

class ContactList extends React.Component {
  state = {
    contact: false,
    contactSearch: "",
  };

  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ contact: false });
  }

  handleSearch = (event) => {
    const { value } = event.target;
    this.setState({ contactSearch: value });
  };

  getDisplayContacts(value) {
    return this.state.contactSearch
      ? this.props.contacts.filter((c) => {
          return (
            c.name.toUpperCase().includes(value.toUpperCase()) ||
            c.email.toUpperCase().includes(value.toUpperCase()) ||
            c.phone.toUpperCase().includes(value.toUpperCase())
          );
        })
      : this.props.contacts;
  }

  render() {
    const { logout, history, deleteContact } = this.props;
    const { contact, contactSearch } = this.state;

    const rows = this.getDisplayContacts(contactSearch).map((row, index) => {
      return (
        <tr
          key={index}
          onClick={() => {
            this.setState({ contact: row });
          }}
          className="pointer"
        >
          <td>{row.name}</td>
          <td>{row.phone}</td>
          <td>{row.email}</td>
        </tr>
      );
    });

    return (
      <>
        <Navbar
          variant="dark"
          bg="dark"
          className="sticky-top flex-md-nowrap p-0"
        >
          <Navbar.Brand className="col-sm-3 col-md-2 mr-0">
            <img
              src="/logo192.png"
              alt=""
              width="30"
              height="30"
              className="mb-1"
            />{" "}
            My Contacts
          </Navbar.Brand>
        </Navbar>
        <Container fluid>
          <Row>
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <div className="flex-md-nowrap px-3">
                  <Form.Control
                    className="form-control w-100"
                    type="text"
                    placeholder="Search..."
                    aria-label="Search"
                    name="contactSearch"
                    value={contactSearch}
                    onChange={this.handleSearch}
                  />
                </div>
                <hr />
                <Nav className="flex-column">
                  <Nav.Item className="px-3">
                    <Link to={"/create"} style={{ textDecoration: "none" }}>
                      <Button block variant="primary">
                        New Contact
                      </Button>
                    </Link>
                  </Nav.Item>
                </Nav>
                <footer className="footer mb-3 mx-2">
                  <Nav className="flex-column">
                    <Nav.Item>
                      <Button
                        variant="link"
                        className="nav-link text-muted"
                        onClick={logout}
                      >
                        Logout
                      </Button>
                    </Nav.Item>
                  </Nav>
                </footer>
              </div>
            </nav>
            <main
              role="main"
              className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4"
            >
              <div className="table-responsive">
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Phone #</th>
                      <th>Email Address</th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </Table>
              </div>
            </main>
          </Row>
        </Container>

        {contact !== false && (
          <Modal show={true} onHide={this.handleClose} centered="true">
            <Modal.Header closeButton>
              <Modal.Title>{contact.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <strong>Email Address:</strong> {contact.email}
              <hr />
              <strong>Phone Number:</strong> {contact.phone}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => history.push("/edit/" + contact.uid)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  deleteContact(contact.uid, this.handleClose);
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  }
}

export default withRouter(ContactList);
