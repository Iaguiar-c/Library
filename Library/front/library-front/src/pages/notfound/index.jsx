import Memebr from '../../assets/meme_pt.jpg';
import Memeus from '../../assets/meme_us.jpg';
import Memeesp from '../../assets/meme_esp.jpeg';
import { useTranslation } from "react-i18next";
import { useTraducao } from "../../contextos/TraducaoProvider/TraducaoProvider";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TypingAnimation from '../../components/TypingAnimation'
import { Container } from './styles';

const NotFound = () => {
    const { t } = useTranslation();
    const { traducao } = useTraducao();
    const navigate = useNavigate();
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
        
            <Container>
                <div className="bg-transparent text-black text-center py-2.5 px-5 rounded-lg mb-4">
                    <TypingAnimation text={t("pagina_nao_encontrada")} />
                </div>
                <img src={imagem} alt="Meme" className="mb-4 rounded-lg shadow-lg max-w-full h-auto" />
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700"
                >
                    {t("botao_voltar")}
                </button>
            </Container>
        </>
    );
};

export default NotFound;