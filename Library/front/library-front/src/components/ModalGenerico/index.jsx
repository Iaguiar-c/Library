import React from "react";
import Modal from "react-modal";

const ModalGenerico = ({ isOpen, onRequestClose, content  }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    
      >
      {content}
      
    </Modal>
  );
};

export default ModalGenerico;
