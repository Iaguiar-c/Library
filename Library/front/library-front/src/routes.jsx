import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TraducaoProvider } from "./contextos/TraducaoProvider/TraducaoProvider";
import { LivrosProvider } from "./contextos/LivrosProvider/LivrosProvider";
import TraducaoI18nProvider from "./contextos/TraducaoProvider/Traducaoi18nProvider";
import Header from './components/Header/Header';
import Home from './pages/home';
import LoginUsuario from './pages/login';
import NotFound from './pages/notfound';
import { UsuarioProvider } from './contextos/UsuarioProvider/UsuarioProvider';
import UserRegister from './pages/register';
import Profile from './pages/profile';

function AppRoutes() {
  return (
    <Router>
      <TraducaoProvider>
        <TraducaoI18nProvider>
          <LivrosProvider>
            <UsuarioProvider>
              <Routes>
                <Route path="/" element={<LoginUsuario />} />
                <Route path="/login" element={<LoginUsuario />} />
                <Route path="/register" element={<UserRegister />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Header />} >
                  <Route path="/home" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Routes>
            </UsuarioProvider>
          </LivrosProvider>
        </TraducaoI18nProvider>
      </TraducaoProvider>
    </Router>
  );
}

export default AppRoutes;
