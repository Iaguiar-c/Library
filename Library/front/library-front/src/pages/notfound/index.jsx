import Memebr from '../../assets/meme_pt.jpg';
import Memeus from '../../assets/meme_us.jpg';
import Memeesp from '../../assets/meme_esp.jpeg';
import { useTranslation } from "react-i18next";
import { useTraducao } from "../../contextos/TraducaoProvider/TraducaoProvider";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import { useState, useEffect } from 'react'; 

const NotFound = () => {
    const { t } = useTranslation();
    const { toggleTraducao } = useTraducao();
    const { usuario } = useAutenticacao();
    const { traducao } = useTraducao();

    const [imagem, setImagem] = useState(Memeus);

    useEffect(() => {
        const changeImage = () => {
            if (traducao === 'es') {
                setImagem(Memeesp);
            } else if (traducao === 'pt') {
                setImagem(Memebr);
            } else {
                setImagem(Memeus);
            }
        };

        changeImage();
    }, [traducao]);

    return (
        <>
            <div>
                Olá, {usuario?.name} bem-vindo(a) ao Bookster!
                {t("ola_mundo")}
                <button type="submit" onClick={() => toggleTraducao("pt")}>
                    Português
                </button>
                <button type="submit" onClick={() => toggleTraducao("en")}>
                    Inglês
                </button>
                <button type="submit" onClick={() => toggleTraducao("es")}>
                    Espanhol
                </button>
            </div>

            <div>
                {t("pagina_nao_encontrada")}
            </div>
            <img src={imagem} alt="" />
            <button>
                {t("botao_voltar")}
            </button>
        </>
    );
};

export default NotFound;