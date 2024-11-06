import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import routes from './routes.js';
import { swaggerUi, swaggerDocs } from './swagger/swaggerSetup.js'; 
import sequelize from './config/sequelizeConfig.js';

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Permite apenas requisições do frontend em localhost:3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Authorization', 'Content-Type'], // Cabeçalhos permitidos
};

app.use(cors(corsOptions));

// Middleware para servir a interface do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Redirecionar para a rota do Swagger
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3001;

// Conectar ao MySQL e iniciar o servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados MySQL.');
    app.listen(PORT, () => {
      console.log(`Servidor iniciado na porta ${PORT}`);
      
      // Abrir servidor automaticamente
      const openCommand = process.platform === "win32" ? "start" : "open";
      exec(`${openCommand} http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => console.error('Erro ao conectar ao MySQL:', err));
