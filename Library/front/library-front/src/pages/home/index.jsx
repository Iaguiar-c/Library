import { useTraducao } from "../../contextos/TraducaoProvider/TraducaoProvider";
import { useTranslation } from "react-i18next";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import { useState } from "react";
import { useLivros } from "../../contextos/LivrosProvider/LivrosProvider";
import { useEffect } from 'react';

export default function Home() {
  const { toggleTraducao } = useTraducao();
  const { t } = useTranslation();
  const { pegarLivrosApiGoogle } = useLivros();
  const { usuario } = useAutenticacao();

  useEffect(() => {
    pegarLivrosApiGoogle();
  }, []);

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
    </>
  );
}
