import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../contextos/UsuarioProvider/UsuarioProvider";
import Teste from "../../assets/1.png";
import { convertToImageUrl } from "../../services/profileService";

export default function Profile() {
  const { usuario } = useAutenticacao();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { deleteUsuario } = useUsuario();
  const navigate = useNavigate();

  const [profileUrl, setProfileUrl] = useState(null);

  useEffect(() => {
    if (usuario && usuario.profile && usuario.profile.data) {
      const byteArray = usuario.profile.data;
      const url = convertToImageUrl(byteArray);
      setProfileUrl(url);
    }
  }, [usuario]);

  const handleDeleteProfile = async () => {
    setLoading(true);

    try {
      if (usuario?._id) {
        await deleteUsuario(usuario._id);
        enqueueSnackbar("Usuário deletado com sucesso!", {
          variant: "success",
        });
        navigate("/login");
      } else {
        setError("Usuário não encontrado para deleção.", { variant: "error" });
      }
    } catch {
      console.error("Erro ao deletar usuário:", error);
      setError("Ocorreu um erro ao deletar o usuário.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {usuario && (
          <div className="p-6">
            <div className="flex items-center justify-center">
              <img
                src={profileUrl || ""}
                alt="Avatar"
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">
              {usuario.name}
              <span className="ml-2">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="text-gray-500 cursor-pointer"
                />
                <span className="ml-2">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 cursor-pointer"
                    onClick={handleDeleteProfile}
                  />
                </span>
              </span>
            </h2>
            <p className="text-gray-600 mt-2">{usuario.email}</p>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Data de Nascimento: {usuario.birthDate}
              </p>
            </div>
          </div>
        )}

        {!usuario && (
          <div className="p-6">
            <p className="text-gray-600">
              Faça login para visualizar o perfil.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
