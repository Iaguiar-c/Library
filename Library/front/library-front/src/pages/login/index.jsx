import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import { useTranslation } from "react-i18next";
import PasswordField from "../../components/PasswordField/PasswordField";

const LoginUsuario = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { login, usuario } = useAutenticacao();
  const navigate = useNavigate();
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [swing, setSwing] = useState(false);

  const handleSuccess = () => {
    enqueueSnackbar("Login realizado com sucesso!", { variant: "success" });
    setError(null);
    navigate("/home");
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

  useEffect(() => {
    const swingInterval = setInterval(() => {
      setSwing(!swing);
    }, 3000);

    return () => clearInterval(swingInterval);
  }, [swing]);

  return (
    <section className="bg-gradient-to-tl from-purple-950 to-purple-400 min-h-screen flex flex-row items-center justify-center">
      <div className="flex-none p-10 md:ml-8 lg:ml-16">
        <img
          src={require("../../assets/fundoTela.png")}
          alt="Imagem de Fundo"
          style={{
            width: "50rem",
            height: "35rem",
            marginTop: "100px",
            marginLeft: "-100px",
            transform: `rotate(${swing ? "-3deg" : "3deg"})`,
            transition: "transform 1s ease-in-out",
          }}
          className="float-left"
        />
      </div>

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
                  <a
                    href="#"
                    className="font-semibold text-primary-500 hover:text-primary-500"
                  >
                    {t("esqueceu_a_senha")}
                  </a>
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
    </section>
  );
};

export default LoginUsuario;
