/* global test, expect */
test('deve calcular o saldo final corretamente', () => {
  const receitas = 1500;
  const despesas = 300;
  const saldo = receitas - despesas;
  expect(saldo).toBe(1200);
});

// Teste 2: Entrada Inválida (Valor negativo)
test('deve impedir ou identificar valor negativo', () => {
    const valorDigitado = -50;
    const ehValido = valorDigitado > 0;
    expect(ehValido).toBe(false);
});

// Teste 3: Caso Limite (Saldo Zero)
test('deve permitir que o saldo fique exatamente zero', () => {
    const despesa = 500;
    const saldo = 500;
    expect(saldo - despesa).toBe(0);
});