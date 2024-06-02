import React, { memo } from "react";
import {
  Container2,
  ContentWithVerticalPadding,
  HeroSection,
  SectionDescription,
  SectionHeading,
} from "./styles";
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";

const FeatureHomeSection = ({
  description2 = "Descubra livros, adicione-os, marque seu progresso",
}) => {
  const { usuario } = useAutenticacao();

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
              {`Olá, ${usuario?.name || "bem-vindo ao Bookster"}!`}
            </SectionHeading>
            <SectionDescription
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {description2}
            </SectionDescription>
          </div>
        </ContentWithVerticalPadding>
      </Container2>
    </HeroSection>
  );
};

export default memo(FeatureHomeSection);
