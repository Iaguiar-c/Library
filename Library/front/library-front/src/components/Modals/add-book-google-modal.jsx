import React, { useState } from "react";
import axios from "axios";
import BookCard from "../Cards/modal-book-card";

const GoogleBooksModal = ({ isOpen, onClose, onSelectBook }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyDx3Qf677VRiBXwgR_13EFb3ecUSEG6iMY&maxResults=20`
      )
      .then((res) => {
        setSearchResults(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBookSelection = (book) => {
    onClose(); // Fecha o modal de pesquisa
    onSelectBook(book); // Chama a função para preencher o ModalForm com o livro selecionado
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`modal fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50 overflow-y-auto`}
      onClick={onClose}
    >
      <div
        className="modal-container bg-white rounded-lg shadow-lg w-full max-w-2xl p-4 md:p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header flex justify-between border-b pb-3 mb-3">
          <h3 className="text-xl font-semibold text-gray-900">
            Adicionar com Google Livros
          </h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-800"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 mb-3"
            placeholder="Digite o título do livro"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={handleSearch}
          >
            Pesquisar
          </button>

          <div className="mt-4 max-h-96 overflow-y-auto">
            {searchResults.map((book) => (
              <div
                key={book.id}
                className="cursor-pointer p-4 border rounded-lg mb-2 bg-gray-50 hover:bg-gray-100"
                onClick={() => handleBookSelection(book)}
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleBooksModal;
