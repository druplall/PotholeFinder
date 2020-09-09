import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';

const modal = (props) => {
  return (
    <div>
      <Modal
        show={props.displayModal}
        onHide={props.close}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {props.currentPothole.descriptor} :{' '}
            {props.currentPothole.unique_key}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Status: {props.currentPothole.status}</p>
            <p>Created Date: {props.currentPothole.created_date}</p>
            <p>Street Name: {props.currentPothole.street_name}</p>
            <p>City: {props.currentPothole.city}</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default modal;
