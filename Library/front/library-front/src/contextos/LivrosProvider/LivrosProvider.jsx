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

  return (
    <LivrosContext.Provider
      value={{
        pegarLivrosApiGoogle,
        livros,
        setLivros,
      }}
    >
      {children}
    </LivrosContext.Provider>
  );
}
