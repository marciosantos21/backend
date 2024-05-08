
# Teste Tecnico CRUD

Bem-vindo ao Projeto!


## Como Começar
Para começar, siga estas instruções:

1. Clone o repositório:
   git clone https://github.com/marciosantos21/backend.git

2. Migração banco de dados:
    2.1. Acesse o diretório raiz do projeto e execute o comando:
        docker-compose -f docker-compose.yml up -d

3. Criação das tabelas utilizando "Knex", pois flywaydb esta com erro "npm ERR! 404 Not Found":
    npx knex migrate:latest

4.