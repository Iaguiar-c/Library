import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const ReviewModal = ({ isOpen, onClose, books }) => {
  const filteredBooks = books.filter((book) => book.status === "read");
  const { t } = useTranslation();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-primary-950 bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-7xl transform overflow-hidden rounded-2xl bg-primary-200 p-6 text-left align-middle shadow-xl transition-all relative ">
                <div className="absolute top-4 right-4">
                  <button
                    type="button"
                    className="text-primary-950 hover:text-primary-700 focus:outline-none"
                    onClick={onClose}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-primary-950 "
                >
                  {t("avaliacoes_dos_livros_que_foram_lidos")}
                </Dialog.Title>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                  {filteredBooks.map((book) => (
                    <div
                      key={book._id}
                      className="border p-4 rounded-lg shadow-md bg-primary-100"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold">{book.title}</h4>
                        {book.isFavorite ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 text-primary-950"
                          >
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 text-primary-950"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>
                        )}
                      </div>
                      <p className="text-gray-600">{book.author}</p>
                      <p className="text-gray-600">{book.category}</p>
                      <div className="flex items-center mt-2">
                        {Array(book.rating)
                          .fill()
                          .map((_, index) => (
                            <svg
                              key={index}
                              className="w-6 h-6 text-primary-950"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.175 3.621a1 1 0 00.95.69h3.801c.969 0 1.372 1.24.588 1.81l-3.073 2.228a1 1 0 00-.364 1.118l1.175 3.621c.3.921-.755 1.688-1.54 1.118l-3.073-2.228a1 1 0 00-1.175 0l-3.073 2.228c-.784.57-1.84-.197-1.54-1.118l1.175-3.621a1 1 0 00-.364-1.118L2.34 8.048c-.784-.57-.38-1.81.588-1.81h3.801a1 1 0 00.95-.69l1.175-3.621z" />
                            </svg>
                          ))}
                      </div>
                      <p className="mt-2">{book.comments}</p>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReviewModal;
