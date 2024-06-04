import React from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";

const ModalGenerico = ({ isOpen, onRequestClose, content,  customStyles  }) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
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
          {t("fechar")}
        </button>
      </div>
    </Modal>
  );
};

export default ModalGenerico;
