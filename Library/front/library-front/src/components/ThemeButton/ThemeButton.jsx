// TODO: aplicar o contexto de internacionalização
import { useTheme } from "../../contextos/ThemeProvider/ThemeProvider";
import Sol from '../../assets/DARK_MODE_-_SOL-removebg-preview (1).png'
import Lua from '../../assets/lua.png'

export default function ThemeButton() {
    const { darkMode, toggleDarkMode } = useTheme();
    return (
        <div className={darkMode ? 'dark-mode' : 'light-mode'}>
            <button onClick={toggleDarkMode}>
                {darkMode ? <img src={Sol} alt="Sol" /> : <img src={Lua} alt="Lua" />}
            </button>
        </div>
    );
}