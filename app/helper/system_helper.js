/**
 * 
 * @author Marcio Santos
 * @version 0.1
 * @description Conexão e interações com o banco de dados
 * 
 */

const validator = require('validator');

module.exports = {
    // Função para validar endereço de e-mail
    async validateEmail(email) {
        return validator.isEmail(email);
    },
}