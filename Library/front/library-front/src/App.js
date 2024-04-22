import AppRoutes from "./routes";
import { I18nextProvider } from "react-i18next";
import { AutenticacaoProvider } from "./contextos/AutenticacaoProvider/AutenticacaoProvider";
import i18n from "./services/i18n";

function App() {
  return (
      <I18nextProvider i18n={i18n}>
        <AutenticacaoProvider>
          <AppRoutes />
        </AutenticacaoProvider>
      </I18nextProvider>
  );
}

export default App;
