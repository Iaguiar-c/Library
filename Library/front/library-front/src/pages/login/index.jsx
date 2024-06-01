import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import { useTranslation } from "react-i18next";
import PasswordField from "../../components/PasswordField/PasswordField";
import AnimacaoInicioBookster from "../../components/AnimacaoInicioBookster";
import ModalGenerico from "../../components/ModalGenerico";
import { useUsuario } from "../../contextos/UsuarioProvider/UsuarioProvider";
import { customStylesModal } from "./styles";
import { useEmail } from "../../contextos/EmailProvider/EmailProvider";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verificationModalIsOpen, setVerificationModalIsOpen] = useState(false);
  const [changePasswordModalIsOpen, setChangePasswordModalIsOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const closeModal = () => setModalIsOpen(false);
  const closeVerificationModal = () => setVerificationModalIsOpen(false);
  const closeChangePasswordModal = () => setChangePasswordModalIsOpen(false);

  const handleSuccess = () => {
    enqueueSnackbar("Login realizado com sucesso!", { variant: "success" });
    setError(null);
    navigate("/home");
  };

  const forgotPassword = async (e) => {
    e.preventDefault();
    if (email === "") {
      enqueueSnackbar("Por favor, preencha seu e-mail", { variant: "warning" });
    } else {
      await getUserExist(email);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const getUserExist = async (email) => {
    console.log(email)
    setLoading(true);
    setError(null);

    try {
      await forgotPasswordCheckUser(email);

      if (userExist.status === 200) {
        setError(null);
        await sendEmail(email);
        enqueueSnackbar("Verifique seu e-mail para definir uma nova senha.", {
          variant: "success",
        });
        setVerificationModalIsOpen(true);
      }
    } catch (error) {
      console.log(error);
      setError(
        "Não foi encontrado nenhum usuário correspondente a este e-mail"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    if (validateVerificationCode(email, verificationCode)) {
      enqueueSnackbar("Código de verificação validado com sucesso!", {
        variant: "success",
      });
      setVerificationCode("");
      closeVerificationModal();
      setChangePasswordModalIsOpen(true);
    } else {
      enqueueSnackbar("Código de verificação inválido. Tente novamente.", {
        variant: "error",
      });
    }
  };

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (newPassword === confirmNewPassword) {
        await updatePassword(email, newPassword, confirmNewPassword);
        enqueueSnackbar(
          "Sua senha foi alterada com sucesso! Por favor, faça login novamente",
          { variant: "success" }
        );
        closeChangePasswordModal();
      } else {
        enqueueSnackbar("As senhas precisam ser iguais.", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      setError("Não foi possível alterar a senha. Tente novamente mais tarde.");
      closeChangePasswordModal();
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
        setError("Credenciais inválidas. Por favor, tente novamente.");
      }
    } catch (error) {
      console.log(error);
      setError("Credenciais inválidas. Por favor, tente novamente.");
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
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
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
                <div className="mt=2">
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
                      <span className="mr-2">Entrando...</span>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
            </form>
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
                  Informe o código de verificação
                </label>
                <input
                  type="text"
                  name="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Digite o código de verificação"
                  className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-primary-700 py-2 px-4 rounded-md text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
                >
                  Verificar
                </button>
                <button onClick={getUserExist}>Reenviar e-mail</button>
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
                  Nova Senha
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nova senha"
                  className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmNewPassword"
                  className="block mb-2 text-sm font-medium text-primary-950 dark:text-primary"
                >
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirmar nova senha"
                  className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-primary-700 py-2 px-4 rounded-md text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
                >
                  Alterar Senha
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
