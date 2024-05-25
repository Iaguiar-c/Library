import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useUsuario } from "../../contextos/UsuarioProvider/UsuarioProvider";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import AnimacaoInicioBookster from "../../components/AnimacaoInicioBookster";
import ModalGenerico from "../../components/ModalGenerico";
import { termosContent } from '../../components/TermosECondicoes'

const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilepicture, setProfilepicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { postUsuario, message } = useUsuario();
  const { t } = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmpassword") setConfirmPassword(value);
  };

  const handleCheckboxChange = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  // const handleFileChange = (e) => {
  //   console.log(e);
  //   const file = e.target.files ? e.target.files[0] : null;
  //   console.log(file);
  //   if (file) {
  //     setProfilepicture(file);
  //   }
  // };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!username || !email || !password || !confirmpassword) {
      setLoading(false);
      return enqueueSnackbar(
        "Por favor, preencha todos os campos obrigatórios.",
        { variant: "error" }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoading(false);
      return enqueueSnackbar("Formato de email inválido.", {
        variant: "error",
      });
    }

    if (password !== confirmpassword) {
      setLoading(false);
      return enqueueSnackbar("As senhas precisam ser iguais!", {
        variant: "error",
      });
    }

    if (!isTermsChecked) {
      setLoading(false);
      return enqueueSnackbar("Você deve aceitar os Termos e Condições.", {
        variant: "error",
      });
    }

    try {
      const formData = new FormData();
      formData.append("name", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmpassword", confirmpassword);
      formData.append("profilepicture", profilepicture);

      await postUsuario(formData);
      enqueueSnackbar("Usuário registrado com sucesso!", {
        variant: "success",
      });
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 500) {
        enqueueSnackbar(
          "Este email já está cadastrado. Por favor, use outro email.",
          { variant: "error" }
        );
      } else {
        console.error("Erro ao registrar usuário:", error.message);
        enqueueSnackbar(
          "Erro ao registrar usuário. Por favor, tente novamente mais tarde.",
          { variant: "error" }
        );
      }
    } finally {
      setLoading(false);
    }
  }

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <section className="bg-gradient-to-tl from-purple-950 to-purple-400 min-h-screen flex flex-row items-center justify-center">
      <AnimacaoInicioBookster />
      <div className="flex-auto max-w-xs">
        <div className="flex justify-center items-center mb-8">
          <img
            src={require("../../assets/logoBom.png")}
            alt="Logo"
            style={{ width: "10rem", height: "11rem" }}
          />
        </div>

        <div className="w-full bg-primary-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-primary-800 dark:border-primary-700">
          <div className="w-full bg-primary-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-primary-800 dark:border-primary-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center  font-bold leading-tight tracking-tight text-primary-950 md:text-2xl dark:text-primary">
                {t("criar_conta")}
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-primary-950 dark:text-primary"
                  >
                    {t("usuario")}
                  </label>
                  <input
                    type="username"
                    name="name"
                    value={username}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="docinho123"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-primary-950 dark:text-primary"
                  >
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-primary-600 dark:placeholder-gray-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="docinho@gmail.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-primary-950 dark:text-primary"
                  >
                    {t("senha")}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmpassword"
                    className="block mb-2 text-sm font-medium text-primary-950 dark:text-primary"
                  >
                    {t("confirmar_senha")}
                  </label>
                  <input
                    type="password"
                    name="confirmpassword"
                    value={confirmpassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="profilepicture"
                    className="block mb-2 text-sm font-medium text-primary-950 dark:text-primary"
                  >
                    Foto de perfil
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="profilepicture"
                    onChange={handleInputChange}
                    className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      checked={isTermsChecked}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 border border-primary-300 rounded bg-primary-50 focus:ring-3 focus:ring-primary-300 dark:bg-primary-700 dark:border-primary-600 dark:focus:ring-primary-600 dark:ring-offset-primary-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-primary-950 dark:text-primary-300"
                    >
                      {t("eu_aceito_os")}{" "}
                      <button
                        onClick={openModal}
                        type="button"
                        className="font-medium text-primary-500 hover:underline dark:text-primary-500"
                      >
                        {t("termos_e_condicoes")}
                      </button>
                      <ModalGenerico isOpen={modalIsOpen} content={termosContent} />
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!isTermsChecked}
                  className={`w-full text-white ${
                    isTermsChecked ? 'bg-primary-700 hover:bg-primary-700' : 'bg-gray-400 cursor-not-allowed'
                  } focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                >
                  {t("criar_conta")}
                </button>
                <p className="text-sm font-light text-primary-950 dark:text-primary-400">
                  {t("ja_tem_conta")}{" "}
                  <a
                    href="login"
                    className="font-medium text-primary-500 hover:underline dark:text-primary-500"
                    onClick={handleLoginClick}
                  >
                    {t("login")}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserRegister;
