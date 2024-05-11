//Bibliotecas
const express       = require('express');
const app           = express();
const port          = 3000;
const bodyParser    = require('body-parser');
const { basicAuth } = require('./app/config/token') //autenticacao
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
