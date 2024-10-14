const { ValidationError } = require('sequelize');
const Services = require('./Services.js');
const bcrypt = require('bcrypt');

class UserServices extends Services {
  constructor() {
    super('User');
  }

  async createUser(dto) {

    if(!dto.password || dto.password.length < 6) {
      throw new ValidationError('Senha é obrigatória e deve possuir mais de 6 caracter');
    }

    dto.password = await bcrypt.hash(dto.password, 10);

    return await super.create(dto);
  }
}

module.exports = UserServices;
