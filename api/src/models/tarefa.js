/* eslint-disable linebreak-style */

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarefa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tarefa.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  Tarefa.init({
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Título da tarefa é obrigatório'
        }
      }
    },
    descricao: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Id do usuário é obrigatório'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Tarefa',
    tableName: 'tarefas'
  });
  return Tarefa;
};
