import React, { useState } from "react";
import BookSingleCard from "./book-single-card";

const BooksCard = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="relative m-4">
      <label htmlFor="inputSearch" className="sr-only">
        Search
      </label>
      <div className="relative mb-4">
        <input
          id="inputSearch"
          type="text"
          placeholder="Título, Gênero, Autor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full max-w-xs rounded-lg border py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4 text-neutral-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {filteredBooks.map((book) => {
          console.log("Conteúdo da imageUrl:", book.imageUrl);
          return (
            <BookSingleCard
              key={book._id}
              book={book}
              coverUrl={book.imageURL || "https://via.placeholder.com/150"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BooksCard;
