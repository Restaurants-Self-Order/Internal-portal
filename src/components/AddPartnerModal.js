/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import PartnerForm from './PartnerForm';

const AddPartnerModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;
  const [modal, setModal] = useState(false);
  const [backdrop, ] = useState(false);
  const [keyboard, ] = useState(false);

  const toggle = () => setModal(!modal);

  // const changeBackdrop = e => {
  //   let value = e.target.value;
  //   if (value !== 'static') {
  //     value = JSON.parse(value);
  //   }
  //   (value);
  // t changeKeyboard = e => {
  //   setKeyboard(e.currentTarget.checked);
  // }

  return (
    <div>
      
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>

      <Modal isOpen={modal} toggle={toggle}  className={className} backdrop={backdrop} keyboard={keyboard}>
        <ModalHeader toggle={toggle}>Create Partner</ModalHeader>
        <ModalBody>
         <PartnerForm />
        </ModalBody>
        
      </Modal>
    </div>
  );
}

export default AddPartnerModal;