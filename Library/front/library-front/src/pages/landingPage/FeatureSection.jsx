import React, { useRef, useEffect, useState, forwardRef } from "react";
import { Transition } from "@headlessui/react";
import personalidade from "../../assets/personalidade.png";
import seguranca from "../../assets/segurança.jpg";
import ferramenta from "../../assets/ferramenta.jpg";
import { Container, Description, Heading, Section } from "./styles";

const FeatureSection = forwardRef((props, ref) => {
  const [tab, setTab] = useState(1);
  const tabs = useRef(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement) {
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
    }
  };

  useEffect(() => {
    heightFix();
  }, [tab]);

  const solutions = [
    {
      title: "Experiência Personalizada e Intuitiva",
      description:
        "Nossa plataforma oferece uma interface amigável e fácil de usar, permitindo que você personalize seu perfil e escreva avaliações de seus livros para melhorar sua experiência de leitura.",
      content: personalidade,
    },
    {
      title: "Segurança e Suporte",
      description:
        "Priorizamos a segurança dos seus dados com práticas robustas e oferecemos suporte multilíngue para atender usuários globais.",
      content: seguranca,
    },
    {
      title: "Ferramentas Avançadas de Biblioteca",
      description:
        "Com uma vasta coleção de conteúdo disponível e funcionalidades de pesquisa avançadas, você pode facilmente encontrar e adicionar novos títulos à sua biblioteca digital.",
      content: ferramenta,
    },
  ];

  return (
    <Section ref={ref}>
      <Container>
        <div className="pt-12 md:pt-20">
          <div className="max-w-3xl mx-auto text-center">
            <Heading>Recursos Incríveis</Heading>
            <Description>
              Conheça as principais funcionalidades que tornam nossa biblioteca
              digital única e adaptada às suas necessidades.
            </Description>
          </div>
          <div className="md:grid md:grid-cols-12 md:gap-6">
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8"></div>
              <div className="mb-8 md:mb-0">
                {solutions.map((solution, index) => (
                  <a
                    key={index}
                    className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                      tab !== index + 1
                        ? "bg-primary-100 shadow-md border-primary-200 hover:shadow-lg"
                        : "bg-primary-200 border-transparent"
                    }`}
                    href="#0"
                    onClick={(e) => {
                      e.preventDefault();
                      setTab(index + 1);
                    }}
                  >
                    <div>
                      <div className="font-bold leading-snug tracking-tight mb-1 text-primary-800 text-2xl">
                        {solution.title}
                      </div>
                      <div className="text-primary-600">
                        {solution.description}
                      </div>
                    </div>
                    <div className="flex justify-center items-center w-8 h-8 bg-primary-100 rounded-full shadow flex-shrink-0 ml-3">
                      <svg
                        className="w-3 h-3 fill-current"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 ">
              <div className="transition-all">
                <div
                  className="relative flex flex-col text-center lg:text-right"
                  ref={tabs}
                >
                  {solutions.map((solution, index) => (
                    <Transition
                      key={index}
                      show={tab === index + 1}
                      appear={true}
                      className="w-full"
                      enter="transition ease-in-out duration-700 transform order-first"
                      enterFrom="opacity-0 translate-y-16"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in-out duration-300 transform absolute"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-16"
                      beforeEnter={() => heightFix()}
                      unmount={false}
                    >
                      <div className="inline-flex flex-col">
                        <div className="h-200 mb-6 mt-20 rounded-lg overflow-hidden">
                          <div
                            className=""
                            style={{ width: "100%", height: "200%" }}
                          >
                            <img
                              src={solution.content}
                              alt={solution.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        <div
                          className="md:max-w-none absolute w-full left-0 transform animate-float w-full"
                          style={{ top: "30%" }}
                        ></div>
                      </div>
                    </Transition>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
});

export default FeatureSection;
