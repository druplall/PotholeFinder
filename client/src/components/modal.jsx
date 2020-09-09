import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
            <p>Lat: {props.currentPothole.latitude}</p>
            <p>Long: {props.currentPothole.longitude}</p>
            {props.currentPothole.descriptor === 'UserCreated' ? (
              <Button variant='success'> Click to take Pic ! </Button>
            ) : (
              ''
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default modal;
