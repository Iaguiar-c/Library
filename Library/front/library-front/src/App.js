import AppRoutes from "./routes";
import { I18nextProvider } from "react-i18next";
import { AutenticacaoProvider } from "./contextos/AutenticacaoProvider/AutenticacaoProvider";
import i18n from "./services/i18n";
import { ThemeProvider } from "./contextos/ThemeProvider/ThemeProvider";
import './styles.css';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AutenticacaoProvider>
        <ThemeProvider>
          <AppRoutes/>
        </ThemeProvider>
      </AutenticacaoProvider>
    </I18nextProvider>
  );
}

export default App;
