import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { exec } from 'child_process';
import routes from './routes.js';
import { swaggerUi, swaggerDocs } from './swagger/swaggerSetup.js'; 

const app = express();

// Middleware para servir a interface do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Redirecionar para a rota do Swagger
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.use(express.json());
app.use(cors());
app.use(routes);

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