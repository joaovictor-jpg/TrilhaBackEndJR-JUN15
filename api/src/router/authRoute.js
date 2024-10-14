const { Router } = require('express');
const AuthController = require('../controller/authController.js');

const router = Router();
const authController = new AuthController();

router.post('/logins', (req, res) => authController.login(req, res));

module.exports = router;
