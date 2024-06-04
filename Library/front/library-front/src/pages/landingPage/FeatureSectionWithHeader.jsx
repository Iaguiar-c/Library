import React, { useRef } from "react";
import tw from "twin.macro";
import logoImage from "../../assets/logoBom.png";
import FeatureSection from "./FeatureSection";
import { Container2, ContentWithVerticalPadding, Header, HeroContent, HeroSection, NavLink, NavLinks, PrimaryButton, PrimaryLink, SectionDescription, SectionHeading } from "./styles";
import { useTranslation } from "react-i18next";

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
  buttonRounded = true,
}) {
  const featureSectionRef = useRef(null);
  const buttonRoundedCss = buttonRounded ? tw`rounded-full` : "";
  const { t } = useTranslation();

  const scrollToFeatureSection = () => {
    if (featureSectionRef.current) {
      featureSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = (
    <>
      <NavLink href="/login" css={tw`ml-8`}>
        {t("entrar")}
      </NavLink>
      <PrimaryLink href="/register" css={buttonRoundedCss}>
        {t("cadastre_se")}
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
                  {t("abra_a_capa_para_aventuras_sem_fim")}
                </SectionDescription>
                <SectionHeading
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {t("bookster")}
                </SectionHeading>
                <SectionHeading
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {t("biblioteca_digital")}
                </SectionHeading>
                <SectionDescription
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {t("onde_cada_pagina_se_transforma")}
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
                    {t("saber_mais")}
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
