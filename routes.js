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

//Requisições da Autenticação
const AuthUser      = require('./app/controller/auth/login')

//Requisições do Usuário
const ReadUser      = require('./app/controller/user/read')
const CreateUser    = require('./app/controller/user/create')
const UpdateUser    = require('./app/controller/user/update')
const DeleteUser    = require('./app/controller/user/delete')



// versionamento de rotas
app.use('/v1', basicAuth, 
    AuthUser,
    ReadUser, 
    CreateUser, 
    UpdateUser, 
    DeleteUser,
)

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
