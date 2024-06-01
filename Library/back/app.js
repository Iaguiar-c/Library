import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { exec } from 'child_process';
import AWS from 'aws-sdk'; // Importar AWS SDK
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

// Configuração do AWS SDK
AWS.config.update({
  region: 'sa-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Criar uma instância do serviço S3
const s3 = new AWS.S3();

// Função para fazer upload de dados para o S3
const uploadToS3 = (data) => {
  const params = {
    Bucket: 'bookster', 
    Key: 'response_1717098089380.json', // Nome do arquivo no S3
    Body: JSON.stringify(data),
    ContentType: 'application/json'
  };

  // Fazer upload para o S3
  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Erro ao fazer upload:', err);
    } else {
      console.log('Upload bem-sucedido:', data.Location);
    }
  });
};

// Credenciais MongoDB
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
