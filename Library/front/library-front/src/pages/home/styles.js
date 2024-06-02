import styled from "styled-components";
import tw from "twin.macro";
import { motion } from "framer-motion";
import backgroundImage from "../../assets/backgroundLandingPage.png";

export const Container2 = styled.div`
  ${tw`max-w-6xl mx-auto p-6`}
`;

export const ContentWithVerticalPadding = styled.div`
  ${tw`flex flex-col items-center`}
`;

export const HeroSection = styled.div`
  ${tw`relative w-full bg-cover bg-center bg-no-repeat`}
  background-image: url(${backgroundImage});
  min-height: 30vh;
  padding-bottom: 4rem;
  &:before {
    content: "";
    ${tw`absolute inset-0 bg-black opacity-35`}
  }
`;

export const SectionHeading = styled(motion.h2)`
  ${tw`text-4xl font-bold text-white mt-4`}
  font-family: 'Inria Serif', serif;
  font-size: 4.5rem;
  padding-bottom: 4rem;
  margin-top: 1rem;
`;

export const SectionDescription = styled(motion.p)`
  ${tw`text-lg text-white mt-2 py-2`}
  font-family: 'Inria Serif', serif;
  font-size: 2rem;
`;
