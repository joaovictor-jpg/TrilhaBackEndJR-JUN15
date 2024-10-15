const { Router } = require('express');
const TarefaController = require('../controller/tarefaController.js');
const Autenticado = require('../middleware/autenticado.js');

const tarefa = new TarefaController();
const router = Router();

router.use(Autenticado);

router
  .get('/tarefas', (_, res) => tarefa.findAll(_, res))
  .get('/tarefas/:id', (req, res) => tarefa.findByPk(req, res))
  .post('/tarefas', (req, res) => tarefa.create(req, res))
  .put('/tarefas/:id', (req, res) => tarefa.update(req, res))
  .delete('/tarefas/:id', (req, res) => tarefa.delete(req, res));

module.exports = router;
