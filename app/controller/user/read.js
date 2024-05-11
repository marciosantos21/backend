/**
 * 
 * @author Marcio Santos
 * @version 0.1
 * @description Responsavel por listar 1 ou + registros
 * 
 */


const express           = require('express');
const router            = express.Router();
const md5               = require('md5');
const { validateEmail } = require('../../helper/system_helper')
const { ReadUser, ReadAllUser } = require('../../model/connection')


/* INICIO : LISTAGEM DOS USUARIOS */
router.post('/user/read', async (req, res) =>{
    const { userID } = req.body

    if (!userID || !Array.isArray(userID)) {
        return res.status(400).json({ error: 'A entrada deve ser um array.' });
    }

    let UserData
    if(!userID[0]){
        //Buscando todos usuarios
        const Usuario = await ReadAllUser()
        if(!Usuario || !Usuario[0]){
            return res.status(404).json({ status: false, info: "Nenhum usuário encontrado." })
        }

        UserData = Usuario
    }else if(!userID[1]){
        //Buscando usuario unico
        const Usuario = await ReadUser(userID)
        if(!Usuario){
            return res.status(404).json({ status: false, info: "Nenhum usuário encontrado." })
        }

        UserData = Array(Usuario)
    }else{
        let Usuario = []
        for(const id of userID){
            const dados = await ReadUser(id)
            if(dados){
                const exists = Usuario.some(user => user.id === dados.id);
                if(!exists){
                    Usuario.push(dados)
                }
            }
        }

        if(!Usuario[0]){
            return res.status(404).json({ status: false, info: "Nenhum usuário encontrado." })
        }

        UserData = Usuario
    }
    
    //verificando se existe algum registro
    if(!UserData){
        return res.status(404).json({ status: false, info: `Nenhum usuário encontrado` })
    };
    
    //criando resposta para usuario final
    return res.status(200).json({ status: true, data: UserData, info: `Listagem executada com sucesso.` })
});
/* FINAL : LISTAGEM DOS USUARIOS */


module.exports = router