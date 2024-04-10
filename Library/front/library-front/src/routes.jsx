import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home';
import { TraducaoProvider } from "./contextos/Traducao/TraducaoProvider";
import TraducaoI18nProvider from "./contextos/Traducao/Traducaoi18nProvider";
import Header from './components/Header';
import LoginUsuario from './pages/LoginUsuario'

function AppRoutes() {
  return (
    <Router>
      <TraducaoProvider>
        <TraducaoI18nProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/perfil" element={<Header />} />
            <Route path="/login" element={<LoginUsuario />} />
          </Routes>
        </TraducaoI18nProvider>
      </TraducaoProvider>
    </Router>
  );
}

export default AppRoutes;
