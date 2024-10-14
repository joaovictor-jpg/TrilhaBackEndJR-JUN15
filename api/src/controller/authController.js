const Controller = require('./Controller.js');
const AuthServices = require('../server/authServices.js');
const { Sequelize } = require('sequelize');

const auth = new AuthServices();

class AuthController extends Controller {
  constructor() {
    super(auth);
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const token = await auth.login({ email, password });
      return res.status(201).json(token);
    } catch (error) {
      if (error instanceof Sequelize.ValidationError) {
        return res.status(422).send({
          message: 'Erro de validação',
          errors: error.message
        });
      }
      if (error instanceof UserNaoEncontrodado) {
        return res.status(error.status).send({
          message: 'Error',
          errors: error.message
        });
      }
      return res.status(500).send({
        message: 'Erro no servidor. Tente novamente mais tarde.',
        details: error.message
      });
    }
  }
}

module.exports = AuthController;
