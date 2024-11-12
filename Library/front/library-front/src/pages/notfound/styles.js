import styled, { keyframes } from 'styled-components';

const move = keyframes`
    0% {
        transform: translateY(-5px);
    }
    50% {
        transform: translateY(5px);
    }
    100% {
        transform: translateY(-5px);
    }
`;

export const Container = styled.div`
    background: linear-gradient(to top left, #3b0764, #c084fc ); /* Mesmo degradê do login */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img{
        animation: ${move} 2s infinite; /* Adiciona a animação de translação à imagem */

    }
`;