import { useState, useNavigate } from 'react'
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/Autenticacao";
import { http } from "../../services/api";
import { message } from "antd";

export default function BoxLogin() {

    const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	// const [carregando, setCarregando] = useState(false);
	const { login, usuario } = useAutenticacao();

	const navigate = useNavigate();

	async function aoFinalizar(email, senha, evento) {
		evento.preventDefault();

		// setCarregando(true);
		try {
			await login(email, senha);
			await http.pegaToken();
			navigate("/perfil");
		} catch (error) {
			console.log(error);
			message.error("Email ou senha inválidos");
		} finally {
			// setCarregando(false);
		}
	}

	// if (carregando) return <Carregando />;

	// if (usuario) {
	// 	window.location.pathname = "/home";
	// }

    return (
      <>
        <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
          <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
            <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
              Welcome Back!
            </h1>
            <form action="#">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow-sm rounded-md w-full px-3 py-2 border-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="escreva seu email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow-sm rounded-md w-full px-3 py-2 border-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your password"
                  required
                />
                <a
                  href="#"
                  className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                    defaultChecked
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Account
                </a>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
  