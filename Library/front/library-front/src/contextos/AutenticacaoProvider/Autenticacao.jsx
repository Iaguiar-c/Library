import { AxiosRequestConfig } from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { Api, http } from "../../services/api";
import { getUsuarioNoLocalStorage, setUsuarioNoLocalStorage } from "./util";

export const CriaUsuarioContext = createContext({});
CriaUsuarioContext.displayName = "Cria Usuario Context";

export const useAutenticacao = () => {
  const contexto = useContext(CriaUsuarioContext);
  return contexto;
};

export const AutenticadoProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [config, setConfig] = useState({});

  useEffect(() => {
    async function pegaToken() {
      const res = await http.pegaToken();
      setToken(res);
    }
    pegaToken();
  }, []);

  useEffect(() => {
    setConfig({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  useEffect(() => {
    const usuario = getUsuarioNoLocalStorage();

    if (usuario) {
      setUsuario(usuario);
    }
  }, []);

  async function login(email, senha) {
    try {
      const response = await Api.post("login", { email, senha }, config);
      const user = response.data.usuario;
      const token = response.data.token;
      setUsuario(user);
      setToken(token);
      await setUsuarioNoLocalStorage(user, token);
    } catch (error) {
      return null;
    }
  }

  function logout() {
    setUsuario({});
    setToken('');
    localStorage.clear();
  }

  return (
    <CriaUsuarioContext.Provider value={{ usuario, login, logout, config, token }}>
      {children}
    </CriaUsuarioContext.Provider>
  );
};
