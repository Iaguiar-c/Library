import AppRoutes from "./routes";
import { I18nextProvider } from "react-i18next";
import { AutenticacaoProvider } from "./contextos/AutenticacaoProvider/AutenticacaoProvider";
import i18n from "./services/i18n";
import BoxLogin from "./components/boxLogin/BoxLogin";
import { useState } from "react";
import LoginUsuario from "./pages/LoginUsuario";

function App() {
  const [isUserLogged, setIsUserLogged] = useState(false);

  return (
    <div className="App">
      <I18nextProvider i18n={i18n}>
        <AutenticacaoProvider>
          <AppRoutes />
        </AutenticacaoProvider>
      </I18nextProvider>
    </div>
  );
}

export default App;
