const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const mongoose = require("mongoose");

// Configurar transporter do SendGrid
const transporter = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

// Definir o esquema e modelo para tokens de redefinição de senha
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

// Rota para solicitar redefinição de senha (enviar e-mail)
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar se o usuário com o e-mail fornecido existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    // Gerar e salvar token de redefinição de senha
    const resetToken = crypto.randomBytes(20).toString("hex");
    const expires = Date.now() + 3600000; // Token expira em 1 hora

    const resetTokenObj = new ResetToken({
      user: user._id,
      token: resetToken,
      expires,
    });

    await resetTokenObj.save();

    // Enviar e-mail de recuperação de senha
    const resetLink = `https://seusite.com/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: "seuemail@example.com",
      to: user.email,
      subject: "Recuperação de Senha",
      html: `<p>Olá ${user.name},</p>
            <p>Clique no link abaixo para redefinir sua senha:</p>
            <a href="${resetLink}">${resetLink}</a>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: "E-mail de recuperação de senha enviado com sucesso" });
  } catch (error) {
    console.error("Erro ao enviar e-mail de recuperação de senha:", error);
    res.status(500).json({ msg: "Erro ao enviar e-mail de recuperação de senha" });
  }
});

// Rota para redefinir a senha com base no token
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Encontrar o token de redefinição na base de dados
    const resetTokenObj = await ResetToken.findOne({ token });

    if (!resetTokenObj || resetTokenObj.expires < Date.now()) {
      return res.status(400).json({ msg: "Token inválido ou expirado" });
    }

    // Encontrar o usuário associado ao token
    const user = await User.findById(resetTokenObj.user);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    // Gerar hash da nova senha
    const salt = await bcrypt.genSalt(12);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    // Atualizar a senha do usuário
    user.password = newPasswordHash;
    await user.save();

    // Remover o token de redefinição
    await resetTokenObj.remove();

    res.status(200).json({ msg: "Senha atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    res.status(500).json({ msg: "Erro ao redefinir senha" });
  }
});

module.exports = router;
