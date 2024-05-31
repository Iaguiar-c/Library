import React, { useRef, useEffect, useState } from "react";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import { Api } from "../../services/api";

const STATUS = {
  TO_READ: "to-read",
  READING: "reading",
  READ: "read",
};

const ModalForm = ({
  isOpen,
  onClose,
  book,
  onBookAdded,
  showManualUrlInput,
}) => {
  const modalRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState(STATUS.TO_READ);
  const { usuario, token, config } = useAutenticacao();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isTitleManual, setIsTitleManual] = useState(true);
  const [isAuthorManual, setIsAuthorManual] = useState(true);
  const [isPublicationYearManual, setIsPublicationYearManual] = useState(true);
  const [isCategoryManual, setIsCategoryManual] = useState(true);
  const [isDescriptionManual, setIsDescriptionManual] = useState(true);

  useEffect(() => {
    setModalOpen(isOpen);
    if (book?.volumeInfo?.imageLinks?.thumbnail) {
      setImageUrl(book.volumeInfo.imageLinks.thumbnail);
    }
    if (!showManualUrlInput && book?.volumeInfo?.title) {
      setTitle(book.volumeInfo.title);
      setIsTitleManual(false);
    }
    if (!showManualUrlInput && book?.volumeInfo?.authors) {
      setAuthor(book.volumeInfo.authors);
      setIsAuthorManual(false);
    }
    if (!showManualUrlInput && book?.volumeInfo?.publishedDate) {
      setPublicationYear(book.volumeInfo.publishedDate);
      setIsPublicationYearManual(false);
    }
    if (!showManualUrlInput && book?.volumeInfo?.categories) {
      setCategory(book.volumeInfo.categories);
      setIsCategoryManual(false);
    }
    if (!showManualUrlInput && book?.volumeInfo?.description) {
      setDescription(book.volumeInfo.description);
      setIsDescriptionManual(false);
    }
  }, [isOpen, book, showManualUrlInput]);

  const handleTitleChange = (event) => {
    if (isTitleManual) {
      setTitle(event.target.value);
    }
  };

  const handleAuthorChange = (event) => {
    if (isAuthorManual) {
      setAuthor(event.target.value);
    }
  };

  const handlePublicationYearChange = (event) => {
    if (isPublicationYearManual) {
      setPublicationYear(event.target.value);
    }
  };

  const handleCategoryChange = (event) => {
    if (isCategoryManual) {
      setCategory(event.target.value);
    }
  };

  const handleDescriptionChange = (event) => {
    if (isDescriptionManual) {
      setDescription(event.target.value);
    }
  };

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
      title: title || book?.volumeInfo?.title || "",
      author: author || book?.volumeInfo?.authors?.join(", ") || "",
      publicationYear: publicationYear || 0,
      category: category || book?.volumeInfo?.categories?.join(", ") || "",
      description: description || book?.volumeInfo?.description || "",
      imageURL: showManualUrlInput
        ? imageUrl
        : book?.volumeInfo?.imageLinks?.thumbnail || "",
      status: status,
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
                      className="py-1 px-2 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none py-1.5 text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6"
                      value={title}
                      onChange={handleTitleChange}
                      readOnly={!isTitleManual}
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
                      className="py-1 px-2 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none py-1.5 text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6"
                      value={author}
                      onChange={handleAuthorChange}
                      readOnly={!isAuthorManual}
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
                      value={publicationYear}
                      onChange={handlePublicationYearChange}
                      readOnly={!isPublicationYearManual}
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
                      value={category}
                      onChange={handleCategoryChange}
                      readOnly={!isCategoryManual}
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
                      className="py-2 px-3 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none py-1.5 text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6"
                      value={description}
                      onChange={handleDescriptionChange}
                      readOnly={!isDescriptionManual}
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
                      <option value={STATUS.TO_READ}>Quero Ler</option>
                      <option value={STATUS.READING}>Lendo</option>
                      <option value={STATUS.READ}>Lido</option>
                    </select>
                  </div>
                </div>
                {showManualUrlInput && (
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
                        className="py-1 px-2 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6"
                        onChange={handleImageInputChange}
                       
                      />
                    </div>
                  </div>
                )}

                {!showManualUrlInput && (
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
              className="rounded-md bg-primary-800 hover:bg-primary-900 text-primary-50 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
