// TODO: aplicar o contexto de internacionalização
import { useTheme } from "../../contextos/ThemeProvider/ThemeProvider";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ThemeButton() {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
        {darkMode ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
    </div>
  );
}
