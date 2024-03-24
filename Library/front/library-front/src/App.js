import AppRoutes from './routes';
import { I18nextProvider } from 'react-i18next';
import i18n from './services/i18n';

function App() {
  return (
    <div className="App">
       <I18nextProvider i18n={i18n}>
          <AppRoutes />
       </I18nextProvider>
    </div>
  );
}

export default App;
