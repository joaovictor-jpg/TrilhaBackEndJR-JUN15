const express = require('express');
const user = require('./userRoute.js');
const auth = require('./authRoute.js');
const tarefa = require('./tarefaRoute.js');

const router = app => {
  app.route('/').get((_, res) => {
    res.status(200).send({ message: 'Hello world teste' });
  });
  app.use(
    express.json(),
    auth,
    user,
    tarefa
  );
};

module.exports = router;
