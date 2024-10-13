const { describe, expect } = require('@jest/globals');
const UserServices = require('../../server/userServices.js');

const user = new UserServices();

describe('Teste de userServices final feliz', () => {
  it('Deve retornar uma lista de users', async () => {
    const listaDeUsers = await user.findAll();

    expect(listaDeUsers[0].name).toBe('teste 2');
  });
  it('deve cadastrar user', async () => {
    const name = 'teste2';
    const email = 'teste2@gmail.com';
    const password = 'teste123';
    const userT = await user.createUser({ name, email, password });

    expect(userT.name).toStrictEqual(name);
    await user.deleteUsers(userT.id);
  });
  it('Deve retorna user por id', async () => {
    const userT = await user.findById(1);
    expect(userT.name).toStrictEqual('teste 2');
  });
  it('Deve atualizar user por id', async () => {
    const name = 'teste 2';
    const linhasAlteradas = await user.updateUser({ name }, 1);
    expect(linhasAlteradas[0]).toEqual(1);
  });
});

describe('Teste de userServices final Triste', () => {
  it('Testando criar um usuario com campo nome null', async () => {
    const user2 = {
      email: 'teste@gmail',
      password: 'teste123'
    };
    await expect(user.createUser(user2)).rejects.toThrow('O nome é obrigatório. Por favor, preencha este campo.');
  });
  it('Deve retornar email null', async () => {
    const user2 = {
      name: 'Teste',
      password: 'teste123'
    };
    await expect(user.createUser(user2)).rejects.toThrow('O e-mail é obrigatório. Por favor, preencha este campo.');
  });
  it('Deve retonar password null', async () => {
    const user2 = {
      name: 'Teste',
      email: 'teste@gmail.com'
    };
    await expect(user.createUser(user2)).rejects.toThrow('Senha obrigatória');
  });
});
