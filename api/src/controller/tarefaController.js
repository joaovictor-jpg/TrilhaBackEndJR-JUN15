const Controller = require('./Controller.js');
const TarefaServices = require('../server/tarefaServices.js');

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
      return res.status(500).status(error.message);
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
      return res.status(500).send({ message: error.message });
    }
  }
}

module.exports = TarefaController;
