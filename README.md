# 💰 F-Control
[![CI de Qualidade (Lint + Testes)](https://github.com/gabxnz/F-Control/actions/workflows/ci.yml/badge.svg)](https://github.com/gabxnz/F-Control/actions/workflows/ci.yml)

> **Link da Aplicação Publicada:** https://f-control.vercel.app/

**Problema Real:** A dificuldade de organização financeira e o endividamento por falta de controle de gastos simples.
<br>**Solução:** Uma ferramenta intuitiva para registro de entradas e saídas, permitindo visualização rápida do saldo.
<br>**Público-alvo:** Microempreendedores e pessoas que buscam controle financeiro.

## Funcionalidades Principais
- Adição de receitas e despesas.
- Cálculo automático do saldo atual.
- Busca e exibição em tempo real da cotação do Dólar (USD) via API.
- Interface simples e direta ao ponto (via navegador).

## Integração com API de Câmbio
A aplicação se conecta à internet para consumir dados financeiros em tempo real, permitindo análises e conversões baseadas em moeda estrangeira de forma dinâmica.

- **API Utilizada:** AwesomeAPI (API de Cotações de Moedas), um serviço REST público, aberto e de alta disponibilidade.
- **Endpoint:** `https://economia.awesomeapi.com.br/json/last/USD-BRL`

## Testes Automatizados e Qualidade
Para garantir que o sistema funcione sempre perfeitamente e sem travamentos, existem testes automáticos que rodam a cada atualização:

- **Teste de Integração:** Um teste focado (`api.test.js`) que valida se a comunicação com a API de moedas está funcionando e entregando os dados no formato correto.
- **Simulação da API (Mocks):** Para o teste não depender da internet ou correr o risco de falhar se o site da API ficar fora do ar, existe uma resposta simulada. Assim, conseguimos testar o fluxo perfeitamente, sem depender de conexões externas e com total segurança.

## Tecnologias
- HTML5 / CSS3 / JavaScript (ES6+)
- Node.js & npm
- Jest (Testes Automatizados / Mocks)
- ESLint (Análise Estática/Linting)
- GitHub Actions (Integração Contínua)

## Como Executar e Testar

**Pré-requisito:** Ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

1. Instale as dependências do projeto: 
   `npm install`
2. Rode a aplicação: 
   Abra o arquivo `index.html` em qualquer navegador.
3. Rode os testes automatizados: 
   `npm test`
4. Rode a análise de código (lint): 
   `npm run lint`

---
**Versão:** 1.0.0  
**Autor:** Gabriel Costa Guimarães  
**Link do Repositório:** https://github.com/gabxnz/F-Control  
