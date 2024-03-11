require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const transporter = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

const resetTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
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
      secret
    );

    res.status(200).json({ msg: "Usuário autenticado!", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

// Logout User
app.post("/auth/logout/:Id", async (req, res) => {
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
app.put("/auth/update/:Id", async (req, res) => {
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
app.delete("/auth/delete/:Id", async (req, res) => {
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

// TESTEEEEEE
// Rota para solicitar a redefinição de senha
app.post("/forgot-password", async (req, res) => {
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
    to: "kmulti2020@gmail.com",
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
app.post("/reset-password", async (req, res) => {
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
