import React, { createContext, useState, useContext } from 'react';

const TraducaoContext = createContext();

export const useTraducao = () => {
  const context = useContext(TraducaoContext);
  if (!context) {
    throw new Error('useTraducao deve ser usado dentro de um TraducaoProvider');
  }
  return context;
};

export function TraducaoProvider({ children }) {
  const [traducao, setTraducao] = useState(''); 

  const toggleTraducao = (novoIdioma) => {
    setTraducao(novoIdioma);
  };

  return (
    <TraducaoContext.Provider value={{ traducao, toggleTraducao }}>
      {children}
    </TraducaoContext.Provider>
  );
};
