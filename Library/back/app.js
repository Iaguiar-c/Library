const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const cors = require("cors");
const { exec } = require("child_process");

require("dotenv").config();

const app = express();

// Importar a configuração do Swagger
const { swaggerUi, swaggerDocs } = require("./swagger/swaggerSetup");

// Middleware para servir a interface do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Redirecionar para a rota do Swagger
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Config JSON response
app.use(express.json());

// Models
const User = require("./models/User");
const bookModel = require("./models/bookModel");

// Controllers
const userController = require("./controllers/UsuarioController");
const senhaController = require("./controllers/SenhaController");
const bookRoutes = require("./controllers/LivroController");

// CORS
app.use(cors());

app.use("/password", senhaController);
app.use("/auth", userController);
app.use("/user", userController);

app.use("/", bookRoutes);

// Credenciais
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.s4ttksz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Servidor iniciado na porta ${PORT}`);

      // Abrir servidor automaticamente
      const openCommand = process.platform === "win32" ? "start" : "open";
      exec(`${openCommand} http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => console.log(err));
