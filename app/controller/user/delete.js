/**
 * 
 * @author Marcio Santos
 * @version 0.1
 * @description Responsavel por remover registro do usuario
 * 
 */


const express           = require('express');
const router            = express.Router();
const md5               = require('md5');
const { validateEmail } = require('../../helper/system_helper')
const { ReadUser, Delete } = require('../../model/connection')


/* INICIO : REMOVENDO REGISTRO DE USUARIOS */
router.delete('/user/delete', async (req, res) =>{
    const { userID } = req.body

    if(!userID){
        return res.sendStatus(400)
    }

    //Buscando usuario
    const Usuario = await ReadUser(userID)
    if(!Usuario){
        return res.status(200).json({ status: false, info: "Usuário removido com sucesso." })
    }

    //removendo registro de usuario
    const removeUser = await Delete('users', `id = ${userID}`)
    
    //verificando se registro foi removido
    if(!removeUser?.affectedRows){
        return res.status(200).json({ status: false, info: `Ocorreu um erro ao remover ${Usuario?.name ? Usuario?.name : 'usuário'}.` })
    };
    
    //criando resposta para usuario final
    return res.status(200).json({ status: true, info: `${Usuario?.name ? Usuario?.name : 'Usuário'} removido com sucesso.` })
});
/* FINAL : REMOVENDO REGISTRO DE USUARIOS */


module.exports = router