import React from "react";
import { Disclosure } from "@headlessui/react";
import { useTranslation } from "react-i18next";

const HelpModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const faqs = [
      {
        question: t("como_adicionar_um_livro"),
        answer:
          t("question1"),
      },
      {
        question: t("como_marcar_um_livro_como_favorito"),
        answer:
          t("question2"),
      },
      {
        question: t("como_avaliar_um_livro"),
        answer:
          t("question3"),
      },
      {
        question: t("como_editar_o_meu_perfil"),
        answer:
          t("question4"),
      },
      {
        question: t("como_excluir_o_meu_perfil"),
        answer:
          t("question5"),
      },
    ];
  
    return (
      isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-950 bg-opacity-30">
          <div className="relative bg-primary-100 p-8 max-w-lg rounded-lg shadow-lg ">
            <button
              className="absolute top-4 right-4 text-primary-700 hover:text-primary-900 focus:outline-none"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-xl font-semibold mb-4">{t("precisa_de_ajuda")}</h2>
            <div className="space-y-4 overflow-y-auto px-4 custom-scrollbar" style={{ maxHeight: "calc(100vh - 200px)" }}>
              {faqs.map((faq, index) => (
                <Disclosure key={index}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full py-2 px-4 bg-primary-200 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-primary-600 focus-visible:ring-opacity-75">
                        <span className="text-lg font-medium">
                          {faq.question}
                        </span>
                        <svg
                          className={`${
                            open ? "transform rotate-180" : ""
                          } w-6 h-6 text-primary-700`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={open ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                          />
                        </svg>
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 bg-gray-100 rounded-b-lg">
                        <p className="text-primary-900">{faq.answer}</p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
      )
    );
  };
  
  export default HelpModal;
  