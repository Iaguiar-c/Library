import React, { useState } from "react";
import { useTraducao } from "../../contextos/TraducaoProvider/TraducaoProvider";
import { useTranslation } from "react-i18next";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
//import { useLivros } from "../../contextos/LivrosProvider/LivrosProvider";
//import axios from "axios";
import SelectModal from "../../components/Modals/select-add-books-modal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { toggleTraducao } = useTraducao();
  const { t } = useTranslation();
  const { usuario } = useAutenticacao();

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
    </>
  );
};

export default Home;
