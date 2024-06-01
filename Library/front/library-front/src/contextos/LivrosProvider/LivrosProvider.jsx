import { useAutenticacao } from "../AutenticacaoProvider/AutenticacaoProvider";
import { createContext, useContext, useState } from "react";
import { Api } from "../../services/api";
import googleBooksApiKey from "./apikeys";

export function useLivros() {
  const contextoLivros = useContext(LivrosContext);
  return contextoLivros;
}

const LivrosContext = createContext({});
LivrosContext.displayName = "Livros Context";

export function LivrosProvider({ children }) {
  const [livros, setLivros] = useState([]);
  const [search, setSearch] = useState("React");
  const { config } = useAutenticacao();

  async function pegarLivrosApiGoogle() {
    try {
      const resposta = await Api.get(
        `https://www.googleapis.com/books/v1/volumes?q=` +
          search +
          `&key=${googleBooksApiKey}` +
          "&maxResults=40",
        config
      );
      console.log("contexto livros:", resposta);
      setLivros(resposta.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllBooksForUser(userId) {
    try {
      const response = await fetch(`/books/books-without-pagination?userId=${userId}`);
      console.log(response.data)
      setLivros(response.data)      
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }

  return (
    <LivrosContext.Provider
      value={{
        pegarLivrosApiGoogle,
        livros,
        setLivros,
        getAllBooksForUser
      }}
    >
      {children}
    </LivrosContext.Provider>
  );
}
