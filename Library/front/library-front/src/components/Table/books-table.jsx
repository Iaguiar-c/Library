import React, { useState } from "react";
import InfoModal from "../Modals/info-book-modal";
import DeleteModal from "../Modals/delete-book-modal";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import { Api } from "../../services/api";
import EditModal from "../Modals/edit-book-modal";

const BooksTable = ({ books, book, onBookDeleted }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { usuario, token } = useAutenticacao();
  const bookId = book ? book._id : null;
  const booksPerPage = 5;

  const handleDeleteBook = async (userId, bookId) => {
    try {
      if (!usuario || !token) {
        console.error(
          "Token ou usuário não disponível. Realize o login novamente."
        );
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await Api.delete(`/${userId}/books/${bookId}`, config);

      if (onBookDeleted) {
        onBookDeleted();
      }
    } catch (error) {
      console.error("Erro ao excluir livro:", error.message);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCheckboxChange = (bookId) => {
    const selectedIndex = selectedBooks.indexOf(bookId);
    if (selectedIndex === -1) {
      setSelectedBooks([...selectedBooks, bookId]);
    } else {
      setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedBooks.length > 0) {
        await Promise.all(
          selectedBooks.map((bookId) => handleDeleteBook(usuario._id, bookId))
        );

        if (onBookDeleted) {
          onBookDeleted();
        }
      } else if (selectedBook) {
        await handleDeleteBook(usuario._id, selectedBook._id);

        if (onBookDeleted) {
          onBookDeleted();
        }
      }
    } catch (error) {
      console.error("Erro ao excluir livro:", error.message);
    }
    refreshPage();

    setShowDeleteModal(false);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };

  return (
    <div className="m-2">
      <div className="relative m-[2px] mb-3 mr-5 float-left">
        <label htmlFor="inputSearch" className="sr-only">
          Search
        </label>
        <input
          id="inputSearch"
          type="text"
          placeholder="Título, Gênero, Autor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-64 rounded-lg border border-primary-400 dark:border-none dark:bg-text-primary-950 py-2 pl-10 pr-4 text-sm focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-500 placeholder-primary-300"
        />
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4 text-primary-800 dark:text-primary-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
      </div>
      <button
        onClick={() => {
          setShowDeleteModal(true);
        }}
        className="bg-primary-700 hover:bg-primary-900 text-white font-bold py-2 px-4 rounded-lg"
      >
        Deletar
      </button>
      <table className="w-full border-separate border-spacing-2">
        <thead className="text-xs text-primary-950 uppercase bg-primary-200 dark:bg-primary-700 dark:text-primay-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className={`w-4 h-4 text-primary-700 ${
                    selectedBooks.length === currentBooks.length
                      ? "checked:accent-primary-700 checked:accent-border-primary-700"
                      : ""
                  } checked:accent-primary-700 border-primary-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-primary-800 dark:focus:ring-offset-primary-800 focus:ring-2 dark:bg-primary-700 dark:border-primary-600`}
                  onChange={() => {
                    if (selectedBooks.length === currentBooks.length) {
                      setSelectedBooks([]);
                    } else {
                      const bookIds = currentBooks.map((book) => book._id);
                      setSelectedBooks(bookIds);
                    }
                  }}
                  checked={selectedBooks.length === currentBooks.length}
                ></input>
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Nº
            </th>
            <th scope="col" className="px-6 py-3">
              Título
            </th>
            <th scope="col" className="px-6 py-3">
              Autor
            </th>
            <th scope="col" className="px-6 py-3">
              Gênero
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book, index) => (
            <tr
              key={book._id}
              className="text-center bg-primary-100 border-b dark:bg-primary-800 dark:border-primary-700 hover:bg-primary-200 dark:hover:bg-primary-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${index + 1}`}
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 bg-primary-100 border-primary-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-primary-800 dark:focus:ring-offset-primary-800 focus:ring-2 dark:bg-primary-700 dark:border-primary-600"
                    onChange={() => handleCheckboxChange(book._id)}
                    checked={selectedBooks.includes(book._id)}
                  ></input>
                  <label
                    htmlFor={`checkbox-table-search-${index + 1}`}
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-primary-900 whitespace-nowrap dark:text-primary-950"
              >
                {indexOfFirstBook + index + 1}
              </th>
              <td className="px-6 py-4">{book.title}</td>
              <td className="px-6 py-4">{book.author}</td>
              <td className="px-6 py-4">{book.category}</td>
              <td className="px-6 py-4">{book.status}</td>
              <td className="px-6 py-4 space-x-2">
                <a
                  href="#!"
                  onClick={() => {
                    setSelectedBook(book);
                    setShowInfoModal(true);
                  }}
                  className="font-medium text-primary-900 dark:text-primary-900 hover:underline"
                >
                  Ver
                </a>

                <a
                  href="#!"
                  onClick={() => handleEditBook(book)}
                  className="font-medium text-primary-900 dark:text-primary-900 hover:underline "
                >
                  Editar
                </a>

                <a
                  href="#!"
                  onClick={() => {
                    setSelectedBook(book);

                    setShowDeleteModal(true);
                  }}
                  className="font-medium text-primary-900 dark:text-primary-900 hover:underline"
                >
                  Deletar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav
        className="mt-5 flex items-center justify-between text-sm"
        aria-label="Page navigation example"
      >
        <p className="text-primary-950">
          Mostrando{" "}
          <strong>
            {indexOfFirstBook + 1}-
            {Math.min(indexOfLastBook, filteredBooks.length)}
          </strong>{" "}
          de <strong>{filteredBooks.length}</strong>
        </p>

        <ul className="list-style-none flex">
          <li>
            <a
              className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-primary-950 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-primary-950"
              href="#!"
              onClick={() => paginate(Math.max(1, currentPage - 1))}
            >
              Anterior
            </a>
          </li>

          {Array.from(
            { length: Math.ceil(filteredBooks.length / booksPerPage) },
            (_, index) => (
              <li key={index}>
                <a
                  className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${
                    currentPage === index + 1
                      ? "font-medium text-primary-950 bg-primary-100"
                      : "text-neutral-600"
                  } transition-all duration-300`}
                  href="#!"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            )
          )}

          <li>
            <a
              className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-primary-950 transition-all duration-300 hover:bg-neutral-100 dark:text-primary dark:hover:bg-neutral-700 dark:hover:text-primary-950"
              href="#!"
              onClick={() =>
                paginate(
                  Math.min(
                    currentPage + 1,
                    Math.ceil(filteredBooks.length / booksPerPage)
                  )
                )
              }
            >
              Próximo
            </a>
          </li>
        </ul>
      </nav>

      <InfoModal
        showModal={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        book={selectedBook}
      />

      <DeleteModal
        showModal={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        books={books}
        selectedBooks={selectedBooks}
        onCancel={() => setSelectedBooks([])}
        onConfirm={handleConfirmDelete}
      />
      <EditModal
        showModal={showEditModal}
        onClose={() => setShowEditModal(false)}
        book={selectedBook}
        onBookUpdated={() => {
          if (onBookDeleted) {
            onBookDeleted();
          }
        }}
      />
    </div>
  );
};

export default BooksTable;
