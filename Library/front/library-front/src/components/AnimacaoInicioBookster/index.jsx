import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const AnimacaoInicioBookster = () => {
    const [swing, setSwing] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const swingInterval = setInterval(() => {
          setSwing(!swing);
        }, 3000);
    
        return () => clearInterval(swingInterval);
      }, [swing]);
    
      return (
        <>
        
        <div className="flex-none p-10 md:ml-8 lg:ml-16">
        <img
          src={require("../../assets/fundoTela.png")}
          alt={t("imagem_de_fundo")}
          style={{
            width: "50rem",
            height: "35rem",
            marginTop: "100px",
            marginLeft: "-100px",
            transform: `rotate(${swing ? "-3deg" : "3deg"})`,
            transition: "transform 1s ease-in-out",
          }}
          className="float-left"
        />
      </div></>
      )
};

export default AnimacaoInicioBookster; 