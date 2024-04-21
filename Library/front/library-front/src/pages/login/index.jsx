import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useSnackbar } from "notistack";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import { http } from "../../services/api";

const LoginUsuario = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();
  const { login, usuario } = useAutenticacao();

  async function handleLogin(email, password, e) {
    e.preventDefault();

    setLoading(true);

    try {
      await login(email, password);
      await http.pegaToken();
      navigate("/home");
    } catch (error) {
      setLoading(false);
      console.log(error);
      // enqueueSnackbar("Erro ao fazer login", { variant: "error" });
    } finally {
      setLoading(false);
    }

    setLoading(false);
  }

  if (usuario) {
    window.location.pathname = "/home";
  }

  // const handleRegisterClick = () => {
  //   navigate("/api/user/register");
  // };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Entre na Sua Conta
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                className="space-y-6"
                onSubmit={(e) => handleLogin(email, password, e)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Senha
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Esqueceu a Senha?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Não tem uma conta ainda?{" "}
                <a
                  href="/api/user/register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  {/* onClick={handleRegisterClick} */}
                  Cadastre-se!
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginUsuario;
