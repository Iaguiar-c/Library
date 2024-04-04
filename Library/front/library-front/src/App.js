import AppRoutes from "./routes";
import { I18nextProvider } from "react-i18next";
import i18n from "./services/i18n";
import BoxLogin from "./components/boxLogin/BoxLogin";
import { useState } from "react";

function App() {
  const [isUserLogged, setIsUserLogged] = useState(false);

  return (
    <div className="App">
      <I18nextProvider i18n={i18n}>
        {isUserLogged ? <AppRoutes /> : <BoxLogin />}
      </I18nextProvider>
    </div>
  );
}

export default App;
