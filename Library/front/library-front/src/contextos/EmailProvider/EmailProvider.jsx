import { createContext, useContext, useState } from "react";
import emailjs from '@emailjs/browser'

export function useEmail() {
  const contextoEmail = useContext(EmailContext);
  return contextoEmail;
}

const EmailContext = createContext({});
EmailContext.displayName = "Email Context";

export function EmailProvider({ children }) {
  const [email, setEmail] = useState([]);

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  let verificationCodes = {}; 

  const storeVerificationCode = (email, code) => {
    verificationCodes[email] = { code, expiry: Date.now() + 600000 }; 
    setTimeout(() => {
      delete verificationCodes[email];
    }, 600000);
  };

  async function sendEmail(email) {
    const verificationCode = generateVerificationCode();
    storeVerificationCode(email, verificationCode);

    const templateParams = {
      codigo_verificacao: verificationCode
    }
    
    await emailjs.send('service_rdo7wtq', 'template_fq0v76b', templateParams, 'e2C5EiAdA7Mhaie9I')
    .then((response) => {
      console.log("Email sent successfully:", response.status, response.text);
    //   enqueueSnackbar("Verifique seu e-mail para definir uma nova senha.", { variant: "success" });
    })
    .catch((error) => {
      console.error("Failed to send email:", error);
    //   setError("Erro ao enviar o email. Tente novamente mais tarde.");
    });
  }
    
  const validateVerificationCode = (email, code) => {
    const record = verificationCodes[email];
    if (record && record.code === code && Date.now() < record.expiry) {
      return true;
    }
    return false;
  };

  return (
    <EmailContext.Provider
      value={{
        email,
        setEmail,
        sendEmail
      }}
    >
      {children}
    </EmailContext.Provider>
  );
}
