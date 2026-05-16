test('AwesomeAPI deve retornar cotação do Dólar (USDBRL)', async () => {
  const url = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL';

  const response = await fetch(url);
  const data = await response.json();

  expect(response.ok).toBe(true);

  expect(data).toHaveProperty('USDBRL');

  const cotacao = parseFloat(data.USDBRL.bid);
  expect(cotacao).toBeGreaterThan(0);
}, 10000); 