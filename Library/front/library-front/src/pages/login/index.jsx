import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import { useTranslation } from "react-i18next";
import PasswordField from "../../components/PasswordField/PasswordField";
import ModalGenerico from "../../components/ModalGenerico";
import { useUsuario } from "../../contextos/UsuarioProvider/UsuarioProvider";
import { customStylesModal } from "./styles";
import { useEmail } from "../../contextos/EmailProvider/EmailProvider";
import backgroundImage from "../../assets/backgroundLandingPage.png";
import { SectionHeading, SectionDescription } from "../landingPage/styles";

const LoginUsuario = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { login, usuario } = useAutenticacao();
  const { sendEmail, validateVerificationCode } = useEmail();
  const { forgotPasswordCheckUser, userExist, updatePassword } = useUsuario();
  const navigate = useNavigate();
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verificationModalIsOpen, setVerificationModalIsOpen] = useState(false);
  const [changePasswordModalIsOpen, setChangePasswordModalIsOpen] =
    useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const closeVerificationModal = () => setVerificationModalIsOpen(false);
  const closeChangePasswordModal = () => setChangePasswordModalIsOpen(false);

  const handleSuccess = () => {
    enqueueSnackbar(t("login_realizado_com_sucesso"), { variant: "success" });
    setError(null);
    navigate("/home");
  };

  const forgotPassword = async (e) => {
    e.preventDefault();
    if (email === "") {
      enqueueSnackbar(t("por_favor_preencha_seu_email"), { variant: "warning" });
    } else {
      await getUserExist(email);
    }
  };

  const sendEmailPassword = async (email) => {
    await sendEmail(email);
    enqueueSnackbar(t("verifique_seu_email_para_definir"), {
      variant: "success",
    });
  };

  const getUserExist = async (email) => {
    console.log(email);
    setLoading(true);
    setError(null);

    try {
      await forgotPasswordCheckUser(email);

      if (userExist.status === 200) {
        setError(null);
        sendEmailPassword(email);
        setVerificationModalIsOpen(true);
      }
    } catch (error) {
      console.log(error);
      setError(
       t("nao_foi_encontrado_nenhum_usuario")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    if (validateVerificationCode(email, verificationCode)) {
      enqueueSnackbar(t("codigo_de_verificacao_validado"), {
        variant: "success",
      });
      setVerificationCode("");
      closeVerificationModal();
      setChangePasswordModalIsOpen(true);
    } else {
      enqueueSnackbar(t("codigo_de_verificacao_invalido"), {
        variant: "error",
      });
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (newPassword === confirmNewPassword) {
        const response = await updatePassword(
          email,
          newPassword,
          confirmNewPassword
        );

        if (response.status === 200) {
          enqueueSnackbar(
            t("senha_alterada_com_sucesso"),
            { variant: "success" }
          );
          closeChangePasswordModal();
        } else {
          enqueueSnackbar(response.data.msg, { variant: "error" });
        }
      } else {
        enqueueSnackbar(t("as_senhas_precisam_ser_iguais"), { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.msg ||
          t("nao_foi_possivel_alterar_a_senha"),
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(email, passwordRef.current.value);

      if (response && response.status === "success") {
        setError(null);
        handleSuccess();
      } else {
        setError(t("credenciais_invalidas"));
      }
    } catch (error) {
      console.log(error);
      setError(t("credenciais_invalidas"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (usuario) {
      handleSuccess();
    }
  }, [usuario]);

  useEffect(() => {
    if (error && !usuario) {
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [error, enqueueSnackbar, usuario]);

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
              {t("abra_a_capa_para_aventuras")}
            </SectionDescription>
            <SectionHeading>BOOKSTER</SectionHeading>
            <SectionHeading>{t("biblioteca_digital_minusculo")}</SectionHeading>
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
                    <h2 className="text-center text-2xl font-bold leading-9 text-primary-950">
                      {t("entre_na_sua_conta")}
                    </h2>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-primary-950"
                      >
                        {t("email")}
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-md border-0 py-2 px-3 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder-text-primary-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-2">
                      <PasswordField passwordRef={passwordRef} />
                      <div className="text-sm text-right py-1.5">
                        <button
                          type="button"
                          className="font-semibold text-primary-500 hover:text-primary-500"
                          onClick={forgotPassword}
                        >
                          {t("esqueceu_a_senha")}
                        </button>
                      </div>
                    </div>
                  

                    <div className="mt-6">
                      <button
                        type="submit"
                        className="w-full bg-primary-700 py-2 px-4 rounded-md text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <span className="mr-2">{t("entrando")}</span>
                            <svg
                              className="animate-spin h-5 w-5 text-primary-950"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              ></path>
                            </svg>
                          </div>
                        ) : (
                          t("entrar")
                        )}
                      </button>
                    </div>
                    <p className="text-sm font-light text-primary-950 dark:text-primary-400">
                      {t("ainda_nao_tem_uma_conta")}{" "}
                      <a
                        href="register"
                        className="font-medium text-primary-500 hover:underline dark:text-primary-500"
                        onClick={handleRegisterClick}
                      >
                        {t("registre_se")}
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalGenerico
        isOpen={verificationModalIsOpen}
        style={customStylesModal}
        onRequestClose={closeVerificationModal}
        content={
          <>
            <form className="space-y-6" onSubmit={handleVerificationSubmit}>
              <div>
                <label
                  htmlFor="verificationCode"
                  className="block mb-2 text-sm font-medium text-primary-950 dark:text-primary"
                >
                  {t("informe_o_codigo_de_verificacao")}
                </label>
                <input
                  type="text"
                  name="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder={t("digite_o_codigo_de_verificacao")}
                  className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-primary-700 py-2 px-4 rounded-md text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
                >
                  {t("verificar")}
                </button>
                <button onClick={() => sendEmailPassword(email)}>
                  {t("reenviar_email")}
                </button>
              </div>
            </form>
          </>
        }
      />
      <ModalGenerico
        isOpen={changePasswordModalIsOpen}
        style={customStylesModal}
        onRequestClose={closeChangePasswordModal}
        content={
          <>
            <form className="space-y-6" onSubmit={handlePasswordChangeSubmit}>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-primary-950 dark:text-primary"
                >
                  {t("nova_senha")}
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t("nova_senha")}
                  className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmNewPassword"
                  className="block mb-2 text-sm font-medium text-primary-950 dark:text-primary"
                >
                  {t("confirmar_nova_senha")}
                </label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder={t("confirmar_nova_senha")}
                  className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-primary-700 py-2 px-4 rounded-md text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
                >
                  {t("alterar_senha")}
                </button>
              </div>
            </form>
          </>
        }
      />
    </section>
  );
};

export default LoginUsuario;
