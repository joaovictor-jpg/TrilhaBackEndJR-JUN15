const database = require('../models');

class Service {
  constructor(nomeDaEntidade) {
    this.model = nomeDaEntidade;
  }

  async findAll() {
    return await database[this.model].findAll();
  }

  async findById(id) {
    return await database[this.model].findByPk(id);
  }

  async createUser(user) {
    return await database[this.model].create(user);
  }

  async updateUser(user, id) {
    return await database[this.model].update(
      user,
      {
        where: {
          id : id
        }
      }
    );
  }

  async deleteUsers(id) {
    return await database[this.model].destroy({
      where: {
        id
      }
    });
  }
}

module.exports = Service;
