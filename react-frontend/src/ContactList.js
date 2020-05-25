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

const ContactViewModal = withRouter((props) => {
  const { contact, closeContactView, deleteContact, history } = props;
  return (
    <Modal show={true} onHide={closeContactView} centered="true">
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
          onClick={() => history.push("/edit/" + contact._id)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            deleteContact(contact._id, closeContactView);
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

class ImportModal extends React.Component {
  state = {
    selectedFile: null,
  };

  onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile, this.state.selectedFile.name);
    this.props.importCsv(data);
  };

  render() {
    const { closeImport } = this.props;

    return (
      <Modal show={true} onHide={closeImport} centered="true">
        <Modal.Header closeButton>
          <Modal.Title>Import Contacts CSV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <p className="text-muted">
              To import contacts from an exterior contact service select a .csv
              file containing the desired contacts.
            </p>
            <Form.Control
              type="file"
              name="file"
              onChange={this.onChangeHandler}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={closeImport}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.onClickHandler}>
            Import
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class ContactList extends React.Component {
  state = {
    contact: false,
    showImportModal: false,
    contactSearch: "",
  };

  constructor(props) {
    super(props);

    this.closeContactView = this.closeContactView.bind(this);
    this.closeImport = this.closeImport.bind(this);
  }

  closeContactView() {
    this.setState({ contact: false });
  }

  closeImport() {
    this.setState({ showImportModal: false });
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
    const { logout, deleteContact, importCsv } = this.props;
    const { contact, contactSearch, showImportModal } = this.state;

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
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => {
                        this.setState({ showImportModal: true });
                      }}
                    >
                      Upload Contacts CSV
                    </Nav.Link>
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
          <ContactViewModal
            contact={contact}
            closeContactView={this.closeContactView}
            deleteContact={deleteContact}
          />
        )}

        {showImportModal && (
          <ImportModal closeImport={this.closeImport} importCsv={importCsv} />
        )}
      </>
    );
  }
}

export default withRouter(ContactList);
