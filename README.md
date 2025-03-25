# Amazon Scraper e API Serverless

Este projeto consiste em um scraper para coletar informações sobre os livros mais vendidos na Amazon Brasil e uma API Serverless para gerenciar e disponibilizar os dados extraídos. Ele utiliza Puppeteer para scraping e o Serverless Framework para a criação da API.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript.
- **TypeScript**: Superset de JavaScript para tipagem estática.
- **AWS Lambda**: Serviço de computação serverless.
- **AWS API Gateway**: Gerenciamento de APIs.
- **AWS DynamoDB**: Banco de dados NoSQL.
- **Puppeteer**: Biblioteca para controle de navegadores headless.
- **Serverless Framework**: Framework para desenvolvimento de aplicações serverless.

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados:

- Node.js (versão 16 ou superior)
- npm ou yarn
- Serverless Framework
- Conta AWS configurada com credenciais

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/carneiromatheus/ecommerce-scraper.git
   cd ecommerce-scrapper
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

### Testar o Scraper

1. Para testar o scraper, execute:

   ```bash
   npm run scraper
   ```

2. O scraper irá coletar os três primeiros livros mais vendidos na Amazon.

## Configuração

### Configuração da API Serverless

1. Instale o Serverless Framework globalmente:

   ```bash
   npm install -g serverless
   ```

2. Configure as credenciais da AWS:

   ```bash
   serverless config credentials --provider aws --key <AWS_ACCESS_KEY> --secret <AWS_SECRET_KEY>
   ```

3. Faça o deploy da API:

   ```bash
   serverless deploy
   ```

### Configuração do DynamoDB

A tabela DynamoDB será criada automaticamente durante o deploy. A estrutura da tabela é definida no arquivo `serverless.yml`

## Uso

### Endpoints da API

Após o deploy, os seguintes endpoints estarão disponíveis:

- **GET /products**: Retorna os três primeiros produtos armazenados no DynamoDB.
- **POST /refresh**: Executa o scraper e atualiza os dados no DynamoDB.

Teste os endpoints da API utilizando ferramentas como Postman ou cURL.

#### Exemplo de Resposta - GET /products

```json
[
  {
    "code": "B08XYZ123",
    "rank": 1,
    "image": "https://m.media-amazon.com/images/I/...",
    "name": "Livro Exemplo",
    "author": "Autor Exemplo",
    "rating": 4.5,
    "price": 29.9,
    "link": "https://www.amazon.com.br/dp/B08XYZ123"
  },
  ...
]
```

#### Exemplo de Resposta - POST /refresh

```json
{
  "message": "Products refreshed successfully!"
}
```

## Estrutura do Projeto

- **`app.ts`**: Arquivo principal para execução do scraper.
- **`src/types/product.ts`**: Define a interface `Book` para os dados extraídos.
- **`src/web-scraper/amazon.ts`**: Contém a lógica de scraping para a página de bestsellers da Amazon.
- **`src/database/dynamoDB.ts`**: Funções para interação com o DynamoDB.
- **`src/handlers`**: Contém os handlers para as funções Lambda.
  - **`getBooks.ts`**: Retorna os produtos do DynamoDB.
  - **`refreshProducts.ts`**: Atualiza os produtos no DynamoDB.
- **`serverless.yml`**: Configuração da API Serverless e recursos AWS.

