import { createContext, useContext, useState } from "react";
import emailjs from '@emailjs/browser';

export function useEmail() {
  const contextoEmail = useContext(EmailContext);
  return contextoEmail;
}

const EmailContext = createContext({});
EmailContext.displayName = "Email Context";

export function EmailProvider({ children }) {
  const [verificationCodes, setVerificationCodes] = useState({});

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const storeVerificationCode = (email, code) => {
    setVerificationCodes(prevCodes => ({
      ...prevCodes,
      [email]: { code, expiry: Date.now() + 600000 }
    }));
    setTimeout(() => {
      setVerificationCodes(prevCodes => {
        const newCodes = { ...prevCodes };
        delete newCodes[email];
        return newCodes;
      });
    }, 600000);
  };

  async function sendEmail(email) {
    const verificationCode = generateVerificationCode();
    storeVerificationCode(email, verificationCode);

    const templateParams = {
      to_email: email,
      codigo_verificacao: verificationCode
    };

    try {
      const response = await emailjs.send('service_rdo7wtq', 'template_fq0v76b', templateParams, 'e2C5EiAdA7Mhaie9I');
      console.log("Email sent successfully:", response.status, response.text);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  }

  const validateVerificationCode = (email, code) => {
    const record = verificationCodes[email];
    if (record && record.code === code && Date.now() < record.expiry) {
      return true;
    }
    return false;
  };

  return (
    <EmailContext.Provider value={{ sendEmail, validateVerificationCode }}>
      {children}
    </EmailContext.Provider>
  );
}
