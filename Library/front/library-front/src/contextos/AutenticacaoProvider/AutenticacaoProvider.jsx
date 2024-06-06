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
  const [usuario, setUsuario] = useState(() => {
    return getUsuarioNoLocalStorage();
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [config, setConfig] = useState({});

  useEffect(() => {
    async function pegaToken() {
      const res = await http.pegaToken();
      setToken(res || "");
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
    const usuarioLocal = getUsuarioNoLocalStorage();
    if (usuarioLocal) {
      setUsuario(usuarioLocal);
    }
  }, []);

  async function login(email, password) {
    try {
      const response = await Api.post(
        "user/login",
        { email, password },
        config
      );
      const user = response.data.user;
      const token = response.data.token;
      
      setUsuario(user);
      setToken(token);
      await setUsuarioNoLocalStorage(user, token);
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
    }
  }

  function logout() {
    setUsuario(null);
    setToken("");
    localStorage.clear();
  }

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout, config, token, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};
