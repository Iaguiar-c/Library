import React, { useState, useEffect } from "react";
import { useTraducao } from "../../contextos/TraducaoProvider/TraducaoProvider";
import { useTranslation } from "react-i18next";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
//import { useLivros } from "../../contextos/LivrosProvider/LivrosProvider";
//import axios from "axios";
import SelectModal from "../../components/Modals/select-add-books-modal";
import { Api } from "../../services/api";
import BookCard from "../../components/Cards/book-card-home";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toggleTraducao } = useTraducao();
  const { t } = useTranslation();
  const { usuario, token, config } = useAutenticacao();
  const [livros, setLivros] = useState([]);

  const fetchLivros = async () => {
    try {
      const response = await Api.get("/books", {
        params: { userId: usuario?._id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLivros(response.data.books);
    } catch (error) {
      console.error("Erro ao buscar livros:", error.message);
    }
  };

  useEffect(() => {
    if (usuario) {
      fetchLivros();
    }
  }, [usuario, token]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          <SelectModal isOpen={isModalOpen} onClose={closeModal} />
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          Meus Livros
        </h2>
        {livros.length > 0 ? (
          <ul>
            {livros.map((livro) => (
              <li key={livro._id}>{livro.title}</li>
            ))}
          </ul>
        ) : (
          <p>Você ainda não possui livros adicionados.</p>
        )}

        {isModalOpen && (
          <SelectModal isOpen={isModalOpen} onClose={closeModal} />
        )}
      </div>
    </>
  );
};

export default Home;
