import React, { useRef, useEffect, useState } from "react";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import { Api } from "../../services/api";
import axios from "axios";

const ModalForm = ({ isOpen, onClose, book, onBookAdded }) => {
  const modalRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { usuario, token, config } = useAutenticacao();

  useEffect(() => {
    setModalOpen(isOpen);
    if (book?.volumeInfo?.imageLinks?.thumbnail) {
      setImageUrl(book.volumeInfo.imageLinks.thumbnail);
      setManualEntry(false); // Garantir que não estamos em modo de entrada manual
    }
  }, [isOpen, book]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (modalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [modalOpen, onClose]);

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const handleClose = () => {
    onClose();
    setModalOpen(false);
  };

  const handleImageInputChange = (event) => {
    const imageUrl = event.target.value;
    setImageUrl(imageUrl);
    setManualEntry(imageUrl !== "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token || !usuario) {
      console.error(
        "Token ou usuário não disponível. Realize o login novamente."
      );
      return;
    }

    const publicationYear = parseInt(
      book?.volumeInfo?.publishedDate?.substring(0, 4)
    );

    const data = {
      title: book?.volumeInfo?.title || "",
      author: book?.volumeInfo?.authors?.join(", ") || "",
      publicationYear: publicationYear || 0,
      category: book?.volumeInfo?.categories?.join(", ") || "",
      description: book?.volumeInfo?.description || "",
      imageURL: book?.volumeInfo?.imageLinks?.thumbnail || imageUrl || "",
      status: "available",
      userId: usuario?._id,
    };

    try {
      await Api.post("/books/create", data, config);
      if (onBookAdded) onBookAdded();
      onClose();
    } catch (error) {
      console.error("Erro ao criar livro:", error.message);
      if (error.response) {
        console.error("Detalhes do erro:", error.response.data);
      }
    }
  };

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-primary-100 rounded-lg p-8 max-w-xl w-full"
        onClick={handleModalClick}
        style={{
          maxHeight: "90%",
          overflowY: "auto",
        }}
      >
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-semibold text-primary-950">
            Adicionar Livro
          </h2>

          <button
            onClick={onClose}
            className="text-primary-800 hover:text-primary-950"
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

        <form className="mt-4 space-y-8">
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
                      className=" py-1 px-2 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none py-1.5 text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6"
                      value={book?.volumeInfo?.title || ""}
                    />
                  </div>
                </div>

                {manualEntry && (
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="imagem"
                      className="block text-sm font-medium leading-6 text-primary-950"
                    >
                      URL da Imagem
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="imagem"
                        id="imagem"
                        autoComplete="imagem"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleImageInputChange}
                        placeholder="Insira a URL da imagem"
                      />
                    </div>
                  </div>
                )}

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
                      className="py-1 px-2 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none py-1.5 text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6"
                      value={book?.volumeInfo?.authors?.join(", ") || ""}
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
                      className="py-1 px-2 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none py-1.5 text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6"
                      value={book?.volumeInfo?.publishedDate || ""}
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
                      className="py-1 px-2 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none py-1.5 text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6"
                      value={book?.volumeInfo?.categories || ""}
                    ></input>
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
                      className="py-2 px-3 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none py-1.5 text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6"
                      value={book?.volumeInfo?.description || ""}
                    ></textarea>
                  </div>
                </div>

                {!manualEntry && (
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="imagemURL"
                      className="block text-sm font-medium leading-6 text-primary-950"
                    >
                      Capa do Livro
                    </label>
                    <div className="mt-2">
                      {book?.volumeInfo?.imageLinks?.thumbnail && (
                        <img
                          src={book?.volumeInfo?.imageLinks?.thumbnail}
                          alt="Capa do Livro"
                          className="rounded-md h-40 w-auto"
                        />
                      )}
                    </div>
                  </div>
                )}
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
              onClick={handleSubmit}
              className="rounded-md bg-primary-800 hover:bg-primary-900 text-primary-50 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
