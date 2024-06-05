import React, { useState, useEffect, useCallback } from "react";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import SelectModal from "../../components/Modals/select-add-books-modal";
import ReviewModal from "./ReviewModal";
import { Api } from "../../services/api";
import BooksCard from "../../components/Cards/books-card";
import BooksTable from "../../components/Table/books-table";
import Notification from "../../components/Notification/Notification";
import FeatureHomeSection from "../../pages/home/FeatureHomeSection";
import TabComponent from "../../pages/home/tablist";
import HelpModal from "./HelpModal";
import { useTranslation } from "react-i18next";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const { usuario, token } = useAutenticacao();
  const [livros, setLivros] = useState([]);
  const [filteredLivros, setFilteredLivros] = useState([]);
  const [livroCovers, setLivroCovers] = useState({});
  const [viewMode, setViewMode] = useState("card");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { t } = useTranslation();

  const [notification, setNotification] = useState({
    message: "",
    variant: "",
    show: false,
  });

  const fetchLivros = useCallback(
    async (page = 1) => {
      if (!usuario || !token) return;
      try {
        const response = await Api.get("/books", {
          params: { userId: usuario._id, page },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { books, pagination } = response.data;
        const { totalPages } = pagination;

        setLivros((prevBooks) =>
          page === 1 ? books : [...prevBooks, ...books]
        );
        setFilteredLivros((prevBooks) =>
          page === 1 ? books : [...prevBooks, ...books]
        );
        setCurrentPage(page);
        setTotalPages(totalPages);

        const covers = {};
        await Promise.all(
          books.map(async (livro) => {
            try {
              const googleBooksResponse = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
                  livro.title
                )}&key=AIzaSyDx3Qf677VRiBXwgR_13EFb3ecUSEG6iMY`
              );
              const data = await googleBooksResponse.json();
              covers[livro._id] =
                data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail ||
                "https://via.placeholder.com/150";
            } catch (error) {
              console.error(t("erro_ao_buscar_capa_do_livro"), error.message);
            }
          })
        );
        setLivroCovers((prevCovers) => ({ ...prevCovers, ...covers }));
      } catch (error) {
        console.error(t("erro_ao_buscar_livros"), error.message);
      }
    },
    [usuario, token]
  );

  useEffect(() => {
    fetchLivros();
  }, [fetchLivros]);

  const handleBookAdded = () => {
    fetchLivros();
    setNotification({
      message: "Livro adicionado com sucesso!",
      variant: "success",
      show: true,
    });
  };

  const handleTabChange = (status) => {
    filterBooks(status);
  };

  const filterBooks = useCallback(
    (status) => {
      if (status === "ALL") {
        setFilteredLivros(livros);
      } else {
        setFilteredLivros(livros.filter((livro) => livro.status === status));
      }
    },
    [livros]
  );

  const loadMoreBooks = () => {
    if (currentPage < totalPages) {
      fetchLivros(currentPage + 1);
    }
  };

  return (
    <section className="bg-primary-50">
      <FeatureHomeSection />
      <div className="flex justify-between items-center m-6">
        <div className="flex gap-2 m-4">
          <button
            className={`p-2 rounded ${
              viewMode === "card"
                ? "bg-primary-700 text-white"
                : "bg-primary-200"
            }`}
            onClick={() => setViewMode("card")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-6 h-6 ${
                viewMode === "card" ? "text-white" : "text-primary-950"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
              />
            </svg>
          </button>
          <button
            className={`p-2 rounded ${
              viewMode === "table"
                ? "bg-primary-700 text-white"
                : "bg-primary-200"
            }`}
            onClick={() => setViewMode("table")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-6 h-6 ${
                viewMode === "table" ? "text-white" : "text-primary-950"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
              />
            </svg>
          </button>
        </div>
        <TabComponent onTabChange={handleTabChange} />{" "}
   
        <div className="flex gap-2">
          <button
            className="block text-white bg-primary-700 hover
                focus
                focus
                focus
                font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center gap-1"
            onClick={() => setIsReviewModalOpen(true)}
          >
            Avaliações
          </button>
          <button
            className="block text-white bg-primary-700 hover
                focus
                focus
                focus
                font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center gap-1"
            onClick={() => setIsModalOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <SelectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onBookAdded={handleBookAdded}
          showNotification={(message, variant) =>
            setNotification({ message, variant, show: true })
          }
        />
      )}
      {isReviewModalOpen && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          books={livros}
        />
      )}
      <div className="m-8">
        {filteredLivros.length > 0 ? (
          <>
            {viewMode === "card" ? (
              <BooksCard books={filteredLivros} livroCovers={livroCovers} />
            ) : (
              <BooksTable books={filteredLivros} />
            )}
            {currentPage < totalPages && (
              <div className="flex justify-center mt-4">
                <button
                  className="bg-primary-700 text-white font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={loadMoreBooks}
                >
                  Carregar Mais
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-3xl text-center mt-20 text-primary-950 font-bold">
            {t("voce_ainda_nao_possuem_livros_adicionados")}
          </p>
        )}
      </div>
      <Notification
        message={notification.message}
        variant={notification.variant}
        show={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
      />

<div
        className="fixed bottom-4 right-4 bg-primary-100 shadow-md rounded-full p-4 cursor-pointer"
        onClick={() => setIsHelpModalOpen(true)} 
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-primary-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
          />
        </svg>
      </div>
      {isHelpModalOpen && (
        <HelpModal
          isOpen={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
        />
      )}
    </section>
  );
};

export default Home;
