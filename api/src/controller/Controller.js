const { Sequelize } = require('sequelize');

class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async findAll(_, res) {
    try {
      const users = await this.entidadeService.findAll();
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  async findByPk(req, res) {
    const { id } = req.params;
    try {
      const user = await this.entidadeService.findById(Number(id));

      if (user === null) {
        return res.status(404).send({ message: `User com ${id} não foi encontrado` });
      }

      return res.status(200).send(user);

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await this.entidadeService.createUser({ name, email, password });
      return res.status(201).send(user);
    } catch (error) {
      if (error instanceof Sequelize.ValidationError) {
        return res.status(422).send({
          message: 'Erro de validação',
          errors: error.message
        });
      }

      return res.status(500).send({
        message: 'Erro no servidor. Tente novamente mais tarde.',
        details: error.message
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    try {
      const dto = req.body;
      const linhasAtualizadas = await this.entidadeService.updateUser(dto, Number(id));
      if (linhasAtualizadas <= 0) res.status(400).send({ error: 'Error na requisição' });
      return res.status(200).send({ message: 'Usuário atualizado' });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  async deletarUsuario(req, res) {
    const { id } = req.params;
    try {
      const linhasAlteradas = await this.entidadeService.deleteUsers(id);
      if(linhasAlteradas <= 0) res.status(400).send({ message: 'Erro na dekeção de usuário' });
      return res.status(200).send({ message: 'Usuário deletado' });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
}

module.exports = Controller;
