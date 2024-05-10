/**
 * 
 * @author Marcio Santos
 * @version 0.1
 * @description Funções gerais para facilitar a usabilidade e diminuir códigos
 * 
 */

const validator = require('validator');

module.exports = {
    // Função para validar endereço de e-mail
    async validateEmail(email) {
        return validator.isEmail(email);
    },
}