require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const cors = require('cors');


const app = express();

// Config JSON response
app.use(express.json());



// Models
const User = require("./models/User");

// Controllers
const userController = require("./controllers/UsuarioController");
const senhaController = require("./controllers/SenhaController");
const livroController = require("./controllers/LivroController")


// CORS
app.use(cors());

// Use as controllers como middlewares
app.use("/password", senhaController);
app.use("/auth", userController);
app.use("/user", userController);
app.use("/book", livroController);


// Credenciais
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.s4ttksz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(3001);
    console.log("Conectado");
  })
  .catch((err) => console.log(err));
