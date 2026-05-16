async function fetchCotacoes() {
  const url = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL';
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Erro ao buscar cotações: ' + response.status);
  }

  const data = await response.json();
  return data;
}

module.exports = { fetchCotacoes };