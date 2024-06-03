// BookSingleCard.js
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import { Api } from "../../services/api";
import DeleteModal from "../Modals/delete-book-modal";
import InfoModal from "../Modals/info-book-modal";
import EditModal from "../Modals/edit-book-modal";
import { useTranslation } from "react-i18next";

const BookSingleCard = ({ book, coverUrl, onBookDeleted }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { usuario, token } = useAutenticacao();
  const { t } = useTranslation();

  const bookId = book._id;

  const handleDeleteBook = async (userId) => {
    try {
      if (!usuario || !token) {
        console.error(
          t("realize_o_login_novamente")
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
      console.error(t("erro_ao_excluir_livro"), error.message);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleConfirmDelete = () => {
    handleDeleteBook(usuario._id);
    setShowDeleteModal(false);
    refreshPage();
  };

  return (
    <div>
      <div
        className="relative shadow-md rounded-lg transition-transform transform hover:scale-105 max-w-xs min-h-[400px] flex flex-col justify-between"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-primary-300 opacity-50 absolute inset-0 rounded-lg z-0"></div>
        <div className="relative p-4 z-10">
          <div className="w-full h-[250px] overflow-hidden rounded-lg flex justify-center items-center">
            <img
              src={coverUrl || "https://via.placeholder.com/150"}
              alt={book.title}
              className="w-full h-full object-cover"
              style={{ aspectRatio: "2 / 3" }}
            />
          </div>
          <div className="mt-1 text-lg font-medium text-primary-950">
            {book.title}
          </div>
          <div className="mt-4 text-sm text-primary-900">{book.author}</div>
          <div className="mt-4 text-sm text-primary-900">{book.category}</div>

          <div className="flex justify-between items-center gap-x-2 mt-4">
            <button onClick={() => setShowInfoModal(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-primary-700 hover:text-primary-950"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </button>
            <button onClick={() => setShowEditModal(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-primary-700 hover:text-primary-950"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
            <button onClick={() => setShowDeleteModal(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-primary-700 hover:text-primary-950"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <DeleteModal
        showModal={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        isUserDelete={false}
      />
      <InfoModal
        showModal={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        book={book}
        coverUrl={coverUrl}
      />
      <EditModal
        showModal={showEditModal}
        onClose={() => setShowEditModal(false)}
        book={book}
      />
    </div>
  );
};

export default BookSingleCard;
