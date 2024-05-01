import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useUsuario } from "../../contextos/UsuarioProvider/UsuarioProvider";
import { useTranslation } from "react-i18next";
import { t } from "i18next";


const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { postUsuario } = useUsuario();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // essa verificação deve ser feita só no front
    confirmpassword: "",
  });

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(name, email, password, confirmpassword, e){
    e.preventDefault();

    setLoading(true);

    if (formData.password !== formData.confirmpassword) {
      return;
    }

    try {
      await postUsuario(name, email, password, confirmpassword);
      navigate("/login");
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
    }

    // if (response.data.success) {
    //   enqueueSnackbar("Usuário registrado com sucesso!", {
    //     variant: "success",
    //   });
    //   navigate("/");
    // } else {
    //   enqueueSnackbar(response.data.message || "Erro ao registrar usuário", {
    //     variant: "error",
    //   });
    // }
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <section className="bg-primary-950">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-primary-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-primary-800 dark:border-primary-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center  font-bold leading-tight tracking-tight text-primary-900 md:text-2xl dark:text-primary">
            {t("criar_conta")}
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={(e) => handleSubmit(username, email, password, confirmpassword, e)}
              >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-primary-900 dark:text-primary"
                  >
                  {t("usuario")}
                </label>
                <input
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-primary-300 text-primary-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="docinho123"
                  required=""
                ></input>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-primary-900 dark:text-primary"
                >
                  {t("email")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-primary-50 border border-primary-300 text-primary-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-primary-600 dark:placeholder-gray-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="docinho@gmail.com"
                  required=""
                ></input>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-primary-900 dark:text-primary"
                >
                  {t("senha")}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-primary-50 border border-primary-300 text-primary-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required=""
                  ></input>
              </div>
              <div>
                <label
                  htmlFor="confirmpassword"
                  className="block mb-2 text-sm font-medium text-primary-900 dark:text-primary"
                  >
                  {t("confirmar_senha")}
                </label>
                <input
                  type="confirmpassword"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-primary-50 border border-primary-300 text-primary-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required=""
                ></input>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-primary-300 rounded bg-primary-50 focus:ring-3 focus:ring-primary-300 dark:bg-primary-700 dark:border-primary-600 dark:focus:ring-primary-600 dark:ring-offset-primary-800"
                    required=""
                  ></input>
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-primary-500 dark:text-primary-300"
                  >
                    {t("eu_aceito_os")}{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                      >
                      {t("termos_e_condicoes")}
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                {t("criar_conta")}
              </button>
              <p className="text-sm font-light text-primary-500 dark:text-primary-400">
                {t("ja_tem_conta")}{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  onClick={handleLoginClick}
                  >
                  {t("login")}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserRegister;
