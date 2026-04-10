test('deve calcular o saldo final corretamente', () => {
  const receitas = 1500;
  const despesas = 300;
  const saldo = receitas - despesas;
  expect(saldo).toBe(1200);
});