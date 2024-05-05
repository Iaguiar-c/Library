const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticateToken = require('../middlewares/authUsuario');
require("dotenv").config();

//BEGIN: CRUD usuário
//Rota Publica
router.get("/", (req, res) => {
  res.status(200).json({ msg: "Servidor está funcionando corretamente." });
});

//Rota Privada
router.get("/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;

  try {
    // Verifica se o usuário existe no banco de dados
    const user = await User.findById(id, "-password");

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error.message);
    res.status(500).json({ msg: "Erro ao buscar usuário." });
  }
});

// Registrar um novo usuário
router.post("/register", async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  // Validações dos campos obrigatórios
  if (!name || !email || !password) {
    return res
      .status(422)
      .json({ msg: "Por favor, forneça todos os campos obrigatórios." });
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(422).json({ msg: "Formato de email inválido." });
  }

  // Validar a força da senha
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(422).json({
      msg: "A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.",
    });
  }

  if (password !== confirmpassword) {
    return res.status(422).json({ msg: "As senhas precisam ser iguais!" });
  }

  try {
    // Verifica se o usuário já existe no banco de dados
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      throw new Error("Este email já está cadastrado. Por favor, use outro email.");
    }

    // Gera um hash da senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Cria um novo usuário
    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    // Salva o usuário no banco de dados
    await user.save();

    res.status(201).json({ msg: "Usuário registrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.message);
    res.status(500).json({
      msg: "Houve um erro no servidor ao registrar o usuário. Por favor, tente novamente mais tarde.",
    });
  }
});

// Login de usuário
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validações dos campos obrigatórios
  if (!email || !password) {
    return res
      .status(422)
      .json({ msg: "Por favor, forneça o email e a senha." });
  }

  try {
    // Verifica se o usuário existe no banco de dados
    const user = await User.findOne({ email: email });

    // Retorna uma mensagem genérica em vez de "Usuário não encontrado" para evitar vazamento de informações
    if (!user) {
      return res.status(401).json({ msg: "Credenciais inválidas." });
    }

    // Verifica se a senha está correta
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ msg: "Credenciais inválidas." });
    }

    const secret = process.env.secret;

    // Gera um token de autenticação
    const token = jwt.sign({ id: user._id }, secret);

    res.status(200).json({ msg: "Usuário autenticado!", token, user });
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
    res.status(500).json({ msg: "Erro no servidor ao fazer login." });
  }
});

// Logout de usuário
router.post("/logout/:Id", authenticateToken, async (req, res) => {
  res.status(200).json({ msg: "Usuário desconectado com sucesso!" });
  const Id = req.params.Id;
  
    try {
     // Verificar se o usuário existe antes de realizar o logout
      const user = await User.findById(Id);
      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }
      
     // Deslogar o usuário
      res.status(200).json({ msg: "Usuário desconectado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro no servidor" });
    }
});

// Atualização de usuário
router.put("/update/:Id", authenticateToken, async (req, res) => {
  const Id = req.params.Id;
  const { name, email, password, confirmpassword } = req.body;

  // Validação dos campos obrigatórios
  if (!name || !email || !password) {
    return res
      .status(422)
      .json({ msg: "Por favor, forneça todos os campos obrigatórios." });
  }

  // Validação do formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(422).json({ msg: "Formato de email inválido." });
  }

  // Validar a força da senha
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(422).json({
      msg: "A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.",
    });
  }

  // Verificar se o usuário existe antes de tentar atualizar
  try {
    const user = await User.findById(Id);
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error.message);
    return res.status(500).json({ msg: "Erro no servidor ao buscar usuário." });
  }

  // Validar se a senha e a confirmação são iguais
  if (password !== confirmpassword) {
    return res.status(422).json({ msg: "As senhas precisam ser iguais." });
  }

  try {
    // Criar um hash da nova senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Atualizar o usuário com os novos dados
    await User.findByIdAndUpdate(Id, { name, email, password: passwordHash });

    res.status(200).json({ msg: "Usuário atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error.message);
    res.status(500).json({ msg: "Erro no servidor ao atualizar usuário." });
  }
});

// Exclusão de usuário
router.delete("/delete/:Id", authenticateToken, async (req, res) => {
  const Id = req.params.Id;

  try {
    // Deleta o usuário diretamente pelo Id
    const deletedUser = await User.findByIdAndDelete(Id);

    // Verifica se o usuário foi encontrado e deletado com sucesso
    if (!deletedUser) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    res.status(200).json({ msg: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error.message);
    res.status(500).json({ msg: "Erro no servidor ao deletar usuário." });
  }
});

// END: CRUD Usuário

module.exports = router;
