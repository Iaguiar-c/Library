import React, { useState, useEffect } from "react";
import { useTraducao } from "../../contextos/TraducaoProvider/TraducaoProvider";
import { useTranslation } from "react-i18next";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import SelectModal from "../../components/Modals/select-add-books-modal";
import { Api } from "../../services/api";
import BooksCard from "../../components/Cards/books-card";
import BooksTable from "../../components/Table/books-table";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toggleTraducao } = useTraducao();
  const { t } = useTranslation();
  const { usuario, token } = useAutenticacao();
  const [livros, setLivros] = useState([]);
  const [livroCovers, setLivroCovers] = useState({});
  const [viewMode, setViewMode] = useState("card"); 

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
  };

  return (
    <>
      <div>
        Olá, {usuario?.name} bem-vindo(a) ao Bookster!
        {t("ola_mundo")}
        <button type="submit" onClick={() => toggleTraducao("pt")}>
          Português
        </button>
        <button type="submit" onClick={() => toggleTraducao("en")}>
          Inglês
        </button>
        <button type="submit" onClick={() => toggleTraducao("es")}>
          Espanhol
        </button>
      </div>

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
          />
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mt-6 mb-3">
          <h2 className="text-xl font-semibold text-gray-900">Meus Livros</h2>
          <div>
            <button
              className={`mr-2 px-4 py-2 rounded ${
                viewMode === "card" ? "bg-blue-700 text-white" : "bg-gray-200"
              }`}
              onClick={() => setViewMode("card")}
            >
              Card
            </button>
            <button
              className={`px-4 py-2 rounded ${
                viewMode === "table" ? "bg-blue-700 text-white" : "bg-gray-200"
              }`}
              onClick={() => setViewMode("table")}
            >
              Tabela
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
    </>
  );
};

export default Home;
