const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const mongoose = require("mongoose");

// BEGIN: enviar e-mail recuperação de senha
const transporter = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

const resetTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  expires: {   
    type: Date,
    required: true,
  },
});

const ResetToken = mongoose.model("ResetToken", resetTokenSchema);

// Rota para solicitar a redefinição de senha
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  // Verifique se o usuário com o e-mail fornecido existe
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado" });
  }

  // Crie um token de redefinição de senha
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Salve o token no banco de dados associado ao usuário
  const resetTokenObj = new ResetToken({
    user: user._id,
    token: resetToken,
    expires: Date.now() + 3600000, // Token expira em 1 hora
  });

  await resetTokenObj.save();

  // Envie o e-mail com o link de redefinição de senha usando NodeMailer
  const resetLink = `https://seusite.com/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: "isaaholiveira15@gmail.com",
    to: `${user.email}`,
    subject: "Recuperação de Senha",
    html: `<p>Olá ${user.name},</p>
                <p>Clique no link abaixo para redefinir sua senha:</p>
                <a href="${resetLink}">${resetLink}</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ msg: "Erro ao enviar e-mail de recuperação de senha" });
    }

    console.log("E-mail enviado:", info.response);
    res
      .status(200)
      .json({ msg: "E-mail de redefinição de senha enviado com sucesso" });
  });
});

// Rota para atualizar a senha com base no token
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  // Encontre o token no banco de dados
  const resetTokenObj = await ResetToken.findOne({ token });

  if (!resetTokenObj || resetTokenObj.expires < Date.now()) {
    return res.status(400).json({ msg: "Token inválido ou expirado" });
  }

  // Encontre o usuário associado ao token
  const user = await User.findById(resetTokenObj.user);

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado" });
  }

  // Atualize a senha do usuário
  const salt = await bcrypt.genSalt(12);
  const newPasswordHash = await bcrypt.hash(newPassword, salt);
  user.password = newPasswordHash;

  // Salve as alterações no usuário e remova o token de redefinição
  await user.save();
  await resetTokenObj.remove();

  res.status(200).json({ msg: "Senha atualizada com sucesso" });
});

// END: enviar e-mail recuperação de senha

module.exports = router;
