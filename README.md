
# Teste Tecnico CRUD

Bem-vindo ao Projeto!


## Como Começar
Para começar, siga estas instruções:

1. Clone o repositório:
   
   git clone https://github.com/marciosantos21/backend.git

3. Baixar dependencias node:
   
   npm i ou npm install

5. Migração banco de dados (baixe e instale: Docker e MySQL Workbench):
   
    3.1. Acesse o diretório raiz do projeto e execute o comando:
   
        docker-compose -f docker-compose.yml up -d

7. Criação das tabelas utilizando "Knex", pois flywaydb esta com erro "npm ERR! 404 Not Found":
   
    npx knex migrate:latest


## Testar end-points

1. Inicie a aplicação com o comando:
   
    npm start

2. PRIMEIRO MODO -> Acesse a documentação web da API usando:
   
    http://localhost:3000/api-docs/

    2.1. Faça a autenticação usando:
   
        Basic YWRtaW46MTIzNDU=

3. SEGUNDO MODO -> Acesse Postman e execute a API
   
    3.1. Autenticação Type (Basic Auth):
   
    Username: admin
   
    Password: 12345
