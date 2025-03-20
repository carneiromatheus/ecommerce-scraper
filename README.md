# Amazon Scraper

Este projeto é um scraper para coletar informações sobre os livros mais vendidos na Amazon Brasil. Ele utiliza o Puppeteer para navegar e extrair os dados diretamente da página de bestsellers.

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados em sua máquina:

- Node.js (versão 16 ou superior)
- npm (gerenciador de pacotes do Node.js) ou outro de sua preferencia

## Instalação

1. Clone este repositório:

   #### Usando SSH
   ```bash
   git clone git@github.com:carneiromatheus/ecommerce-scraper.git
   cd ecommerce-scrapper
   ```
   ou

   #### Usando HTTPS
   ```bash
   git clone https://github.com/carneiromatheus/ecommerce-scraper.git
   cd ecommerce-scrapper
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

## Uso

1. Para iniciar o scraper, execute o seguinte comando:

   ```bash
   npm run dev
   ```

   O script irá iniciar o processo de scraping e exibir os produtos encontrados no console.

2. Os dados extraídos incluem:

   - Código do produto
   - Posição no ranking
   - Imagem
   - Nome
   - Autor
   - Avaliação
   - Preço
   - Link para o produto

   Exemplo de saída no console:

   ```
   Starting scraping...
   Found 10 products:
   Products List: [
     {
       code: "B08XYZ123",
       rank: 1,
       image: "https://m.media-amazon.com/images/I/...",
       name: "Livro Exemplo",
       author: "Autor Exemplo",
       rating: 4.5,
       price: 29.9,
       link: "https://www.amazon.com.br/dp/B08XYZ123"
     },
     ...
   ]
   End of scraping.
   ```

## Estrutura do Projeto

- `app.ts`: Arquivo principal que inicia o processo de scraping.
- `src/types/Product.ts`: Define a interface `Product` para os dados extraídos.
- `src/web-scraper/amazon.ts`: Contém a lógica de scraping para a página de bestsellers da Amazon.

<!-- ## Configuração -->


## Dependências

- [Puppeteer](https://pptr.dev/): Biblioteca para controle de navegadores headless.
- [TypeScript](https://www.typescriptlang.org/): Linguagem utilizada para o desenvolvimento.
- [tsx](https://github.com/esbuild-kit/tsx): Executor para arquivos TypeScript.

## Licença

Este projeto está licenciado sob a licença ISC.
