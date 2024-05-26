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

const LoginUsuario = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { login, usuario } = useAutenticacao();
  const { forgotPasswordCheckUser, userExist } = useUsuario();
  const navigate = useNavigate();
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

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
      await getUserExist();
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const getUserExist = async () => {
    setLoading(true);
    setError(null);
  
    try {
      await forgotPasswordCheckUser(email);
      
      if (userExist.status === 200) {
        setError(null);
        enqueueSnackbar("Verifique seu e-mail para definir uma nova senha.", { variant: "success" });
      } 
    } catch (error) {
      console.log(error);
      setError("Não foi encontrado nenhum usuário correspondente a este e-mail");
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.002 8.002 0 0120 12h-4a4 4 0 00-4-4V2.5"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    "Entrar"
                  )}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-primary-950">
              {t("nao_tem_conta")}{" "}
              <a
                href="/register"
                className="font-semibold leading-6 text-primary-500 hover:text-primary-500"
              >
                {t("cadastre_se")}
              </a>
            </p>
          </div>
        </div>
      </div>
      <ModalGenerico
        isOpen={modalIsOpen}
        style={customStylesModal}
        onRequestClose={closeModal}
        content={
          <>
            <form className="space-y-6" onSubmit={getUserExist}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-primary-950 dark:text-primary"
                >
                  Forneça seu e-mail
                </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="Digite seu e-mail"
                  className="bg-primary-50 border border-primary-300 text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
            </form>
          </>
        }
      />
    </section>
  );
};

export default LoginUsuario;
