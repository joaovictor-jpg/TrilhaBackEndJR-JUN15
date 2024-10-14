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

  async findByEmail(email) {
    return await database[this.model].findOne({
      where: {
        email
      }
    });
  }

  async create(model) {
    return await database[this.model].create(model);
  }

  async update(model, id) {
    return await database[this.model].update(
      model,
      {
        where: {
          id : id
        }
      }
    );
  }

  async delete(id) {
    return await database[this.model].destroy({
      where: {
        id
      }
    });
  }
}

module.exports = Service;
