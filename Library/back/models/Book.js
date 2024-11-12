import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig.js'; // Certifique-se de que o caminho para a configuração do Sequelize está correto
import Status from '../enums/Status.js';
import Categoria from '../enums/Categoria.js';
import User from './User.js'; // Relacionamento com a tabela User

class Book extends Model {}

Book.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  publicationYear: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isIn: [Object.values(Categoria.CATEGORIES)],
    },
  },
  isGoogle: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [Object.values(Status.STATUS)], // Validação para o enum Status
    },
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
      max: 5,
    },
  },
  isFavorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Book',
  tableName: 'books',
  timestamps: true, // Campos createdAt e updatedAt
});

// Configuração do relacionamento com a tabela User
Book.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Book, { foreignKey: 'user_id', as: 'books' });

export default Book;
