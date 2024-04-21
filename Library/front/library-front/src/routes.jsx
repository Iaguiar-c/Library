import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TraducaoProvider } from "./contextos/TraducaoProvider/TraducaoProvider";
import { LivrosProvider } from "./contextos/LivrosProvider/LivrosProvider";
import TraducaoI18nProvider from "./contextos/TraducaoProvider/Traducaoi18nProvider";
import Header from './components/Header/Header';
import Home from './pages/home';
import LoginUsuario from './pages/login'

function AppRoutes() {
  return (
    <Router>
      <TraducaoProvider>
        <TraducaoI18nProvider>
          <LivrosProvider>
            <Routes>
              <Route path="/" element={<LoginUsuario />} />
              <Route path="/login" element={<LoginUsuario />} />
              <Route path="/" element={<Header />} >
                <Route path="/home" element={<Home />} />
              </Route>
            </Routes>
          </LivrosProvider>
        </TraducaoI18nProvider>
      </TraducaoProvider>
    </Router>
  );
}

export default AppRoutes;
