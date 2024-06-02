import React, { useState, useRef, useEffect } from "react";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import { Api } from "../../services/api";
import { useSnackbar } from "notistack";
import Notification from "../Notification/Notification";

const EditModal = ({ showModal, onClose, book, onBookUpdated }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [imageURL, setImageURL] = useState("");
  const { usuario, token } = useAutenticacao();
  const modalRef = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setPublicationYear(book.publicationYear || "");
      setCategory(book.category || "");
      setDescription(book.description || "");
      setStatus(book.status || "");
      setImageURL(book.imageURL || "");
    }
  }, [book]);

  const handleSubmit = async (event) => {
    event.preventDefault();

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

      const data = {
        title,
        author,
        publicationYear,
        category,
        description,
        imageURL,
        status,
      };

      await Api.put(`/${usuario._id}/books/${book._id}`, data, config);

      if (onBookUpdated) {
        onBookUpdated();
      }

      setShowNotification(true);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar livro:", error.message);
      if (error.response) {
        console.error("Detalhes do erro:", error.response.data);
      }
    }
  };

  useEffect(() => {
    if (showNotification) {
      enqueueSnackbar("Livro atualizado com sucesso!", { variant: "success" });
      setShowNotification(false);
    }
  }, [showNotification, enqueueSnackbar]);

  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!showModal || !book) return null;

  return (
    <>
      <Notification
        message="Livro atualizado com sucesso!"
        variant="success"
        show={showNotification}
      />
      <div
        className="fixed inset-0 z-50 overflow-y-auto bg-primary-950 bg-opacity-30 flex justify-center items-center "
        onClick={handleModalClick}
      >
        <div
          ref={modalRef}
          className="bg-primary-100 rounded-lg p-8 max-w-xl w-full custom-scrollbar"
          style={{ maxHeight: "90%", overflowY: "auto" }}
        >
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-semibold text-primary-950">
              Editar Livro
            </h2>
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
          <p className="mt-1 text-sm leading-6 text-primary-800">
            Complete as informações abaixo:
          </p>

          <form className="mt-4 space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-primary-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="titulo"
                      className="block text-sm font-medium leading-6 text-primary-950"
                    >
                      Título
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="titulo"
                        id="titulo"
                        autoComplete="titulo"
                        className="py-1 px-2 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="autor"
                      className="block text-sm font-medium leading-6 text-primary-950"
                    >
                      Autor
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="autor"
                        id="autor"
                        autoComplete="autor"
                        className="py-1 px-2 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="ano"
                      className="block text-sm font-medium leading-6 text-primary-950"
                    >
                      Ano de Publicação
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="ano"
                        id="ano"
                        autoComplete="ano"
                        className="py-1 px-2 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6"
                        value={publicationYear}
                        onChange={(e) => setPublicationYear(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="categoria"
                      className="block text-sm font-medium leading-6 text-primary-950"
                    >
                      Categoria
                    </label>
                    <div className="mt-2">
                      <input
                        id="categoria"
                        name="categoria"
                        autoComplete="categoria"
                        className="py-1 px-2 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="sinopse"
                      className="block text-sm font-medium leading-6 text-primary-950"
                    >
                      Descrição
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="sinopse"
                        name="sinopse"
                        rows="3"
                        className="py-2 px-3 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6 custom-scrollbar"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium leading-6 text-primary-950"
                    >
                      Status
                    </label>
                    <div className="mt-2">
                      <select
                        id="status"
                        name="status"
                        className="py-1.5 px-2 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="to-read">Quero Ler</option>
                        <option value="reading">Lendo</option>
                        <option value="read">Lido</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="imagemURL"
                      className="block text-sm font-medium leading-6 text-primary-950"
                    >
                      URL da Imagem
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="imagemURL"
                        id="imagemURL"
                        autoComplete="imagemURL"
                        className="py-1 px-2 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={onClose}
                className="text-sm font-semibold leading-6 text-primary-950"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-md bg-primary-800 hover:bg-primary-900 text-primary-50 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditModal;
