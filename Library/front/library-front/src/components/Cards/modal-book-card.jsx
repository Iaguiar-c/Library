import React from "react";

const BookCard = ({ book }) => {
  const { volumeInfo } = book;
  const { title, authors, imageLinks } = volumeInfo;
  const imageUrl = imageLinks?.thumbnail || "https://via.placeholder.com/150"; 

  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex mb-4">
      <div
        className="lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{ backgroundImage: `url(${imageUrl})` }}
        title={title}
      ></div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center">
            {authors ? `By ${authors.join(", ")}` : "Autor Desconhecido"}
          </p>
          <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-600">
              Publicado por: {volumeInfo.publisher || "Desconhecido"}
            </p>
            <p className="text-gray-600">
              Publicado em: {volumeInfo.publishedDate || "Desconhecido"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
