import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        ola_mundo: "Hello World",
        entre_na_sua_conta: "Enter Your Account",
        senha: "Password",
        esqueceu_a_senha: "Forgot Password?",
        nao_tem_conta: "Don't have an account yet?",
        cadastre_se: "Sign Up!",
        criar_conta: "Create Account",
        usuario: "Username",
        email: "Email",
        confirmar_senha: "Confirm Password",
        eu_aceito_os: "I accept the",
        termos_e_condicoes: "Terms and Conditions",
        criar_conta_btn: "Create Account",
        ja_tem_conta: "Already have an account?",
        login: "Login",
        pagina_nao_encontrada: "OOPSS!! Page Not Found :(",
        botao_voltar: "Back",
      },
    },
    pt: {
      translation: {
        ola_mundo: "Olá mundo",
        entre_na_sua_conta: "Entre na Sua Conta",
        senha: "Senha",
        esqueceu_a_senha: "Esqueceu a Senha?",
        nao_tem_conta: "Não tem uma conta ainda?",
        cadastre_se: "Cadastre-se!",
        criar_conta: "Criar Conta",
        usuario: "Usuário",
        email: "Email",
        confirmar_senha: "Confirmar Senha",
        eu_aceito_os: "Eu aceito os",
        termos_e_condicoes: "Termos e Condições",
        criar_conta_btn: "Criar Conta",
        ja_tem_conta: "Já tem uma Conta?",
        login: "Login",
        pagina_nao_encontrada: "PUTSS!! Página não encontrada :(",
        botao_voltar: "Voltar",
      },
    },
    es: {
      translation: {
        ola_mundo: "¡Hola mundo!",
        entre_na_sua_conta: "Ingresa a tu cuenta",
        senha: "Contraseña",
        esqueceu_a_senha: "¿Olvidaste tu contraseña?",
        nao_tem_conta: "¿Todavía no tienes una cuenta?",
        cadastre_se: "¡Regístrate!",
        criar_conta: "Crear Cuenta",
        usuario: "Usuario",
        email: "Email",
        confirmar_senha: "Confirmar Contraseña",
        eu_aceito_os: "Acepto los",
        termos_e_condicoes: "Términos y Condiciones",
        criar_conta_btn: "Crear Cuenta",
        ja_tem_conta: "¿Ya tienes una cuenta?",
        login: "Iniciar sesión",
        pagina_nao_encontrada: "¡AY! Página no encontrada :(",
        botao_voltar: "Volver",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
