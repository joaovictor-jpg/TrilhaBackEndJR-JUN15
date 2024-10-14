const { ValidationError } = require('sequelize');
const Services = require('./Services.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthServices extends Services {
  constructor() {
    super('User');
  }

  async login(dto) {
    try {
      if (!dto.email || !dto.password) {
        throw new ValidationError('Senha e email e obrigatório');
      }

      const user = await super.findByEmail(dto.email);

      if (!user) {
        return -1;
      }

      const senhaIguais = await bcrypt.compare(dto.password, user.password);

      if (!senhaIguais) {
        return -1;
      }

      const token = jwt.sign({ idUser: user.id, nameUser: user.name }, process.env.JSONSECRET, { algorithm: 'RS256' });

      return token;
    } catch (error) {
      throw new Error(error.message);
    }

  }
}

module.exports = AuthServices;
