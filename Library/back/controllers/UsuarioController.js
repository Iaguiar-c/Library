const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

//BEGIN: CRUD usuário 

//Rota Publica
router.get("/", (req, res) => {
    res.status(200).json({ msg: "Opa Bão" });
  });
  
  //Rota Privada
  router.get("/:id", checkToken, async (req, res) => {
    const id = req.params.id;
  
    //verificar se o usuario existe
    const user = await User.findById(id, "-password");
  
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }
  
    res.status(200).json({ user });
  });
  
  function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ msg: "Acesso negado!" });
    }
  
    try {
      const secret = process.env.secret;
  
      jwt.verify(token, secret);
  
      next();
    } catch (error) {
      res.status(400).json({ msg: "Token inválido!" });
    }
  }
  
  //Registrar usuario
  router.post("/register", async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;
  
    //validações
    if (!name) {
      return res.status(422).json({ msg: "Nome obrigatório" });
    }
  
    if (!email) {
      return res.status(422).json({ msg: "Email obrigatório" });
    }
  
    if (!password) {
      return res.status(422).json({ msg: "Senha obrigatória" });
    }
  
    if (password !== confirmpassword) {
      return res.status(422).json({ msg: "As senhas precisam ser iguais!" });
    }
  
    //ver se o usuario existe
    const userExists = await User.findOne({ email: email });
  
    if (userExists) {
      return res.status(422).json({ msg: "Email já cadastrado!" });
    }
  
    //criar senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
  
    //criar usuario
    const user = new User({
      name,
      email,
      password: passwordHash,
    });
  
    try {
      await user.save();
  
      res.status(201).json({ msg: "Usuario criado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro no servidor" });
    }
  });
  
  //Login User
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    //validações
    if (!email) {
      return res.status(422).json({ msg: "Email obrigatório" });
    }
  
    if (!password) {
      return res.status(422).json({ msg: "Senha obrigatória" });
    }
  
    //verificar se o usuario existe
    const user = await User.findOne({ email: email });
  
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }
  
    //verificar se a senha está correta
    const checkPassword = await bcrypt.compare(password, user.password);
  
    if (!checkPassword) {
      return res.status(422).json({ msg: "Senha inválida!" });
    }
  
    try {
      const secret = process.env.secret;
  
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );
  
      res.status(200).json({ msg: "Usuário autenticado!", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro no servidor" });
    }
  });
  
  // Logout User
  router.post("/logout/:Id", async (req, res) => {
    const Id = req.params.Id;
  
    try {
      // Verificar se o usuário existe antes de realizar o logout
      const user = await User.findById(Id);
      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }
      
      //Deslogar o usuário
      res.status(200).json({ msg: "Usuário desconectado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro no servidor" });
    }
  });
  
  //Update User
  router.put("/update/:Id", async (req, res) => {
    const Id = req.params.Id;
    const { name, email, password, confirmpassword } = req.body;
  
    // Validação dos campos
    if (!name) {
      return res.status(422).json({ msg: "Nome obrigatório" });
    }
  
    if (!email) {
      return res.status(422).json({ msg: "Email obrigatório" });
    }
  
    if (!password) {
      return res.status(422).json({ msg: "Senha obrigatória" });
    }
  
    // Verificar se o usuário existe antes de tentar atualizar
    try {
      const user = await User.findById(Id);
      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Erro no servidor" });
    }
  
    // Lógica para atualizar o usuário
    try {
      // Atualizar apenas os campos que foram fornecidos
      const updatedFields = {};
      if (name) updatedFields.name = name;
      if (email) updatedFields.email = email;
      if (password) {
        // Validar se a senha e a confirmação são iguais
        //Não esquecer de passar no Body-->raw ambos os campos password e confirmpassword
        if (password !== confirmpassword) {
          return res.status(422).json({ msg: "As senhas precisam ser iguais!" });
        }
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        updatedFields.password = passwordHash;
      }
  
      //Atualizando o usuário
      await User.findByIdAndUpdate(Id, updatedFields);
  
      res.status(200).json({ msg: "Usuário atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro no servidor" });
    }
  });
  
  //Delete User
  router.delete("/delete/:Id", async (req, res) => {
    const Id = req.params.Id;
  
    try {
      // Verificar se o usuário existe antes de tentar deletar
      const user = await User.findById(Id);
      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }
  
      // Lógica para que o usuário seja deletado
      await User.findByIdAndDelete(Id);
  
      res.status(200).json({ msg: "Usuário deletado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro no servidor" });
    }
  });
  
  // END: CRUD Usuário

module.exports = router;
