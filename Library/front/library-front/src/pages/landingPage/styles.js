import styled from "styled-components";
import tw from "twin.macro";
import { motion } from "framer-motion";
import backgroundImage from "../../assets/backgroundLandingPage.png";

export const Container = styled.div`
  ${tw`relative max-w-6xl mx-auto px-4 sm:px-6`}
`;

export const Section = styled.section`
  ${tw`relative`}
  background: linear-gradient(to top left, #3b0a5a, #b794f4);
  padding-bottom: 4rem;
`;

export const Heading = styled.h2`
  ${tw`text-4xl font-bold text-center text-primary-200 mt-4`}
  font-family: 'Inria Serif', serif;
  font-size: 4.5rem;
`;

export const Description = styled.p`
  ${tw`text-lg text-primary-100 mt-2 py-12`}
  font-family: 'Inria Serif', serif;
  font-size: 2rem;
`;

export const Header = styled.header`
  ${tw`w-full py-6 text-gray-100 z-20 relative`}
`;

export const NavLinks = styled.div`
  ${tw`flex flex-row`}
`;

export const NavLink = styled.a`
  ${tw`text-gray-100 hover:text-gray-300 px-4 py-2`}
`;

export const PrimaryLink = styled.a`
  width: 101px;
  height: 38px;
  background-color: #783990;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SectionHeading = styled(motion.h2)`
  ${tw`text-4xl font-bold text-white mt-4`}
  font-family: 'Inria Serif', serif;
  font-size: 4.5rem;
  padding-bottom: 4rem;
  margin-top: 1rem;
`;

export const SectionDescription = styled(motion.p)`
  ${tw`text-lg text-white mt-2 py-12`}
  font-family: 'Inria Serif', serif;
  font-size: 2rem;
`;

export const PrimaryButton = styled(motion.a)`
  ${tw`inline-block text-white rounded mt-4 cursor-pointer`}
  width: 150px;
  height: 50px;
  background-color: #783990;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container2 = styled.div`
  ${tw`max-w-6xl mx-auto p-6`}
`;

export const ContentWithVerticalPadding = styled.div`
  ${tw`flex flex-col items-center`}
`;

export const HeroSection = styled.div`
  ${tw`relative w-full min-h-screen bg-cover bg-center bg-no-repeat`}
  background-image: url(${backgroundImage});
  padding-bottom: 4rem;
  &:before {
    content: "";
    ${tw`absolute inset-0 bg-primary-950 opacity-30`}
  }
`;

export const HeroContent = styled.div`
  ${tw`relative z-10`}
`;