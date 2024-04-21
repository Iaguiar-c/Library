import { useAutenticacao } from "../AutenticacaoProvider/AutenticacaoProvider";
import { createContext, useContext, useState } from "react";
import googleBooksApiKey from "./apikeys";
import { Api } from "../../services/api";

export function useLivros() {
  const contextoLivros = useContext(LivrosContext);
  return contextoLivros;
}

const LivrosContext = createContext({});
LivrosContext.displayName = "Livros Context";

export function LivrosProvider({ children }) {
  const [livros, setLivros] = useState([]);
  const { config } = useAutenticacao();

  async function pegarLivrosApiGoogle() {
    try {
      const resposta = await Api.get(
        `https://www.googleapis.com/books/v1/volumes?key=${googleBooksApiKey}`,
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
