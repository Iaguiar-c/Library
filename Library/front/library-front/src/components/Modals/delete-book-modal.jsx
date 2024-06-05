import React from "react";
import { useTranslation } from "react-i18next";

const DeleteModal = ({
  showModal,
  onClose,
  onConfirm,
  selectedBooksCount,
  isUserDelete,
}) => {


  const { t } = useTranslation();
  if (!showModal) return null;

  return (
    <div
      id="deleteModal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-950 bg-opacity-30"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative p-4 text-center bg-primary-100 rounded-lg shadow dark:bg-primary-800 sm:p-5">
          <button
            type="button"
            className="text-primary-800 absolute top-2.5 right-2.5 bg-transparent hover:text-gray-950 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-primary-900 dark:hover:text-primary-950"
            onClick={onClose}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Fechar</span>
          </button>
          <svg
            className="text-primary-950 dark:text-primary-500 w-11 h-11 mb-3.5 mx-auto"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>

          {isUserDelete ? (
            <>
              <p className="mb-4 text-gray-500 dark:text-gray-300">
                {t("excluir_usuario")}
              </p>
            </>
          ) : (
            <>
              <p className="mb-4 text-gray-500 dark:text-gray-300">
                {selectedBooksCount > 1
                  ? `Você tem certeza que deseja deletar esses ${selectedBooksCount} livros?`
                  : "Você tem certeza que deseja deletar este livro?"}
              </p>
            </>
          )}
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={onClose}
              className="py-2 px-3 text-sm font-medium text-primary-950 bg-primary-200 rounded-lg border border-primary-200 hover:bg-primary-100 focus:ring-4"
            >
              {t("nao_cancelar")}
            </button>
            <button
              onClick={onConfirm}
              className="py-2 px-3 text-sm font-medium text-center text-primary-50 bg-primary-700 rounded-lg hover:bg-primary-950"
            >
             {t("sim_tenho_certeza")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;