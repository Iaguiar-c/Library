import React, { useRef } from "react";
import tw from "twin.macro";

import {
  Container2,
  ContentWithVerticalPadding,
  HeroContent,
  HeroSection,
  PrimaryButton,
  SectionDescription,
  SectionHeading,
} from "./styles";

export default function FeatureHomeSection({
  heading1 = "Olá, bem-vindo ao Bookster!",

  description2 = "Descubra livros, adicione-os, marque seu progresso",
}) {
  return (
    <>
      <HeroSection>
       
          <Container2>
            <ContentWithVerticalPadding>
              <div className="max-w-screen-2xl mx-auto sm:px-8 text-center">
                <SectionDescription
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                ></SectionDescription>
                <SectionHeading
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {heading1}
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
    </>
  );
}
