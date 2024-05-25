import React from "react";
import Modal from "react-modal";

const ModalGenerico = ({ isOpen, onRequestClose, content }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Termos e Condições"
      style={{
        content: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          paddingRight: "20px",
        },
      }}
    >
        {content}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "15px",
          width: "100%",
        }}
      >
        <button
          onClick={onRequestClose}
          style={{
            cursor: "pointer",
            backgroundColor: "#FFD6D6",
            border: "none",
            padding: "4px",
            borderRadius: "5px",
          }}
        >
          Fechar
        </button>
      </div>
    </Modal>
  );
};

export default ModalGenerico;
