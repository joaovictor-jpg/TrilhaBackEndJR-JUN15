const Service = require('./Services.js');
const UserServices = require('./userServices.js');
const UserNaoEncontrodado = require('../errors/userNaoEncontrodado.js');

const user = new UserServices();

class TarefaServices extends Service {
  constructor() {
    super('Tarefa');
  }

  async createTarefa(dto) {

    const idValido = await user.findById(dto.userId);

    if (!idValido) {
      throw new UserNaoEncontrodado('Usuário não encontrado', 404);
    }

    return await super.create(dto);

  }
}

module.exports = TarefaServices;
