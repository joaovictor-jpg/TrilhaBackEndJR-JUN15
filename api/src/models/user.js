/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'O nome é obrigatório. Por favor, preencha este campo.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'unique_email_constraint',
        msg: 'Este email já está sendo utilizado.'
      },
      validate: {
        notNull: {
          msg: 'O e-mail é obrigatório. Por favor, preencha este campo.'
        },
        len: {
          args: [8],  // Mínimo de 8 caracteres, sem limite máximo
          msg: 'A senha deve ter no mínimo 8 caracteres.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A senha é obrigatório'
        },
        is: {
          args: /^[a-zA-Z0-9]+$/, // Apenas letras e números
          msg: 'A senha deve conter apenas caracteres alfanuméricos.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};
