import { useTranslation } from "react-i18next";
import { useTraducao } from "../../contextos/TraducaoProvider/TraducaoProvider";

export default function TranslationButtons() {
  const { toggleTraducao } = useTraducao();
  const { t } = useTranslation();

  return (
    <>
      <div
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-primary-100 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex="-1"
      >
        <div>
          <button
            type="submit"
            className="block px-4 py-2 text-sm text-primary-700"
            onClick={() => toggleTraducao("pt")}
          >
            {t("portugues")}
          </button>
          <button
            type="submit"
            className="block px-4 py-2 text-sm text-primary-700"
            onClick={() => toggleTraducao("en")}
          >
            {t("ingles")}
          </button>
          <button
            type="submit"
            className="block px-4 py-2 text-sm text-primary-700"
            onClick={() => toggleTraducao("es")}
          >
            {t("espanhol")}
          </button>
        </div>
      </div>
    </>
  );
}
