import React, { useRef, useEffect, useState } from "react";

const ModalForm = ({ isOpen, onClose, book }) => {
  const modalRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

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

    setManualEntry(imageUrl !== "");
  };

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-8 max-w-xl w-full"
        onClick={handleModalClick}
        style={{
          maxHeight: "90%",
          overflowY: "auto",
        }}
      >
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Adicionar Livro
          </h2>

          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-800"
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
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Complete as informações abaixo:
        </p>

        <form className="mt-4 space-y-8">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="titulo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Título
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="titulo"
                      id="titulo"
                      autoComplete="titulo"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={book?.volumeInfo?.title || ""}
                    />
                  </div>
                </div>

                {manualEntry && (
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="imagem"
                      className="block text-sm font-medium leading-6 text-gray-900"
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
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Autor
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="autor"
                      id="autor"
                      autoComplete="autor"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={book?.volumeInfo?.authors?.join(", ") || ""}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="ano"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ano de Publicação
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="ano"
                      id="ano"
                      autoComplete="ano"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={book?.volumeInfo?.publishedDate || ""}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="categoria"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Categoria
                  </label>
                  <div className="mt-2">
                    <select
                      id="categoria"
                      name="categoria"
                      autoComplete="categoria"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={book?.volumeInfo?.categories || ""}
                    >
                      <option>--</option>
                      <option>bla</option>
                      <option>bla</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="sinopse"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Descrição
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="sinopse"
                      name="sinopse"
                      rows="3"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={book?.volumeInfo?.description || ""}
                    ></textarea>
                  </div>
                </div>

                {!manualEntry && (
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="imagem"
                      className="block text-sm font-medium leading-6 text-gray-900"
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
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
