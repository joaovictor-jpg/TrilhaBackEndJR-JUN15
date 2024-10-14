const express = require('express');
const user = require('./userRoute.js');
const auth = require('./authRoute.js');

const router = app => {
  app.route('/').get((_, res) => {
    res.status(200).send({ message: 'Hello world teste' });
  });
  app.use(
    express.json(),
    user,
    auth
  );
};

module.exports = router;
