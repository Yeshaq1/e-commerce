import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalConfirmation = ({ show, onHide, submit, message }) => {
  return (
    <div>
      <Modal show={show} onHide={onHide} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>
            Close
          </Button>
          <Button variant='primary' onClick={submit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalConfirmation;
