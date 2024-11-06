import { Sequelize } from 'sequelize';

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = 'bookstertcc';
const dbHost = 'localhost';

const sequelize = new Sequelize(dbName, 'root', 'Projeto@tcc123', {
  host: dbHost,
  dialect: 'mysql',
  logging: false,
});
console.log(sequelize, 'sequelize')

export default sequelize;


