import React, { useRef } from "react";
import tw from "twin.macro";
import logoImage from "../../assets/logoBom.png";
import FeatureSection from "./FeatureSection";
import { Container2, ContentWithVerticalPadding, Header, HeroContent, HeroSection, NavLink, NavLinks, PrimaryButton, PrimaryLink, SectionDescription, SectionHeading } from "./styles";

const HeaderComponent = ({ links }) => (
  <Header>
    <Container2>
      <nav className="flex justify-between items-center">
        <img src={logoImage} alt="Logo" style={{ maxWidth: "100px" }} />
        <NavLinks>{links}</NavLinks>
      </nav>
    </Container2>
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
          <Container2>
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
          </Container2>
        </HeroContent>
      </HeroSection>
      <FeatureSection ref={featureSectionRef} />
    </>
  );
}
