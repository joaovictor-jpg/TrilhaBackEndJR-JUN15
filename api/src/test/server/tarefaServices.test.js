const { describe, expect } = require('@jest/globals');
const TarefaServices = require('../../server/tarefaServices.js');

const tarefa = new TarefaServices();

describe('Teste Da service tarefa', () => {
  it('Deve retornar um error de id user', async () => {
    const tarefaTeste = {
      titulo: 'teste',
      descrcao: 'Teste de uma descricao',
      userId: 10
    };

    await expect(tarefa.createTarefa(tarefaTeste)).rejects.toThrowError('Usuário não encontrado');
  });
  it('Deve retornar um error de titulo obrigatório', async () => {
    const tarefaTeste = {
      descricao: 'teste',
      userId: '1'
    };

    await expect(tarefa.createTarefa(tarefaTeste)).rejects.toThrowError('Título da tarefa é obrigatório');
  });
  it('Deve retornar uma tarefa', async () => {
    const tarefaTeste = {
      titulo: 'Treinamento',
      descricao: 'Teste',
      userId: '1'
    };

    const resultado = await tarefa.createTarefa(tarefaTeste);

    expect(resultado.titulo).toBe(tarefaTeste.titulo);
    await tarefa.delete(resultado.id);
  });
});
