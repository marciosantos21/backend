/**
 * 
 * @author Marcio Santos
 * @version 0.1
 * @description Conexão e interações com o banco de dados
 * 
 */

const crypto = require('crypto');
const define = require('./define')

function hashData(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

const authenticateUser = (username, password) => {
    return (define.TokenUserName === hashData(username) && define.TokenPassword === hashData(password) ? true : false)
};

const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if(authHeader) {
        const encodedCredentials = authHeader.split(' ')[1];;
        const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
        const [username, password] = decodedCredentials.split(':');
  
        if(authenticateUser(username, password)) {
            next(); // Autenticação bem-sucedida
        }else {
            res.sendStatus(401); // Autenticação falhou
        }
    }else {
        res.sendStatus(401); // Autenticação falhou
    }
};

module.exports = { basicAuth };