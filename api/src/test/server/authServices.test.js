const jwt = require('jsonwebtoken');
const { describe, expect } = require('@jest/globals');
const AuthServices = require('../../server/authServices.js');
require('dotenv').config();

const auth = new AuthServices();

describe('Teste de Auth services', () => {
  it('Deve negar caso um dos campos for null', async () => {
    const email = 'tete@gmail.com';
    const password = '';

    await expect(auth.login({ email, password })).rejects.toThrowError('Senha e email e obrigatório');
  });
  it('Deve negar quando usuário não existir', async () => {
    const email = 'tes@gmail.com';
    const password = 'teste';

    await expect(auth.login({ email, password })).rejects.toThrowError('Usuário não encontrado');
  });
  it('Deve Retorna 401 para senhas incorreta', async () => {
    const email = 'teste@gmail.com';
    const password = 'nunca';

    await expect(auth.login({ email, password })).rejects.toThrowError('Login ou senha incorreta');
  });
  it('Deve gerar um token JWT válido para credenciais corretas', async () => {
    const email = 'teste4@gmail.com';
    const password = 'Teste123';
    const token = await auth.login({ email, password });
    const jsonSecret = process.env.JSONSECRET;
    const decode = await jwt.verify(token, jsonSecret);
    expect(decode).toHaveProperty('idUser', 4);
  });
});
