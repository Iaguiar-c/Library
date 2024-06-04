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
  const [profileUrl, setProfileUrl] = useState(LogoPadrao);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const closeModal = () => setShowEditModal(false);

  useEffect(() => {
    if (usuario && usuario.profile) {
      setProfileUrl(usuario.profile);
    } else {
      setProfileUrl(LogoPadrao);
    }

    setUsername(usuario?.name || "");
    setEmail(usuario?.email || "");
    setProfile(usuario?.profile || "");
  }, [usuario]);

  const handleEditChangeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await editUsuario(usuario._id, {
        name: username,
        email: email,
        profile: profile,
      });

      setUsuario((prev) => ({
        ...prev,
        name: username,
        email: email,
        profile: profile,
      }));

      enqueueSnackbar("Seu usuário foi alterado com sucesso.", {
        variant: "success",
      });
      setShowEditModal(false);
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.error ||
        "Não foi possível editar o usuário. Por favor, tente novamente.";
      enqueueSnackbar(errorMessage, { variant: "error" });
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
     <div className="flex justify-center items-center h-screen">
  <div className="max-w-3xl w-full mx-auto bg-primary-100 shadow-md rounded-lg overflow-hidden">
    {usuario && (
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-semibold text-primary-950 m-6">
            Seu Perfil
          </h1>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faEdit}
              className="text-primary-700 cursor-pointer mr-4 text-2xl"
              onClick={() => setShowEditModal(true)}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="text-primary-700 cursor-pointer text-2xl"
              onClick={() => setShowDeleteModal(true)}
            />
          </div>
        </div>
        <div className="flex items-center mb-6">
          <img
            src={profileUrl || ""}
            alt="Avatar"
            className="h-50 w-48 rounded-full object-cover mr-6"
          />
          <div>
            <h2 className="text-3xl font-semibold text-primary-950">
              Olá, {usuario.name}!
            </h2>
            <p className="text-xl text-primary-900 mt-2">{usuario.email}</p>
          </div>
        </div>
      </div>
    )}
  </div>
        {!usuario && (
          <div className="p-6">
            <p className="text-gray-900">
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
                  <label
                    htmlFor="profile"
                    className="block mb-2 text-sm font-medium text-primary-950 dark:text-primary"
                  >
                    Foto de Perfil
                  </label>
                  <input
                    type="text"
                    name="profile"
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
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
