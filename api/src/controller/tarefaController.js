const Controller = require('./Controller.js');
const TarefaServices = require('../server/tarefaServices.js');
const UserNaoEncontrodado = require('../errors/userNaoEncontrodado.js');
const TarefaNaoEncontrada = require('../errors/tarefaNaoEcontrada.js');
const { Sequelize } = require('sequelize');

const tarefa = new TarefaServices();

class TarefaController extends Controller {
  constructor() {
    super(tarefa);
  }

  async findAll(req, res) {
    const userId = req.userId;
    try {
      const tarefas = await tarefa.findAll(userId);
      return res.status(200).send(tarefas);
    } catch (error) {
      if (error instanceof UserNaoEncontrodado) {
        return res.status(error.status).send({
          error: 'Usuário não encontrado',
          message: error.message
        });
      }
      if (error instanceof TarefaNaoEncontrada) {
        return res.status(error.status).send({
          error: 'Nenhuma tarefa cadastrada',
          message: error.message
        });
      }
      return res.status(500).send(error.message);
    }
  }

  async create(req, res) {
    const userId = req.userId;
    const { titulo, descricao } = req.body;
    try {
      const tarefaUser = await tarefa.create({ titulo, descricao, userId });
      return res.status(201).send({
        message: 'Tarefa cadastrada',
        data: tarefaUser
      });
    } catch (error) {
      if(error instanceof UserNaoEncontrodado) {
        return res.status(error.status).message({
          error: 'Usuário não encontrado',
          message: error.message
        });
      }
      if (error instanceof Sequelize.ValidationError) {
        return res.status(422).send({
          message: 'Erro de validação',
          errors: error.message
        });
      }
      return res.status(500).send({ message: error.message });
    }
  }
}

module.exports = TarefaController;
