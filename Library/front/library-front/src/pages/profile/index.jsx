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
  const [isOpen, setIsOpen] = useState(false);
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

    if (
      username === usuario.name &&
      email === usuario.email &&
      profile === usuario.profile
    ) {
      enqueueSnackbar(t("voce_ja_esta_utilizando_este_valor"), {
        variant: "warning",
      });
      setLoading(false);
      return;
    }

    const updates = {};
    if (username !== usuario.name) updates.name = username;
    if (email !== usuario.email) updates.email = email;
    if (profile !== usuario.profile) updates.profile = profile || "";

    try {
      await editUsuario(usuario._id, updates);

      setUsuario((prev) => ({ ...prev, ...updates }));
      // await editUsuario(usuario._id, {
      //   name: username,
      //   email: email,
      //   profile: profile,
      // });

      // setUsuario((prev) => ({
      //   ...prev,
      //   name: username,
      //   email: email,
      //   profile: profile,
      // }));

      enqueueSnackbar(t("usuario_alterado_com_sucesso"), {
        variant: "success",
      });
      setShowEditModal(false);
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.response?.data?.msg || t("nao_foi_possivel_editar_o_usuario");
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setLoading(false);
    }
    handleCloseEditModal();
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
        setError(t("usuario_nao_encontrado_para_deletar"), {
          variant: "error",
        });
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

  const handleCloseEditModal = () => {
    setIsOpen(false);
  };

  const handleEditClick = () => {
    setIsOpen(true); // Abrir o modal de edição
  };

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
                    onClick={handleEditClick}
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
                  <p className="text-xl text-primary-900 mt-2">
                    {usuario.email}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {!usuario && (
          <div className="p-6">
            <p className="text-primary-900">
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

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-950 bg-opacity-30">
            <div
              className="p-8 bg-primary-100 shadow-md rounded-lg"
              style={{ width: "50%" }}
            >
              <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-semibold text-primary-950">
                  {t("editar_perfil")}
                </h1>
                <button
                  onClick={handleCloseEditModal}
                  className="text-primary-700 hover:text-primary-900 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form className="space-y-4" onSubmit={handleEditChangeSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-1 text-sm font-medium text-primary-950"
                  >
                    {t("nome_de_usuario")}
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t("editar_nome_de_usuario")}
                    className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-primary-950"
                  >
                    {t("e_mail")}
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("editar_email")}
                    className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="profile"
                    className="block mb-1 text-sm font-medium text-primary-950"
                  >
                    {t("foto_de_perfil")}
                  </label>
                  <input
                    type="text"
                    name="profile"
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    placeholder={t("editar_foto_de_perfil")}
                    className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-primary-700 py-2 px-4 rounded-md text-sm font-semibold text-primary-100 shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
                  >
                    {t("editar")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
