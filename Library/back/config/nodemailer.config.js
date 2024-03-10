const nodemailer = require('nodemailer');

// Configurar o transporte
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'isaaholiveira15@gmail.com',
    pass: 'miraculous681326',
  },
});

// Configurar o email
const mailOptions = {
  from: 'isaaholiveira15@gmail.com',
  to: 'kmulti2020@gmail.com',
  subject: 'Assunto do Email',
  text: 'Conteúdo do Email',
  html: '<p>Conteúdo do Email em HTML</p>',
};

// Enviar o email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Email enviado: ' + info.response);
  }
});

