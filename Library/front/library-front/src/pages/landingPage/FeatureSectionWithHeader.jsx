import React, { useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { motion } from "framer-motion";
import backgroundImage from "../../assets/backgroundLandingPage.png";
import logoImage from "../../assets/logoBom.png";
import FeatureSection from "./FeatureSection";

const Header = styled.header`
  ${tw`w-full py-6 text-gray-100 z-20 relative`}
`;

const NavLinks = styled.div`
  ${tw`flex flex-row`}
`;

const NavLink = styled.a`
  ${tw`text-gray-100 hover:text-gray-300 px-4 py-2`}
`;

const PrimaryLink = styled.a`
  width: 101px;
  height: 38px;
  background-color: #783990;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionHeading = styled(motion.h2)`
  ${tw`text-4xl font-bold text-white mt-4`}
  font-family: 'Inria Serif', serif;
  font-size: 4.5rem;
  margin-top: 1rem;
`;

const SectionDescription = styled(motion.p)`
  ${tw`text-lg text-white mt-2 py-12`}
  font-family: 'Inria Serif', serif;
  font-size: 2rem;
`;

const PrimaryButton = styled(motion.a)`
  ${tw`inline-block text-white rounded mt-4 cursor-pointer`}
  width: 150px;
  height: 50px;
  background-color: #783990;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  ${tw`max-w-6xl mx-auto p-6`}
`;

const ContentWithVerticalPadding = styled.div`
  ${tw`flex flex-col items-center`}
`;

const HeroSection = styled.div`
  ${tw`relative w-full min-h-screen bg-cover bg-center bg-no-repeat`}
  background-image: url(${backgroundImage});
  &:before {
    content: "";
    ${tw`absolute inset-0 bg-black opacity-35`}
  }
`;

const HeroContent = styled.div`
  ${tw`relative z-10`}
`;

const HeaderComponent = ({ links }) => (
  <Header>
    <Container>
      <nav className="flex justify-between items-center">
        <img src={logoImage} alt="Logo" style={{ maxWidth: "100px" }} />
        <NavLinks>{links}</NavLinks>
      </nav>
    </Container>
  </Header>
);

export default function FeatureSectionWithHeader({
  description1 = "Abra a capa para aventuras sem fim em",
  heading1 = "BOOKSTER",
  heading2 = "DIGITAL LIBRARY",
  description2 = "onde cada página se transforma numa viagem, e cada história torna-se um mundo próprio.",
  primaryButtonText = "Saber mais",
  buttonRounded = true,
}) {
  const featureSectionRef = useRef(null);
  const buttonRoundedCss = buttonRounded ? tw`rounded-full` : "";

  const scrollToFeatureSection = () => {
    if (featureSectionRef.current) {
      featureSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = (
    <>
      <NavLink href="/login" css={tw`ml-8`}>
        Entrar
      </NavLink>
      <PrimaryLink href="/register" css={buttonRoundedCss}>
        Cadastre-se
      </PrimaryLink>
    </>
  );

  return (
    <>
      <HeroSection>
        <HeaderComponent links={navLinks} />
        <HeroContent>
          <Container>
            <ContentWithVerticalPadding>
              <div className="max-w-screen-2xl mx-auto sm:px-8 text-center">
                <SectionDescription
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {description1}
                </SectionDescription>
                <SectionHeading
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {heading1}
                </SectionHeading>
                <SectionHeading
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {heading2}
                </SectionHeading>
                <SectionDescription
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {description2}
                </SectionDescription>
                <div className="flex flex-col items-center">
                  <PrimaryButton
                     onClick={scrollToFeatureSection}
                     css={buttonRoundedCss}
                     whileTap={{ scale: 0.95 }}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    {primaryButtonText}
                  </PrimaryButton>
                </div>
              </div>
            </ContentWithVerticalPadding>
          </Container>
        </HeroContent>
      </HeroSection>
      <FeatureSection ref={featureSectionRef} />
    </>
  );
}
