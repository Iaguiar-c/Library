import React from "react";

const HomeBookCard = ({ livro, coverUrl }) => {
  if (!livro) {
    console.error("Livro indefinido");
    return null; 
  }

  const { title, author, category } = livro;

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-2">
      <div className="group relative bg-white p-4 rounded-lg shadow-md">
        <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
          <img
            src={coverUrl}
            alt="Capa do Livro"
            className="object-cover w-full h-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
        </div>
        <div className="mt-4">
          <h3 className="text-sm md:text-base text-gray-700">
            <a href="#" className="hover:text-blue-500">
              {title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{author}</p>
          <p className="mt-1 text-sm text-gray-500">{category}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeBookCard;
