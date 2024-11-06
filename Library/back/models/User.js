import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig.js'; // Certifique-se de que o caminho para a configuração do Sequelize está correto
import UserType from "../enums/UserType.js";

class User extends Model {}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Validação para o formato de email
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [Object.values(UserType.USERTYPE)], // Validação para o enum
    },
  },
  // books: {
  //   type: DataTypes.ARRAY(DataTypes.INTEGER), // Usado para relacionar livros, ajuste conforme necessário
  //   allowNull: true,
  // },
  profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize, // A instância do Sequelize
  modelName: 'User',
  tableName: 'users', // Nome da tabela no banco de dados
  timestamps: true, // Se você quiser campos createdAt e updatedAt
});

export default User;
