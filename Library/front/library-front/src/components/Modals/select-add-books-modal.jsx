import React, { useState } from "react";
import GoogleBooksModal from "./add-book-google-modal";
import ModalForm from "./add-books-modal";

const SelectModal = ({ isOpen, onClose }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [showGoogleBooksModal, setShowGoogleBooksModal] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);

  const handleAutomatedFillClick = () => {
    setShowGoogleBooksModal(true);
  };

  const handleManualAddClick = () => {
    setShowManualForm(true);
    setShowGoogleBooksModal(false);
  };

  const handleBookSelection = (book) => {
    setSelectedBook(book);
    setShowGoogleBooksModal(false);
    setShowManualForm(true);
  };

  const handleCloseSelectModal = () => {
    setShowManualForm(false);
    onClose();
  };

  return (
    <div
      id="select-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-50 overflow-y-auto`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md p-4 md:p-5 bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Adicionar Livros
          </h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-800"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="p-4 md:p-5">
          <p className="text-gray-500 mb-4">
            Escolha a forma como deseja adicionar:
          </p>
          <ul className="space-y-4 mb-4">
            <li>
              <input
                type="radio"
                id="manual"
                name="addMethod"
                className="hidden peer"
                onChange={handleManualAddClick}
              />
              <label
                htmlFor="manual"
                className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
              >
                <div>
                  <div className="text-lg font-semibold">Manualmente</div>
                  <div className="text-gray-500">
                    Completando todas as informações
                  </div>
                </div>
                <svg
                  className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="automated"
                name="addMethod"
                className="hidden peer"
              />
              <label
                htmlFor="automated"
                className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                onClick={handleAutomatedFillClick}
              >
                <div>
                  <div className="text-lg font-semibold">
                    Preenchimento automático
                  </div>
                  <div className="text-gray-500">
                    Utilizando o Google Livros
                  </div>
                </div>
                <svg
                  className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </label>
            </li>
          </ul>
        </div>
      </div>

      {showGoogleBooksModal && (
        <GoogleBooksModal
          isOpen={true}
          onClose={() => setShowGoogleBooksModal(false)}
          onSelectBook={handleBookSelection}
          onCloseSelectModal={onClose}
        />
      )}

      {showManualForm && (
        <ModalForm
          isOpen={true}
          onClose={handleCloseSelectModal}
          book={selectedBook}
          onCloseSelectModal={onClose}
        />
      )}
    </div>
  );
};

export default SelectModal;
