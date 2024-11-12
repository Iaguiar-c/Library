import React, { useState, useEffect } from "react";
import { TypingText, TypingWrapper } from "./styles";

const TypingAnimation = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const interval = 100; 
    let timer;

    const typeText = () => {
      if (isErasing) {
        if (displayText.length > 0) {
          setDisplayText((prevText) => prevText.slice(0, -1));
        } else {
          setIsErasing(false);
          setCurrentIndex(0);
        }
      } else {
        if (currentIndex < text.length) {
          setDisplayText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          setIsErasing(true);
        }
      }
    };

    timer = setInterval(typeText, interval);

    return () => clearInterval(timer);
  }, [text, currentIndex, isErasing, displayText]);

  return (
    <TypingWrapper>
      <TypingText>{displayText}</TypingText>
    </TypingWrapper>
  );
};

export default TypingAnimation;