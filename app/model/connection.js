/**
 * 
 * @author Marcio Santos
 * @version 0.1
 * @description Conexão e interações com o banco de dados
 * 
 */

const mysql = require('mysql2/promise');
const pools = {};

// Utilizando o método POOL para fazer as conexões
async function connectBank(){
    const host = 'localhost';
    const database = 'system_loopit';
    const user = 'root';
    const password = '12345';

    const key = `${host}_${database}_${user}_${password}`;
    if (!pools[key]) {
        pools[key] = mysql.createPool({
            host: host,
            database: database,
            user: user,
            password: password,
            waitForConnections: true,
            connectionLimit: 10 // qnt de conexões
        });
    }

    return pools[key];
}


module.exports = {
    // qualquer SELECT simples
    async Read(tabela, where){
        const pool = await connectBank(); //inicia conexão
        const [rows] = await pool.query(`SELECT * FROM ${tabela} WHERE ${where}`);
        
        return await rows[0];
    },

    // qualquer UPDATE simples
    async Update(table, set, where){
        if (!table || !set || !where) {
            console.log('Cuidado!, todos os parâmetros devem ser passados');
            return;
        }
        
        const pool = await connectBank(); //inicia conexão
        const sql = `UPDATE ${table} SET ? ${where}`;
        const [rows] = await pool.query(sql, [set]);

        return await rows[0];
    },

    // qualquer DELETE simples
    async Delete(table, where){
        if (!table || !where) {
            console.log('Cuidado!, todos os parâmetros devem ser passados');
            return;
        }
        
        const pool = await connectBank(); //inicia conexão
        const [rows] = await pool.query(`DELETE FROM ${table} WHERE ${where}`);

        return await rows;
    },


    // qualquer INSERT simples
    async Insert(table, data) {
        if (!table || !data) {
            console.log('Cuidado!, todos os parâmetros devem ser passados');
            return;
        }
    
        const pool = await connectBank(); //inicia conexão
        const columns = Object.keys(data).join(", ");
        const placeholders = Object.keys(data).map(() => '?').join(", ");
        const values = Object.values(data);
    
        const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
        // const sql = `INSERT INTO system_loopit.${table} (${columns}) VALUES (${placeholders})`;
    
        try {
            const [rows] = await pool.query(sql, values);
            return rows;
        } catch (error) {
            console.error("Erro ao inserir dados:", error);
        }
    },

    async ReadEmail(email){
        const pool = await connectBank(); //inicia conexão
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        return await rows[0];
    }
}