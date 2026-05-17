/* global test, expect, jest */

test('AwesomeAPI deve retornar cotação do Dólar (USDBRL)', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ USDBRL: { bid: "5.50" } }),
    })
  );

  const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
  const data = await response.json();

  expect(response.ok).toBe(true);
  expect(data).toHaveProperty('USDBRL');
  expect(data.USDBRL).toHaveProperty('bid');
});