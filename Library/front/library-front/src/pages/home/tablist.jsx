import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Api } from "../../services/api";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";

const TabListContainer = styled.div`
  ${tw`w-full overflow-hidden`}
  display: flex;
  justify-content: center;
`;

const TabListWrapper = styled.div`
  ${tw`relative right-0 mb-1`}
`;

const TabList = styled.ul`
  ${tw`relative flex list-none rounded-lg bg-primary-200 inline-flex items-center justify-center`}
  width: 450px;
  height: 56px;
  border-radius: 12px;
`;

const Tab = styled.li`
  ${tw`flex items-center justify-center me-2`}
  width: 90px;
  height: 40px;
`;

const TabButton = styled.a`
  ${tw`flex items-center justify-center w-full h-full transition-all ease-in-out cursor-pointer relative`}
  ${({ isActive }) => (isActive ? tw`text-primary-50` : tw`text-primary-950 `)}
  
  span {
    ${tw`block w-full text-center`}
    position: relative;
    z-index: 1;
  }
`;

const TabIndicator = styled.div`
  ${tw`absolute bg-primary-700 transition-all duration-500 ease-in-out`}
  width: ${({ width }) => width}px;
  height: 80%;
  left: ${({ left }) => left}px;
  top: 6px;
  border-radius: 10px;
`;

const tabs = [
  { label: "Tudo", value: "ALL" },
  { label: "Lido", value: "read" },
  { label: "Lendo", value: "reading" },
  { label: "Quero Ler", value: "to-read" },
];

const TabComponent = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const { usuario, token } = useAutenticacao();
  const tabsRef = useRef([]);

  const fetchBooks = useCallback(async (status = "ALL") => {
    if (!usuario || !token) {
      console.error("Token ou usuário não disponível. Realize o login novamente.");
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await Api.get("/books", {
        params: {
          userId: usuario._id,
          status: status === "ALL" ? undefined : status,
        },
        ...config,
      });

      setBooks(response.data.books);
    } catch (error) {
      console.error("Erro ao buscar livros:", error.message);
    }
    setLoading(false);
  }, [usuario, token]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    fetchBooks(activeTab);
    onTabChange(activeTab);
  }, [activeTab, onTabChange, fetchBooks]);

  useEffect(() => {
    const activeTabElement = tabsRef.current[activeTab];
    if (activeTabElement) {
      setIndicatorStyle({
        width: activeTabElement.offsetWidth,
        left: activeTabElement.offsetLeft,
      });
    }
  }, [activeTab]);

  return (
    <TabListContainer>
      <TabListWrapper>
        <TabList role="list">
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              ref={(el) => (tabsRef.current[tab.value] = el)}
            >
              <TabButton
                onClick={() => setActiveTab(tab.value)}
                isActive={activeTab === tab.value}
                role="tab"
                aria-selected={activeTab === tab.value}
              >
                <span className="ml-1">{tab.label}</span>
              </TabButton>
            </Tab>
          ))}
          <TabIndicator
            width={indicatorStyle.width}
            left={indicatorStyle.left}
          />
        </TabList>
      </TabListWrapper>
    </TabListContainer>
  );
};

export default React.memo(TabComponent);
