import { useAutenticacao } from "../AutenticacaoProvider/AutenticacaoProvider";
import { createContext, useContext, useState } from "react";
import { Api } from "../../services/api";

export function useUsuario() {
  const contextoUsuario = useContext(UsuarioContext);
  return contextoUsuario;
}

const UsuarioContext = createContext({});
UsuarioContext.displayName = "Usuario Context";

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState([]);
  const { config, logout } = useAutenticacao();

  async function postUsuario(name, email, password, confirmpassword) {
    try {
      const response = await Api.post("user/register", { name, email, password, confirmpassword }, config);
      setUsuario(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUsuario(id) {
    try {
      await Api.delete(`user/delete/${id}`, config);
      logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UsuarioContext.Provider
      value={{
        postUsuario,
        deleteUsuario,
        usuario,
        setUsuario
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}