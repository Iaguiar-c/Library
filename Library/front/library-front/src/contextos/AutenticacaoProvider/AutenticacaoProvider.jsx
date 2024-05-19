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

      // console.log(user)
      // if (user.profile && user.profile.data) {
      //   const buffer = user.profile.data;
      //   const base64String = Buffer.from(buffer).toString('base64');
      //   const mimeType = 'image/png'; 
      //   user.profileUrl = `data:${mimeType};base64,${base64String}`;
      // }
  
      setUsuario(user);
      setToken(response.data.token);
      await setUsuarioNoLocalStorage(user, response.data.token);
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
    <UsuarioContext.Provider value={{ usuario, login, logout, config, token }}>
      {children}
    </UsuarioContext.Provider>
  );
};
