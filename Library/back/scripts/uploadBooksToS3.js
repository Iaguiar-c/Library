import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { getAllBooksWithoutPagination } from './caminho/para/seu/arquivo/bookController.js';

dotenv.config();

async function uploadBooksToFile() {
  try {
    // Fazer uma chamada para o método que obtém os livros
    const books = await getAllBooksWithoutPagination({ query: { userId: 'user-id-aqui' } });

    const jsonData = JSON.stringify(books, null, 2);

    // Caminho para salvar o arquivo JSON no repositório
    const filePath = path.join(__dirname, '..', 'data', `user_user-id-aqui_books.json`);

    // Salvar os dados em um arquivo JSON
    fs.writeFileSync(filePath, jsonData, 'utf8');
    console.log('Dados salvos no arquivo JSON:', filePath);
  } catch (error) {
    console.error('Erro ao salvar os dados no arquivo JSON:', error);
  }
}

uploadBooksToFile();
