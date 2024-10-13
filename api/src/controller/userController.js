const Controller = require('./Controller.js');
const UserServer = require('../server/userServices.js');

const userServices = new UserServer();

class UserController extends Controller {
  constructor() {
    super(userServices);
  }
}

module.exports = UserController;
