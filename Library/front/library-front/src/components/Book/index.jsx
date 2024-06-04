import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Book({ srcImg, title, authors, published, id }) {
  const { t } = useTranslation();

  return(

  <div className="bg-white rounded-md p-4 shadow-md">
    <div className="flex flex-col md:flex-row">
      <div className="flex-shrink-0">
        <img
          src={srcImg}
          alt={title}
          className="rounded-sm w-32 h-48 object-cover"
        />
      </div>
      <div className="md:ml-4 mt-4 md:mt-0 flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            <Link to={`books/${id}`}>{title}</Link>
          </h2>
          <h3 className="text-sm text-gray-600">
            {t("autor")}: {authors?.join(', ') || 'Unknown'}
          </h3>
          <p className="text-sm text-gray-600">
            {t("publicacao")}: <time>{published || 'Unknown'}</time>
          </p>
        </div>
        <Link to={`books/${id}`} className="mt-4 md:mt-0">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {t("mais_informacoes")}
          </button>
        </Link>
      </div>
    </div>
  </div>
  )
};

Book.propTypes = {
  srcImg: PropTypes.string,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  published: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Book;
