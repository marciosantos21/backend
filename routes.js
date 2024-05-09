//Bibliotecas
const express       = require('express');
const app           = express();
const port          = 3000;
const bodyParser    = require('body-parser');
const { basicAuth } = require('./app/config/token') //autenticacao
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'Documentação da minha API (Marcio Santos)'
      },
    },
    apis: ['./documentation'],
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.json());

//Importação usuasio
const userRouter  = require('./app/controller/user/create')


// Rota do usuario
app.use('/user', basicAuth, userRouter)

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
