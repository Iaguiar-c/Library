import React, { memo } from "react";
import {
  Container2,
  ContentWithVerticalPadding,
  HeroSection,
  SectionDescription,
  SectionHeading,
} from "./styles";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";
import { useTranslation } from "react-i18next";

const FeatureHomeSection = () => {
  const { usuario } = useAutenticacao();
  const { t } = useTranslation();

  return (
    <HeroSection>
      <Container2>
        <ContentWithVerticalPadding>
          <div className="max-w-screen-2xl mx-auto sm:px-8 text-center">
            <SectionDescription
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />
            <SectionHeading
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {`${t("ola")}, ${usuario?.name || t("bem_vindo_ao")}!`}
            </SectionHeading>
            <SectionDescription
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {t("descubra_livros")}
            </SectionDescription>
          </div>
        </ContentWithVerticalPadding>
      </Container2>
    </HeroSection>
  );
};

export default memo(FeatureHomeSection);
