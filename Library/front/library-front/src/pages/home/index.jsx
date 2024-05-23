import React, { useState, useEffect } from "react";
import { useTraducao } from "../../contextos/TraducaoProvider/TraducaoProvider";
import { useTranslation } from "react-i18next";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import SelectModal from "../../components/Modals/select-add-books-modal";
import { Api } from "../../services/api";
import BooksCard from "../../components/Cards/books-card";
import BooksTable from "../../components/Table/books-table";
import Notification from "../../components/Notification/Notification";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { usuario, token } = useAutenticacao();
  const [livros, setLivros] = useState([]);
  const [livroCovers, setLivroCovers] = useState({});
  const [viewMode, setViewMode] = useState("card"); // Estado para controlar o modo de visualização
  const [notification, setNotification] = useState({ message: "", variant: "", show: false });

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
    setNotification({ message: "Livro adicionado com sucesso!", variant: "success", show: true });
  };

  return (

    <section className="bg-primary-50">
    <>
      <div>
        <button
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={openModal}
        >
          Adicionar Livros
        </button>

        {isModalOpen && (
          <SelectModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onBookAdded={handleBookAdded}
            showNotification={(message, variant) => setNotification({ message, variant, show: true })}
          />
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mt-6 mb-3">
          <h2 className="text-xl font-semibold text-gray-900">Meus Livros</h2>
          <div className="flex gap-2">
            <button
              className={`p-2 rounded ${viewMode === "card" ? "bg-blue-700 text-white" : "bg-gray-200"}`}
              onClick={() => setViewMode("card")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </button>
            <button
              className={`p-2 rounded ${viewMode === "table" ? "bg-blue-700 text-white" : "bg-gray-200"}`}
              onClick={() => setViewMode("table")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>
          </div>
        </div>
        {livros.length > 0 ? (
          viewMode === "card" ? (
            <BooksCard books={livros} covers={livroCovers} />
          ) : (
            <BooksTable books={livros} />
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
    </>
    
    </section>
  );
};

export default Home;
