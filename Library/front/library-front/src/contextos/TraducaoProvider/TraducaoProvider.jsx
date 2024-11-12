import React, { createContext, useState, useContext, useEffect } from 'react';

const TraducaoContext = createContext();

export const useTraducao = () => {
  const context = useContext(TraducaoContext);
  if (!context) {
    throw new Error('useTraducao deve ser usado dentro de um TraducaoProvider');
  }
  return context;
};

export function TraducaoProvider({ children }) {
  const [traducao, setTraducao] = useState(() => {
    return sessionStorage.getItem("language") || 'pt';
  });

  useEffect(() => {
    sessionStorage.setItem("language", traducao);
  }, [traducao]);

  const toggleTraducao = (novoIdioma) => {
    setTraducao(novoIdioma);
  };

  return (
    <TraducaoContext.Provider value={{ traducao, setTraducao, toggleTraducao }}>
      {children}
    </TraducaoContext.Provider>
  );
};
