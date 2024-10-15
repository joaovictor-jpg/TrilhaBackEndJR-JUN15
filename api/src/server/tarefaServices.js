const Service = require('./Services.js');
const UserServices = require('./userServices.js');
const UserNaoEncontrodado = require('../errors/userNaoEncontrodado.js');
const database = require('../models');
const TarefaNaoEncontrada = require('../errors/tarefaNaoEcontrada.js');

const user = new UserServices();

class TarefaServices extends Service {
  constructor() {
    super('Tarefa');
  }

  async findAll(userId) {
    const userValido = user.findById(userId);

    if (!userValido) {
      throw new UserNaoEncontrodado('Usuário não encontrado', 404);
    }

    const tarefas = database.Tarefa.findAll({
      where: {
        userId: userId
      }
    });

    if(!tarefas) {
      throw new TarefaNaoEncontrada('Você não tem tarefas listadas.');
    }

    return tarefas;

  }

  async create(dto) {

    const idValido = await user.findById(dto.userId);

    if (!idValido) {
      throw new UserNaoEncontrodado('Usuário não encontrado', 404);
    }

    return await super.create(dto);

  }
}

module.exports = TarefaServices;
