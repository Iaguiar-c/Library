import { createContext, useState, useEffect, useContext } from "react";
import { Api, http } from "../../services/api";
import { getUsuarioNoLocalStorage, setUsuarioNoLocalStorage } from "./util";

export const UsuarioContext = createContext({});
UsuarioContext.displayName = "Cria Usuario Context";

export const useAutenticacao = () => {
  const contexto = useContext(UsuarioContext);
  return contexto;
};

export const AutenticacaoProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '' || null || undefined);
  const [config, setConfig] = useState({});

  useEffect(() => {
    async function pegaToken() {
      const res = await http.pegaToken();
      setToken(res || '');
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
    if (usuario) {
      const usuario = getUsuarioNoLocalStorage();
      setUsuario(usuario);
    }
  }, []);

  async function login(email, password) {
    try {
      const response = await Api.post("auth/login", { email, password }, config);
      const user = response.data.user;
      const token = response.data.token;
      setUsuario(user);
      setToken(token);
      await setUsuarioNoLocalStorage(user, token);
    } catch (error) {
      return null;
    }
  }

  function logout() {
    setUsuario(null);
    setToken('');
    localStorage.clear();
  }

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout, config, token }}>
      {children}
    </UsuarioContext.Provider>
  );
};
