//conexão com o banco de dados
const mysql = require("mysql2");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = (req,res) => {
  console.log(req.body);

  const { email, senha} = req.body;

  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hands_db",
    port: "3307"
  }); 

   db.query('SELECT * FROM tb_usuario WHERE email = ? AND senha = ?', [email, senha], (error, results)=>{
    if(error) {
      console.log(error);
    }else {
      console.log(results);
      if(results.length > 0) {
        // Se o usuário existir, redirecione para a página desejada
        return res.redirect('/index');
      } else {
        // Se o usuário não existir, renderize a página de login com uma mensagem
        return res.render('login', {
          message: "Usuario não encontrado"
        });
      }
    }
})
}
