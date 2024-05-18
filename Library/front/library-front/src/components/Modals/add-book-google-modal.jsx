import React, { useState } from "react";
import axios from "axios";
import BookCard from "../Cards/modal-book-card";

const GoogleBooksModal = ({ isOpen, onClose, onSelectBook }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=20`
      );
      setSearchResults(response.data.items || []);
    } catch (error) {
      console.error("Erro ao buscar livros:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSelection = (book) => {
    onClose();
    onSelectBook(book);
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
        className="modal-container bg-primary-100 rounded-lg shadow-lg w-full max-w-2xl p-4 md:p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header flex justify-between border-b pb-3 mb-3">
          <h3 className="text-xl font-semibold text-primary-950">
            Adicionar com Google Livros
          </h3>
          <button
            type="button"
            className="text-primary-800 hover:text-primary-950"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            className="w-full placeholder-primary-300 border border-primary-800 focus:border-primary-800 focus:outline-none bg-primary-50 rounded-lg px-3 py-2 mb-3"
            placeholder="Digite o título do livro"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-primary-800 hover:bg-primary-900 text-primary-50 font-semibold py-2 px-4 rounded-lg"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Pesquisar"}
          </button>

          <div className="mt-4 max-h-96 overflow-y-auto">
            {searchResults.map((book) => (
              <div
                key={book.id}
                className="cursor-pointer p-4 border rounded-lg mb-2 bg-primary-50 hover:bg-primary-100"
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
