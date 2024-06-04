import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../contextos/UsuarioProvider/UsuarioProvider";
import LogoPadrao from "../../assets/logopadrao.png";
import ModalGenerico from "../../components/ModalGenerico";
import DeleteModal from "../../components/Modals/delete-book-modal";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      await editUsuario(usuario._id, { name: username, email: email, profile: profile });

      setUsuario((prev) => ({ ...prev, name: username, email: email,  profile: profile }));

      enqueueSnackbar(t("usuario_alterado_com_sucesso"), {
        variant: "success",
      });
      setShowEditModal(false);
    } catch (error) {
      console.error(error);

      const errorMessage = error.response?.data?.error || t("nao_foi_possivel_editar_o_usuario");
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
        enqueueSnackbar(t("usuario_deletado_com_sucesso"), {
          variant: "success",
        });
        navigate("/login");
      } else {
        setError(t("usuario_nao_encontrado_para_deletar"), { variant: "error" });
      }
    } catch (error) {
      console.error(t("erro_ao_deletar_usuario"), error);
      setError(t("ocorreu_um_erro_ao_deletar_usuario"), { variant: "error" });
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
              {t("faca_login_para_visualizar_o_perfil")}
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
                    {t("nome_de_usuario")}
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t("editar_nome_de_usuario")}
                    className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-primary-950 dark:text-primary"
                  >
                    {t("e_mail")}
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("editar_email")}
                    className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="profile"
                    className="block mb-2 text-sm font-medium text-primary-950 dark:text-primary"
                  >
                    {t("foto_de_perfil")}
                  </label>
                  <input
                    type="text"
                    name="profile"
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    placeholder={t("editar_foto_de_perfil")}
                    className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-primary-700 py-2 px-4 rounded-md text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
                  >
                    {t("editar")}
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
