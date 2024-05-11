const swaggerAutogen = require('swagger-autogen')

const doc = {
    info: {
        title: "teste",
        description: "12345565789",
    },
    host: 'localhost:3000',
    schemses: ['http']
}

const outputFile = './swagger-output.json'
const endpopintsFiles = ['./routes.js']

swaggerAutogen(outputFile, endpopintsFiles, doc).then(() => {
    require('.routes.js')
}) 