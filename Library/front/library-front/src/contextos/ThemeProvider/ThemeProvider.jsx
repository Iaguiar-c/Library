import { useAutenticacao } from "../AutenticacaoProvider/AutenticacaoProvider";
import { createContext, useContext, useState } from "react";


export function useTheme() {
    const contextoTheme = useContext(ThemeContext);
    return contextoTheme;
}

const ThemeContext = createContext({});
ThemeContext.displayName = "Theme Context";

export function ThemeProvider({ children }) {
    const [darkMode, setdarkMode] = useState(false);
    const toggleDarkMode = () => { setdarkMode(!darkMode); };

    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                setdarkMode,
                toggleDarkMode,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
