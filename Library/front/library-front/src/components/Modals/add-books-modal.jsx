import React, { useRef, useEffect, useState } from "react";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import { Api } from "../../services/api";
import { useLivros } from "../../contextos/LivrosProvider/LivrosProvider";
import { useTranslation } from "react-i18next";

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
  const [statusSelected, setStatusSelected] = useState();
  const { usuario, token, config } = useAutenticacao();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [isTitleManual, setIsTitleManual] = useState(true);
  const [isAuthorManual, setIsAuthorManual] = useState(true);
  const [isPublicationYearManual, setIsPublicationYearManual] = useState(true);
  const [isCategoryManual, setIsCategoryManual] = useState(true);
  const [isDescriptionManual, setIsDescriptionManual] = useState(true);
  const { categorias, pegarCategorias, pegarStatus, status } = useLivros();
  const { t } = useTranslation();

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
      console.log(book?.volumeInfo?.authors?.[0]);
      setAuthor(book?.volumeInfo?.authors?.[0]);
      setIsAuthorManual(false);
    }
    if (!showManualUrlInput && book?.volumeInfo?.publishedDate) {
      setPublicationYear(book.volumeInfo.publishedDate);
      setIsPublicationYearManual(false);
    }
    if (!showManualUrlInput && book?.volumeInfo?.categories) {
      console.log(book?.volumeInfo?.categories?.[0]);
      setCategory(book?.volumeInfo?.categories?.[0]);
      setIsCategoryManual(false);
    }
    if (!showManualUrlInput && book?.volumeInfo?.description) {
      setDescription(book.volumeInfo.description);
      setIsDescriptionManual(false);
    }

    pegarCategorias();
    pegarStatus();
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
        t("realize_o_login_novamente")
      );
      return;
    }

    const publicationYear = parseInt(
      book?.volumeInfo?.publishedDate?.substring(0, 4)
    );

    const data = {
      title: title || book?.volumeInfo?.title || "",
      isGoogle: !isCategoryManual ? true : false,
      author: author || book?.volumeInfo?.authors?.join(", ") || "",
      publicationYear: publicationYear || 0,
      category: category || book?.volumeInfo?.categories?.join(", ") || "",
      description: description || book?.volumeInfo?.description || "",
      imageURL: showManualUrlInput
        ? imageUrl
        : book?.volumeInfo?.imageLinks?.thumbnail || "",
      status: statusSelected,
      userId: usuario?._id,
      isFavorite: statusSelected === "read" ? isFavorite : false,
      rating: statusSelected === "read" ? rating : 0,
      comments: statusSelected === "read" ? comments : "",
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

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-6 h-6 cursor-pointer ${
            i <= rating ? "text-primary-900" : "text-primary-400"
          }`}
          onClick={() => setRating(i)}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.175 3.621a1 1 0 00.95.69h3.801c.969 0 1.372 1.24.588 1.81l-3.073 2.228a1 1 0 00-.364 1.118l1.175 3.621c.3.921-.755 1.688-1.54 1.118l-3.073-2.228a1 1 0 00-1.175 0l-3.073 2.228c-.784.57-1.84-.197-1.54-1.118l1.175-3.621a1 1 0 00-.364-1.118L2.34 8.048c-.784-.57-.38-1.81.588-1.81h3.801a1 1 0 00.95-.69l1.175-3.621z" />
        </svg>
      );
    }
    return stars;
  };

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary-950 bg-opacity-30 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-primary-100 rounded-lg p-8 max-w-4xl w-full custom-scrollbar"
        onClick={handleModalClick}
        style={{
          maxHeight: "90%",
          overflowY: "auto",
        }}
      >
        <div className="flex justify-between items-center border-b ">
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
                    {!showManualUrlInput && !isCategoryManual ? (
                      <input
                        id="categoria"
                        name="categoria"
                        autoComplete="categoria"
                        className="py-1 px-2 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none py-1.5 text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6"
                        value={category}
                        onChange={handleCategoryChange}
                        readOnly={!isCategoryManual}
                      />
                    ) : (
                      <select
                        id="categoria"
                        name="categoria"
                        className="py-2 px-2 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6 custom-select custom-scrollbar"
                        value={category}
                        onChange={handleCategoryChange}
                      >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map((categoria, index) => (
                          <option key={index} value={categoria}>
                            {categoria}
                          </option>
                        ))}
                      </select>
                    )}
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
                      className="py-2 px-3 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none py-1.5 text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6 custom-scrollbar"
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
                      onChange={(e) => setStatusSelected(e.target.value)}
                    >
                      <option value="">Selecione um status</option>
                      {status.map((statu, index) => (
                        <option key={index} value={statu}>
                          {statu}
                        </option>
                      ))}
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
            {statusSelected === "read" && (
              <h2 className="text-xl font-semibold text-primary-950">
                Avalie o Livro
              </h2>
            )}
            <div className="space-y-12">
              {statusSelected === "read" && (
                <div className="border-b border-primary-900/10 pb-12">
                  <div className="col-span-full">
                    <label
                      htmlFor="comments"
                      className="block text-sm font-medium leading-6 text-primary-950"
                    >
                      Comentários
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="comments"
                        name="comments"
                        rows="3"
                        className="py-2 px-3 block w-full rounded-md border border-primary-800 focus:border-primary-800 focus:outline-none py-1.5 text-primary-950 shadow-sm placeholder:text-primary-400 sm:text-sm sm:leading-6 custom-scrollbar"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
              {statusSelected === "read" && (
                <div className="border-b border-primary-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3 flex items-center">
                      <label
                        htmlFor="isFavorite"
                        className="block text-sm font-medium leading-6 text-primary-950"
                      >
                        Favorito
                      </label>
                      <input
                        type="checkbox"
                        id="isFavorite"
                        name="isFavorite"
                        className={`ml-2 h-4 w-4 accent-primary-900 focus:ring-primary-500 border-gray-300 rounded`}
                        checked={isFavorite}
                        onChange={(e) => setIsFavorite(e.target.checked)}
                      />
                    </div>

                    <div className="sm:col-span-3 flex items-center">
                      <label
                        htmlFor="rating"
                        className="block text-sm font-medium leading-6 text-primary-950"
                      >
                        Avaliação
                      </label>
                      <div className="ml-2 flex space-x-1">{renderStars()}</div>
                    </div>
                  </div>
                </div>
              )}
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
