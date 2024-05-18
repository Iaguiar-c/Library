import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";

const BookSingleCard = ({ book, coverUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white relative shadow-md p-4 rounded-lg transition-transform transform hover:scale-105 max-w-xs"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full overflow-hidden rounded-lg flex justify-center items-center" >
        <img
          src={coverUrl || "https://via.placeholder.com/150"}
          alt={book.title}
          className="object-cover"
         
        />
      </div>
      <p className="mt-1 text-lg font-medium text-gray-900">{book.title}</p>
      <h3 className="mt-4 text-sm text-gray-700">{book.author}</h3>
      <h2 className="mt-4 text-sm text-gray-700">{book.category}</h2>
      
      <div className="flex justify-between items-center gap-x-2 mt-4">
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
        </Link>
      </div>
    </div>
  );
};

export default BookSingleCard;
