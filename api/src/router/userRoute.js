const { Router } = require('express');
const UserController = require('../controller/userController');

const router = Router();

const userController = new UserController();

router
  .get('/users', (_, res) => userController.findAll(_, res))
  .get('/users/:id', (req, res) => userController.findByPk(req, res))
  .post('/users', (req, res) => userController.createUser(req, res))
  .put('/users/:id', (req, res) => userController.update(req, res))
  .delete('/users/:id', (req, res) => userController.deletarUsuario(req, res));

module.exports = router;
