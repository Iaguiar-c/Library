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
  const [userExist, setUserExist] = useState([]);
  const { config, logout } = useAutenticacao();

  async function postUsuario(name, email, password, confirmpassword, profilepicture) {
    try {
      const response = await Api.post("user/register", { name, email, password, confirmpassword, profilepicture });
      setUsuario(response.data);
    } catch (error) {
      throw error; 
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
  
  async function forgotPasswordCheckUser(email){
    try {      
      const response = await Api.get(`user/check-email/${email}`);
      setUserExist(response)
    } catch (error){
      throw error; 
    }
  }

  return (
    <UsuarioContext.Provider
      value={{
        postUsuario,
        deleteUsuario,
        usuario,
        setUsuario,
        userExist,
        forgotPasswordCheckUser
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}