// InfoModal.js
import React from "react";

const InfoModal = ({ showModal, onClose, book }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 max-w-4xl w-full h-auto max-h-[90%] overflow-y-auto">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex">
          <div className="flex-shrink-0">
            <img
              src={book.imageURL || "https://via.placeholder.com/150"}
              alt={book.title}
              className="object-cover w-50 h-80 rounded-lg mr-4"
            />
          </div>
          <div className="flex flex-col justify-between w-full">
            <div>
              <div className="text-2xl font-bold mb-2">{book.title}</div>
              <div className="text-md mb-2">{book.author}</div>
              <div className="text-md mb-2">{book.category}</div>
              <div className="text-md mb-2">{book.status}</div>
            </div>
            <div className="text-sm overflow-y-auto max-h-60 pr-2 custom-scrollbar">
              {book.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
