const jws = require('jsonwebtoken');
require('dotenv').config();

module.exports = async function Autenticado(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send('Access token nao informado');
  }

  const [, accessToken] = token.split(' ');

  try {
    jws.verify(accessToken, process.env.JSONSECRET);
    const { idUser, nameUser } = await jws.decode(accessToken);

    req.userId = idUser;
    req.userName = nameUser;

    return next();

  // eslint-disable-next-line no-unused-vars
  } catch (error) {

    res.status(401).send('User não autorizado');

  }

};
