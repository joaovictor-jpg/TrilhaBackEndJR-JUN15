require('dotenv').config();
const { ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Services = require('./Services.js');
const UserNaoEncontrodado = require('../errors/userNaoEncontrodado.js');
const SenhaOuLoginIncorreto = require('../errors/senhaOuLoginIncorreto.js');

class AuthServices extends Services {
  constructor() {
    super('User');
  }

  async login(dto) {
    if (!dto.email || !dto.password) {
      throw new ValidationError('Senha e email e obrigatório');
    }

    const user = await super.findByEmail(dto.email);

    if (!user) {
      throw new UserNaoEncontrodado('Usuário não encontrado', 404);
    }

    const senhaIguais = await bcrypt.compare(dto.password, user.password);

    if (!senhaIguais) {
      throw new SenhaOuLoginIncorreto('Login ou senha incorreta', 401);
    }

    const jsonSecret = process.env.JSONSECRET;

    const token = await jwt.sign({ idUser: user.id, nameUser: user.name }, jsonSecret, { expiresIn: '1h' });

    return token;

  }
}

module.exports = AuthServices;
