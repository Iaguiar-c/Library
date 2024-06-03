import React, { useState } from "react";
import ModalForm from "../Modals/add-books-modal";

const BookCard = ({ book }) => {
  const { volumeInfo } = book;
  const { title, authors, imageLinks } = volumeInfo;
  const imageUrl = imageLinks?.thumbnail || "https://via.placeholder.com/150";

  const [modalOpen, setModalOpen] = useState(false);

  const handleAddToLibrary = () => {
    setModalOpen(true);
  };

  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex mb-4 ">
      <div
        className="lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{ backgroundImage: `url(${imageUrl})` }}
        title={title}
      ></div>
      <div className="bg-primary-200 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
        <div className="mb-8">
          <p className="text-sm text-primary-900 flex items-center">
            {authors ? `${authors.join(", ")}` : "Autor Desconhecido"}
          </p>
          <div className="text-primary-950 font-bold text-xl mb-2">{title}</div>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-primary-900">
              {volumeInfo.categories || "Desconhecido"}
            </p>
          </div>
          <button
            onClick={handleAddToLibrary}
            className="ml-auto block text-primary-200 bg-primary-700 hover:bg-primary-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5" 
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>

        {modalOpen && (
          <ModalForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default BookCard;
