import React, { useState, useEffect } from "react";
import BookSingleCard from "./book-single-card";

const BooksCard = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [covers, setCovers] = useState({});

  useEffect(() => {
    const fetchBookCovers = async () => {
      const fetchedCovers = {};
      for (const book of books) {
        try {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
              book.title
            )}`
          );
          const data = await response.json();
          if (data.items && data.items.length > 0) {
            const coverUrl = data.items[0].volumeInfo.imageLinks?.thumbnail;
            fetchedCovers[book._id] = coverUrl || ""; 
          } else {
            fetchedCovers[book._id] = ""; 
          }
        } catch (error) {
          console.error("Error fetching book cover:", error);
          fetchedCovers[book._id] = ""; 
        }
      }
      setCovers(fetchedCovers);
    };

    fetchBookCovers();
  }, [books]);

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
        {filteredBooks.map((book) => (
          <BookSingleCard key={book._id} book={book} coverUrl={covers[book._id]} />
        ))}
      </div>
    </div>
  );
};

export default BooksCard;