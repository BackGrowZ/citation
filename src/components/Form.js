import React, { Fragment, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'



export default function Example() {
    const [show, setShow] = useState(false);
    const [fullname, setFullname] = useState('test');

    // const userFullName = () => setFullname(event.target);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body><input value={fullname}></input></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
//   render(<Example />);
