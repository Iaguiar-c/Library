import { useTraducao } from "../../contextos/Traducao/TraducaoProvider";
import { useTranslation } from "react-i18next";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { toggleTraducao } = useTraducao();
  const { t } = useTranslation();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // Obtenha o ID do usuário do localStorage
    const userId = localStorage.getItem("userId");

    axios
      .get(`http://localhost:5555/books?userId=${userId}`)
      .then((response) => {
        setBooks(response.data.books);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleUploadBook = () => {
    navigate("/books/create");
  };

  const totalBooks = books.length;

  return (
    <div>
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

      <div>
        <div className="p-4">
          <div className="flex justify-center items-center gap-x-4">
            <button
              className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
              onClick={() => setShowType("table")}
            >
              Table
            </button>
            <button
              className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
              onClick={() => setShowType("card")}
            >
              Card
            </button>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl my-8">Total: {totalBooks}</h1>

            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleUploadBook}
            >
              Novo +
            </button>
          </div>
          {loading ? (
            <div></div>
          ) : showType === "table" ? (
            <div></div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
