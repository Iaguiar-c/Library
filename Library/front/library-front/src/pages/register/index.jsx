import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useUsuario } from "../../contextos/UsuarioProvider/UsuarioProvider";
import { useTranslation } from "react-i18next";
import ModalGenerico from "../../components/ModalGenerico";
import { termosContent } from "../../components/TermosECondicoes";
import { SectionHeading, SectionDescription } from "../landingPage/styles";
import backgroundImage from "../../assets/backgroundLandingPage.png";

const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilepicture, setProfilepicture] = useState("");
  const [setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { postUsuario } = useUsuario();
  const { t } = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const { forgotPasswordCheckUser } = useUsuario();
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmpassword") setConfirmPassword(value);
    if (name === "profile") setProfilepicture(value);
  };

  const handleCheckboxChange = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPasswordCheckUser(email);

      enqueueSnackbar(
        t("esse_email_de_usuario_ja_existe"),
        {
          variant: "warning",
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    if (!username || !email || !password || !confirmpassword) {
      setLoading(false);
      return enqueueSnackbar(
        t("por_favor_preencha_todos_os_campos"),
        { variant: "error" }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoading(false);
      return enqueueSnackbar(t("formato_de_email_invalido"), {
        variant: "error",
      });
    }

    if (password !== confirmpassword) {
      setLoading(false);
      return enqueueSnackbar(t("as_senhas_precisam_ser_iguais"), {
        variant: "error",
      });
    }

    if (!isTermsChecked) {
      setLoading(false);
      return enqueueSnackbar(t("voce_deve_aceitar_os_termos_e_condicoes"), {
        variant: "error",
      });
    }

    try {
      const formData = new FormData();
      formData.append("name", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmpassword", confirmpassword);
      formData.append("profile", profilepicture);

      await postUsuario(formData);
      enqueueSnackbar(t("usuario_registrado_com_sucesso"), {
        variant: "success",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        t("erro_ao_registrar_usuario"),
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  }

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <section className="bg-gradient-to-tl from-purple-950 to-purple-800 min-h-screen flex flex-row items-center justify-center">
      <div class="min-h-screen flex flex-col items-center justify-center">
        <div
          class="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow rounded-md"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-center m-4">
            <SectionDescription>
              {t("abra_a_capa_para_aventuras_sem_fim")}
            </SectionDescription>
            <SectionHeading>BOOKSTER</SectionHeading>
            <SectionHeading>{t("biblioteca_digital")}</SectionHeading>
          </div>
          <div class="md:max-w-md w-full py-4">
            <div className="flex-auto">
              <div className="flex justify-center items-center mb-8">
                <img
                  src={require("../../assets/logoBom.png")}
                  alt="Logo"
                  style={{ width: "10rem", height: "11rem" }}
                />
              </div>

              <div className="w-full bg-primary-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-primary-800 dark:border-primary-700">
                <div className="p-6 space-y-4 md:space-y-6 ">
                  <div className="sm:mx-auto sm:w-full">
                    <h1 className="text-center text-2xl font-bold leading-9 text-primary-950">
                      {t("criar_conta")}
                    </h1>
                  </div>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="mt-2">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-primary-950"
                      >
                        {t("usuario")}
                      </label>
                      <input
                        type="username"
                        name="name"
                        value={username}
                        onChange={handleInputChange}
                        className="w-full rounded-md border-0 py-2 px-3 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder-text-primary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                        placeholder={t("usuario123")}
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
                        className="w-full rounded-md border-0 py-2 px-3 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder-text-primary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                        placeholder={t("email_usuario")}
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
                        className="w-full rounded-md border-0 py-2 px-3 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder-text-primary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
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
                        className="w-full rounded-md border-0 py-2 px-3 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder-text-primary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
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
                        value={profilepicture}
                        onChange={handleInputChange}
                        className="w-full rounded-md border-0 py-2 px-3 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder-text-primary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                        placeholder={t("insira_a_url_da_imagem")}
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
                          className="w-4 h-4 border border-primary-300 rounded bg-primary-50 accent-primary-700 focus:ring-3 focus:ring-primary-300 dark:bg-primary-700 dark:border-primary-600 dark:focus:ring-primary-600 dark:ring-offset-primary-800"
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
                          <ModalGenerico
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            content={termosContent}
                          />
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={!isTermsChecked}
                      className={`w-full text-white ${
                        isTermsChecked
                          ? "bg-primary-700 hover:bg-primary-700"
                          : "bg-primary-400 cursor-not-allowed"
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
        </div>
      </div>
    </section>
  );
};

export default UserRegister;
