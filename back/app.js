require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

//Config JSON response
app.use(express.json());

//Models
const User = require("./models/User");

//Rota Publica
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Opa Bão" });
});

//Rota Privada
app.get("/user/:id", checkToken, async (req, res) => {
    const id = req.params.id

    //verificar se o usuario existe
    const user = await User.findById(id, '-password')

    if(!user){
        return res.status(404).json({msg: "Usuário não encontrado!"})
    } 

    res.status(200).json({user})
})

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        return res.status(401).json({msg: "Acesso negado!"})
    }

    try {

        const secret = process.env.secret

        jwt.verify(token, secret)

        next()
        
    } catch (error) {
        res.status(400).json({msg: "Token inválido!"})
    }
}

//Registrar usuario
app.post("/auth/register", async (req, res) => {
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
app.post("/auth/login", async (req, res) => {
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
      secret,
    );

    res.status(200).json({msg: "Usuário autenticado!", token})
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

//Credenciais
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.s4ttksz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(3000);
    console.log("Conectado");
  })
  .catch((err) => console.log(err));
