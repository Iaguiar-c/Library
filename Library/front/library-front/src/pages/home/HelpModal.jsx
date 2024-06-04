import React from "react";
import { Disclosure } from "@headlessui/react";

const HelpModal = ({ isOpen, onClose }) => {
  const faqs = [
    {
      question: "Como adicionar um livro?",
      answer:
        "Para adicionar um livro, clique no botão '+' e selecione a melhor opção: adicionando Manualmente ou por Preenchimento automático.",
    },
    {
      question: "Como marcar um livro como favorito?",
      answer:
        "Um livro só pode ser marcado como favorito quando o status dele está como 'Lido'. Isso pode ser definido no momento de adicionar o livro ou ao editar.",
    },
    {
      question: "Como avaliar um livro?",
      answer:
        "Para avaliar um livro, primeiramente o status dele deve estar como 'Lido'. Atendendo a esse critério uma seção de avalição irá aparecer ao adicionar ou editar o livro.",
    },
    {
      question: "Como editar o meu Perfil?",
      answer:
        "Para editar o seu perfil, clique no seu ícone de usuário no canto superior direito da tela e selecione a opção 'Seu Perfil'. Lá você verá um ícone de edição e poderá editar o seu nome de usuário, email e Foto de Perfil.",
    },
    {
      question: "Como excluir o meu Perfil?",
      answer:
        "Para excluir o seu perfil, clique no seu ícone de usuário no canto superior direito da tela e selecione a opção 'Seu Perfil'. Lá você verá um ícone de lixeira e poderá excluir o seu Perfil.",
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
          <h2 className="text-xl font-semibold mb-4">Precisa de Ajuda?</h2>
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
