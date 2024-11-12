import styled from "styled-components";

export const TypingWrapper = styled.div`
  display: inline-block;
`;

export const TypingText = styled.span`
   @media (max-width: 900px) {
        font-size: 18px;
    }
    
    @media (min-width: 900px) {
        font-size: 65px;
    }

  font-weight: bold;
  border-right: 2px solid #fff;
  font-family: 'Calibri';
  font-style: normal;
  color: rgb(17 24 39 / var(--tw-bg-opacity));
  white-space: nowrap;
  overflow: hidden;
  animation: typing 2s steps(16) infinite, blinking 1s step-end infinite;

  @keyframes typing {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;
