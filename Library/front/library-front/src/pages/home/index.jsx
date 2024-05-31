import React, { useState, useEffect } from "react";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import SelectModal from "../../components/Modals/select-add-books-modal";
import { Api } from "../../services/api";
import BooksCard from "../../components/Cards/books-card";
import BooksTable from "../../components/Table/books-table";
import Notification from "../../components/Notification/Notification";
import FeatureHomeSection from "../../pages/home/FeatureHomeSection";
import TabComponent from "../../pages/home/tablist";
import DeleteModal from "../../components/Modals/delete-book-modal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { usuario, token } = useAutenticacao();
  const [livros, setLivros] = useState([]);
  const [filteredLivros, setFilteredLivros] = useState([]);
  const [livroCovers, setLivroCovers] = useState({});
  const [viewMode, setViewMode] = useState("card");
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    variant: "",
    show: false,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para o modal de deleção

  const fetchLivros = async () => {
    if (!usuario || !token) return;
    try {
      const response = await Api.get("/books", {
        params: { userId: usuario._id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const books = response.data.books;
      setLivros(books);
      setFilteredLivros(books);

      const covers = {};
      for (const livro of books) {
        try {
          const googleBooksResponse = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
              livro.title
            )}&key=AIzaSyDx3Qf677VRiBXwgR_13EFb3ecUSEG6iMY`
          );
          const data = await googleBooksResponse.json();
          if (data.items && data.items.length > 0) {
            covers[livro._id] = data.items[0].volumeInfo.imageLinks.thumbnail;
          } else {
            covers[livro._id] = "https://via.placeholder.com/150";
          }
        } catch (error) {
          console.error("Erro ao buscar capa do livro:", error.message);
        }
      }
      setLivroCovers(covers);
    } catch (error) {
      console.error("Erro ao buscar livros:", error.message);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, [usuario, token]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBookAdded = () => {
    fetchLivros();
    setNotification({
      message: "Livro adicionado com sucesso!",
      variant: "success",
      show: true,
    });
  };

  const filterBooks = (status) => {
    if (status === "ALL") {
      setFilteredLivros(livros);
    } else {
      setFilteredLivros(livros.filter((livro) => livro.status === status));
    }
  };

  const openDeleteModal = (books) => {
    const selectedBooksArray = Array.isArray(books) ? books : [books]; // Garantindo que selectedBooksArray seja sempre um array
    setSelectedBooks(selectedBooksArray);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedBooks([]);
  };

  const handleDeleteBooks = async () => {
    try {
      // Assumindo que você tem uma API para deletar livros em lote
      await Api.delete("/books", {
        data: { bookIds: selectedBooks.map((book) => book._id) },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotification({
        message: "Livros deletados com sucesso!",
        variant: "success",
        show: true,
      });
      fetchLivros();
    } catch (error) {
      setNotification({
        message: "Erro ao deletar livros.",
        variant: "error",
        show: true,
      });
      console.error("Erro ao deletar livros:", error.message);
    } finally {
      closeDeleteModal();
    }
  };
  return (
    <section className="bg-primary-50">
      <FeatureHomeSection />
      <div className="flex justify-between items-center m-6">
      <div className="flex gap-2 m-4">
        <button
          className={`p-2 rounded ${
            viewMode === "card" ? "bg-primary-700 text-white" : "bg-primary-200"
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
        <TabComponent onTabChange={filterBooks} />

        <button
          className="block text-white bg-primary-700 hover:bg-primary-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center gap-1"
          onClick={openModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      

      {isModalOpen && (
        <SelectModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onBookAdded={handleBookAdded}
          showNotification={(message, variant) =>
            setNotification({ message, variant, show: true })
          }
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          showModal={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteBooks}
          selectedBooksCount={selectedBooks.length} 
        />
      )}
      <div className="m-8">
        {filteredLivros.length > 0 ? (
          viewMode === "card" ? (
            <BooksCard
              books={filteredLivros}
              covers={livroCovers}
              onDelete={openDeleteModal}
            />
          ) : (
            <BooksTable books={filteredLivros} onDelete={openDeleteModal} />
          )
        ) : (
          <p>Você ainda não possui livros adicionados.</p>
        )}
      </div>
      <Notification
        message={notification.message}
        variant={notification.variant}
        show={notification.show}
      />
    </section>
  );
};

export default Home;
