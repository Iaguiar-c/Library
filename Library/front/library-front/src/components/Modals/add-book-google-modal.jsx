import React, { useState } from "react";
import axios from "axios";
import BookCard from "../Cards/modal-book-card";

const GoogleBooksModal = ({
  isOpen,
  onClose,
  onSelectBook,
  onCloseSelectModal,
  showNotification,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchTerm) {
      setError("Por favor, digite algo para pesquisar.");
      return;
    }

    setError("");
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=20`
      );
      if (response.data.items && response.data.items.length > 0) {
        setSearchResults(response.data.items);
      } else {
        setSearchResults([]);
        setError("Nenhum título encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar livros:", error.message);
      setError("Erro ao buscar livros. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookSelection = (book) => {
    onClose();
    onSelectBook(book);
    if (typeof showNotification === "function") {
      showNotification("Livro adicionado com sucesso!", "success");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`modal fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 overflow-y-auto `}
      onClick={onCloseSelectModal}
    >
      <div
        className="modal-container bg-primary-100 rounded-lg shadow-lg w-full max-w-2xl p-4 md:p-5 "
        style={{ minHeight: "400px", maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header flex justify-between border-b pb-3 mb-3 ">
          <button
            type="button"
            className="text-primary-800 hover:text-primary-950"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <h3 className="text-xl font-semibold text-primary-950">
            Adicionar com Google Livros
          </h3>
          <button
            type="button"
            className="text-primary-800 hover:text-primary-950"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            className="w-full placeholder-primary-300 border border-primary-800 focus:border-primary-800 focus:outline-none bg-primary-50 rounded-lg px-3 py-2 mb-3 text-primary-900"
            placeholder="Digite o título do livro"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="w-full bg-primary-800 hover:bg-primary-900 text-primary-50 font-semibold py-2 px-4 rounded-lg"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Pesquisar"}
          </button>
          {error && <div className="mt-2 text-primary-800">{error}</div>}

          <div className="mt-4 max-h-96 overflow-y-auto custom-scrollbar">
            {searchResults.map((book) => (
              <div
                key={book.id}
                className="cursor-pointer p-4 border rounded-lg mb-2 bg-primary-100 hover:bg-primary-50 "
                onClick={() => handleBookSelection(book)}
              >
                <BookCard book={book} />
              </div>
            ))}
            {searchResults.length === 0 && !loading && !error && (
              <div className="text-center text-primary-800">
                Nenhum resultado encontrado.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleBooksModal;
