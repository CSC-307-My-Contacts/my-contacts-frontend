import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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

export default ImportModal;
