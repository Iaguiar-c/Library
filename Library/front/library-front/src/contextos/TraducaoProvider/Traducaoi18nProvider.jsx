import { I18nextProvider } from 'react-i18next';
import i18n from '../../services/i18n';
import { useTraducao } from './TraducaoProvider';
import { useEffect } from 'react'

const TraducaoI18nProvider = ({ children }) => {
  const { traducao, setTraducao } = useTraducao();

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || 'pt'; // valor padrão
    setTraducao(storedLanguage);
  }, [setTraducao]);

  useEffect(() => {
    i18n.changeLanguage(traducao);
  }, [traducao]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TraducaoI18nProvider;
