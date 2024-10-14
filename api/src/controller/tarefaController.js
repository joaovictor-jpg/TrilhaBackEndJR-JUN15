const Controller = require('./Controller.js');
const TarefaServices = require('../server/tarefaServices.js');

const tarefa = new TarefaServices();

class TarefaController extends Controller {
  constructor() {
    super(tarefa);
  }
}

module.exports = TarefaController;
