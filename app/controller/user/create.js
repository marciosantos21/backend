/**
 * 
 * @author Marcio Santos
 * @version 0.1
 * @description Conexão e interações com o banco de dados
 * 
 */

const express           = require('express');
const router            = express.Router();
const md5               = require('md5');
const { validateEmail } = require('../../helper/system_helper')
const { ReadEmail, Insert } = require('../../model/connection')


/* INICIO : CRIANDO REGISTRO DE USUARIOS */
router.post('/create', async (req, res) =>{

    const { name, email, password } = req.body

    if(!name || !email || !password){
        return res.sendStatus(400)
    }

    //Verifica se email existe na base de dados
    if(await ReadEmail(email)){
        return res.status(200).send({ status: false, info: "Desculpe, o email fornecido já está em uso. Por favor, escolha outro email." })
    }

    //verifica se email é valido
    if(!await validateEmail(email)){
        return res.status(200).send({ status: false, info: "Informe um email válido." })
    }

    //configurando dados para a inserção
    const dadosInfo = {
        name: name,
        email: email,
        password: md5(password)
    }

    //criando novo registro de usuario
    const newUser = await Insert('users', dadosInfo);

    //verificando se registro realemente foi criado
    if(!newUser?.insertId){
        return res.status(200).send({ status: false, info: `Ocorreu um erro ao registrar ${name}.` })
    };
    
    //criando resposta para usuario final
    return res.status(200).send({ status: true, info: `${name} adicionado com sucesso.` })
});
/* FINAL : CRIANDO REGISTRO DE USUARIOS */


module.exports = router