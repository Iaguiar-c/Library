import { useEffect } from 'react'
import { useTraducao } from '../../contextos/Traducao/TraducaoProvider'
import { useTranslation } from 'react-i18next'; 

export default function Home(){
    const { toggleTraducao } = useTraducao();
    const { t } = useTranslation();

      return (
        <div>
            {t('ola_mundo')}
            <button type="submit" onClick={() => toggleTraducao('pt')}>Português</button>
            <button type="submit" onClick={() => toggleTraducao('en')}>Inglês</button>
            <button type="submit" onClick={() => toggleTraducao('es')}>Espanhol</button>
        </div>
    )
}