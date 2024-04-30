import { useTraducao } from "../../contextos/TraducaoProvider/TraducaoProvider";
import { useTranslation } from "react-i18next";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import { useState } from "react";
import { useLivros } from "../../contextos/LivrosProvider/LivrosProvider";
import { useEffect } from "react";
import axios from "axios";
import Card from "../../components/Card";


export default function Home() {
  const { toggleTraducao } = useTraducao();
  const { t } = useTranslation();
  const { getSearch, getBook } = useLivros();
  const { usuario } = useAutenticacao();
  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);
  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            "&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU" +
            "&maxResults=20"
        )
        .then((res) => setData(res.data.items))
        .catch((err) => console.log(err));
    }
  };
  /*
  useEffect(() => {
    pegarLivrosApiGoogle();
  }, []);

  */

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

      <>
        <div className="row2">
          <h2>Pesquisa logo embaixo</h2>
          <div className="search">
            <input
              type="text"
              placeholder="Bote um nome aqui"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={searchBook}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div className="container">{<Card book={bookData} />}</div>
      </>
    </>
  );
}
