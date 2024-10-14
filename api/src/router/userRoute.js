const { Router } = require('express');
const UserController = require('../controller/userController');
const Autenticado = require('../middleware/autenticado.js');

const router = Router();

const userController = new UserController();

router
  .post('/users', (req, res) => userController.createUser(req, res))
  .get('/users', Autenticado, (_, res) => userController.findAll(_, res))
  .get('/users/:id', (req, res) => userController.findByPk(req, res))
  .put('/users/:id', (req, res) => userController.update(req, res))
  .delete('/users/:id', (req, res) => userController.deletarUsuario(req, res));

module.exports = router;
