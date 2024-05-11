/**
 * 
 * @author Marcio Santos
 * @version 0.1
 * @description Responsavel fazer login de usuario
 * 
 */

const express           = require('express');
const router            = express.Router();
const md5               = require('md5');
const { AuthLogin }     = require('../../model/connection')


/* INICIO : AUTENTICANDO USUARIO */
router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body

    if(!email || !password){
        return res.sendStatus(400)
    }

    //Verificao de login
    const Login = await AuthLogin(email, md5(password))
    if(!Login){
        return res.status(404).json({ status: false, info: "Credenciais incorretas. Por favor, verifique seu e-mail e senha e tente novamente." })
    }
    
    //criando resposta para usuario final
    return res.status(200).json({ status: true, data: Login, info: `Olá${Login?.name ? ` ${Login.name}` : ''}, seja bem vindo.` })
});
/* FINAL : AUTENTICANDO USUARIO */


module.exports = router