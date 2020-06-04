import React from "react";
import { withRouter } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Media from "react-bootstrap/Media";
import MediaBody from "react-bootstrap/Media";
import Button from "react-bootstrap/Button";
import ContactImage from "./ContactImage";
import LabelList from "./LabelList";

const DetailedContactModal = withRouter((props) => {
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

  const labels =
    contact.labels && contact.labels.length ? (
      <Modal.Body className="modal-border">
        <LabelList labels={contact.labels} />
      </Modal.Body>
    ) : (
      <></>
    );

  return (
    <Modal show={true} onHide={closeContactView} centered="true">
      <Modal.Header closeButton>
        <Modal.Title>{contact.name}</Modal.Title>
      </Modal.Header>
      {labels}
      <Modal.Body>
        <Media>
          <ContactImage image={contact.image} className="modal-image mr-3" />
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

export default DetailedContactModal;
