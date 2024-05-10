/**
 * 
 * @author Marcio Santos
 * @version 0.1
 * @description Responsavel por alterar dados do usuario
 * 
 */


const express           = require('express');
const router            = express.Router();
const md5               = require('md5');
const { validateEmail } = require('../../helper/system_helper')
const { ReadUser, DistinctEmail, Update } = require('../../model/connection')


/* INICIO : ALTERANDO REGISTRO DE USUARIOS */
router.put('/user/update', async (req, res) =>{

    const { userID, name, email, password } = req.body

    if(!userID || !name || !email || !password){
        return res.sendStatus(400)
    }

    //Buscando usuario
    if(!await ReadUser(userID)){
        return res.status(200).send({ status: false, info: "Usuário não encontrado no sistema." })
    }

    //Verifica se email existe na base de dados
    if(await DistinctEmail(userID, email)){
        return res.status(200).send({ status: false, info: "Desculpe, o email fornecido já está em uso. Por favor, escolha outro email." })
    }

    //verifica se email é valido
    if(!await validateEmail(email)){
        return res.status(200).send({ status: false, info: "Informe um email válido." })
    }

    //configurando dados para o update
    const dadosInfo = {
        name: name,
        email: email,
        password: md5(password)
    }

    //criando novo registro de usuario
    const updateUser = await Update('users', dadosInfo, `id = ${userID}`);

    //verificando se registro foi alterado
    if(!updateUser?.affectedRows){
        return res.status(200).send({ status: false, info: `Ocorreu um erro ao atualizar ${name}.` })
    };
    
    //criando resposta para usuario final
    return res.status(200).send({ status: true, info: `${name} alterado com sucesso.` })
});
/* FINAL : ALTERANDO REGISTRO DE USUARIOS */


module.exports = router