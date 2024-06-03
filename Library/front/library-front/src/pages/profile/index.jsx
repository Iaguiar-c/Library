import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../contextos/UsuarioProvider/UsuarioProvider";
import { convertToImageUrl } from "../../services/profileService";
import LogoPadrao from "../../assets/logopadrao.png";
import ModalGenerico from "../../components/ModalGenerico";
import DeleteModal from "../../components/Modals/delete-book-modal";

export default function Profile() {
  const { usuario, setUsuario } = useAutenticacao();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { deleteUsuario, editUsuario } = useUsuario();
  const navigate = useNavigate();
  const [profileUrl, setProfileUrl] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const closeModal = () => setShowEditModal(false);

  useEffect(() => {
    if (usuario && usuario.profile && usuario.profile.data) {
      const byteArray = usuario.profile.data;
      const url = convertToImageUrl(byteArray);
      setProfileUrl(url);
    } else {
      setProfileUrl(LogoPadrao);
    }

    setUsername(usuario?.name || "");
    setEmail(usuario?.email || "");
  }, [usuario]);

  const handleEditChangeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await editUsuario(usuario._id, { name: username, email: email });

      setUsuario((prev) => ({ ...prev, name: username, email: email }));

      enqueueSnackbar("Seu usuário foi alterado com sucesso.", {
        variant: "success",
      });
      setShowEditModal(false);
    } catch (error) {
      console.error(error);

      const errorMessage = error.response?.data?.error || 'Não foi possível editar o usuário. Por favor, tente novamente.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

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
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      setError("Ocorreu um erro ao deletar o usuário.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

	if (!usuario) {
		window.location.pathname = "/login";
	}

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
                  onClick={() => setShowEditModal(true)}
                />
                <span className="ml-2">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 cursor-pointer"
                    onClick={() => setShowDeleteModal(true)}
                  />
                </span>
              </span>
            </h2>
            <p className="text-gray-600 mt-2">{usuario.email}</p>
          </div>
        )}

        {!usuario && (
          <div className="p-6">
            <p className="text-gray-600">
              Faça login para visualizar o perfil.
            </p>
          </div>
        )}

        <DeleteModal
          showModal={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteProfile}
          isUserDelete={true}
        />
        <ModalGenerico
          isOpen={showEditModal}
          onRequestClose={closeModal}
          content={
            <>
              <form className="space-y-6" onSubmit={handleEditChangeSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-primary-950 dark:text-primary"
                  >
                    Nome de usuário
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Editar nome de usuário"
                    className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-primary-950 dark:text-primary"
                  >
                    E-mail
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Editar e-mail"
                    className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-primary-700 py-2 px-4 rounded-md text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
                  >
                    Editar
                  </button>
                </div>
              </form>
            </>
          }
        />
      </div>
    </>
  );
}
