import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutenticacao } from '../../contextos/AutenticacaoProvider/AutenticacaoProvider';
import { Api } from '../../services/api';
import PasswordField from '../../components/PasswordField/PasswordField';
import { useSnackbar } from 'notistack';

const LoginUsuario = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { login, usuario } = useAutenticacao();
  const navigate = useNavigate();
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSuccess = () => {
    enqueueSnackbar("Login realizado com sucesso!", { variant: "success" });
    setError(null); // Limpa qualquer erro existente
    navigate('/home');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Limpa o estado de erro ao iniciar o login

    try {
      await login(email, passwordRef.current.value);
      await Api.pegaToken();
      handleSuccess();
    } catch (error) {
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
    if (error && !usuario) { // Exibe a mensagem de erro apenas se não houver sucesso de login
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [error, enqueueSnackbar, usuario]);

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
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Input para o email */}
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

                {/* Input para a senha */}
                <div className="mt-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    
                  </label>
                  <div className="mt-2">
                    <PasswordField id="password" label="Senha" passwordRef={passwordRef} />
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Esqueceu a Senha?
                    </a>
                  </div>
                </div>

                {/* Botão de submit */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="flex justify-center w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
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
                      'Entrar'
                    )}
                  </button>
                </div>
              </form>

              {/* Link para cadastro */}
              <p className="mt-10 text-center text-sm text-gray-500">
                Não tem uma conta ainda?{' '}
                <a
                  href="/register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
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
