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
import Badge from "react-bootstrap/Badge";
import Media from "react-bootstrap/Media";
import MediaBody from "react-bootstrap/Media";

const UploadIcon = () => {
  return (
    <svg
      className="bi bi-cloud-upload"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.887 6.2l-.964-.165A2.5 2.5 0 1 0 3.5 11H6v1H3.5a3.5 3.5 0 1 1 .59-6.95 5.002 5.002 0 1 1 9.804 1.98A2.501 2.501 0 0 1 13.5 12H10v-1h3.5a1.5 1.5 0 0 0 .237-2.981L12.7 7.854l.216-1.028a4 4 0 1 0-7.843-1.587l-.185.96z" />
      <path
        fillRule="evenodd"
        d="M5 8.854a.5.5 0 0 0 .707 0L8 6.56l2.293 2.293A.5.5 0 1 0 11 8.146L8.354 5.5a.5.5 0 0 0-.708 0L5 8.146a.5.5 0 0 0 0 .708z"
      />
      <path
        fillRule="evenodd"
        d="M8 6a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 6z"
      />
    </svg>
  );
};

const ContactViewModal = withRouter((props) => {
  const { contact, closeContactView, deleteContact, history } = props;

  const emails = (contact.emails || []).map((row, index) => {
    return (
      <div className="mb-1" key={index}>
        {row.address} <span className="text-muted">({row.type})</span>
      </div>
    );
  });

  const phones = (contact.phones || []).map((row, index) => {
    return (
      <div className="mb-1" key={index}>
        {row.number} <span className="text-muted">({row.type})</span>
      </div>
    );
  });

  return (
    <Modal show={true} onHide={closeContactView} centered="true">
      <Modal.Header closeButton>
        <Modal.Title>{contact.name}</Modal.Title>
      </Modal.Header>
      {contact.labels && contact.labels.length && (
        <Modal.Body className="modal-border">
          <LabelList labels={contact.labels} />
        </Modal.Body>
      )}
      <Modal.Body>
        <Media>
          <img
            src={getImageUrl(contact.image)}
            alt=""
            className="rounded-circle modal-image mr-3"
          />
          <MediaBody>
            <div>
              <strong>Email Address:</strong> {emails}
              <hr />
              <strong>Phone Number:</strong> {phones}
            </div>
          </MediaBody>
        </Media>
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

const LabelList = (props) => {
  const labels = (props.labels || []).map((label, index) => {
    return (
      <Badge key={index} variant="dark" className="mr-2">
        {label}
      </Badge>
    );
  });
  return <>{labels}</>;
};

const getImageUrl = (image) => {
  if (image && image.type && image.url) {
    if (image.type === "external") {
      return image.url;
    }
  }
  return "/contact-no-image.png";
};

const TableImage = (props) => {
  return (
    <img
      className="rounded-circle table-image mr-2"
      src={getImageUrl(props.image)}
      alt=""
    />
  );
};

class ContactList extends React.Component {
  state = {
    contact: false,
    showImportModal: false,
    contactSearch: "",
    selectedLabel: null,
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
    if (!this.state.contactSearch && !this.state.selectedLabel) {
      return this.props.contacts;
    }
    let contacts = this.state.contactSearch
      ? this.props.contacts.filter((c) => {
          return c.name.toUpperCase().includes(value.toUpperCase());
        })
      : this.props.contacts;
    return this.state.selectedLabel
      ? contacts.filter((c) => {
          return (c.labels || []).indexOf(this.state.selectedLabel) !== -1;
        })
      : contacts;
  }

  getLabelList(contacts) {
    return contacts
      .reduce((list, contact) => list.concat(contact.labels), [])
      .filter((v, i, a) => a.indexOf(v) === i);
  }

  handelLabelClick(label) {
    this.setState((state) => {
      return { selectedLabel: state.selectedLabel === label ? null : label };
    });
  }

  render() {
    const { logout, deleteContact, importCsv, loading } = this.props;
    const {
      contact,
      contactSearch,
      showImportModal,
      selectedLabel,
    } = this.state;

    const rows = this.getDisplayContacts(contactSearch).map((row, index) => {
      return (
        <tr
          key={index}
          onClick={() => {
            this.setState({ contact: row });
          }}
          className="pointer"
        >
          <td>
            <TableImage image={row.image} />
            {row.name}
          </td>
          <td>{row.phones && row.phones.length ? row.phones[0].number : ""}</td>
          <td>
            {row.emails && row.emails.length ? row.emails[0].address : ""}
          </td>
          <td>
            <LabelList labels={row.labels} />
          </td>
        </tr>
      );
    });

    const labels = this.getLabelList(this.props.contacts).map(
      (label, index) => {
        if (label) {
          return (
            <Nav.Item key={index}>
              <Nav.Link className="py-1">
                <Button
                  variant={label === selectedLabel ? "dark" : "outline-dark"}
                  size="sm"
                  onClick={() => this.handelLabelClick(label)}
                >
                  {label}
                </Button>
              </Nav.Link>
            </Nav.Item>
          );
        } else {
          return null;
        }
      }
    );

    const loadingPage = (
      <td colSpan="4" className="text-center text-muted bg-light p-3">
        <span className="h3 text-uppercase">Loading</span>
        <div className="spinner-border ml-2" />
      </td>
    );

    return (
      <>
        <Navbar
          variant="dark"
          bg="dark"
          className="fixed-top flex-md-nowrap p-0"
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
          <Row className="mt-5">
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
                  <span className="nav-link">
                    <Link to={"/create"} style={{ textDecoration: "none" }}>
                      <Button block variant="primary">
                        New Contact
                      </Button>
                    </Link>
                  </span>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => {
                        this.setState({ showImportModal: true });
                      }}
                    >
                      <UploadIcon /> Upload Contacts CSV
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <hr />
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  Labels
                </h6>
                <Nav className="flex-column">{labels}</Nav>
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
                      <th>Labels</th>
                    </tr>
                  </thead>
                  <tbody>{loading ? loadingPage : rows}</tbody>
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
