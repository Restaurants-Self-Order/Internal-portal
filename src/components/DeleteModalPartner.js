import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const { REACT_APP_API_URL } = process.env;
const DeleteModalPartner = (props) => {

    const {
        buttonLabel,
        partner,
        className
      } = props;

    const [, setDeleting] = useState(false);
    

  const handleDeleteModal = async () => {
  
    try {
       setDeleting(true);
         await axios.delete(REACT_APP_API_URL+ 'partner-application/' + partner.id , {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setDeleting(false);
      toggle()
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }

  }



  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  return (
  <div>
    <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle} close={closeBtn}>{partner.name}</ModalHeader>
      <ModalBody>
       Do you really want to delete this partner?
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleDeleteModal}>Do Something</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>
);
}

export default DeleteModalPartner;
