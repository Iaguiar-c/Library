import React, { createContext, useContext, useState } from 'react';

const initialState = {
  alert: {
    open: false,
    severity: 'info',
    message: '',
  },
};

const Context = createContext();

export const useValue = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const updateState = (updatedState) => {
    setState((prevState) => ({
      ...prevState,
      ...updatedState,
    }));
  };

  return (
    <Context.Provider value={{ state, updateState }}>
      {children}
    </Context.Provider>
  );
};
