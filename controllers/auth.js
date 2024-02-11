//conexão com o banco de dados
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

exports.register = (req,res) => {
  console.log(req.body);

  const { nome, email, senha, ConfirmarSenha } = req.body;


  db.query('SELECT  email FROM users WHERE email = ?', [email], async (error, results) => {
    if(error) {
      console.log(error);
    }
    if (results.length > 0) {
      return res.render('teste', { //pagina do formulario 
        message: "Este email já está em uso"
      }) 
    }else if( senha !== ConfirmarSenha) {
      return res.render('teste', {
        message: "As senhas não correspondem"
      });
    }
    let hashedPassword = await bcrypt.hash(senha, 8);
    console.log(hashedPassword);

   db.query('INSERT INTO users SET ?', {nm_nome: nome, email: email, senha: hashedPassword}, (eror, results)=>{
      if(error){
        cosnole.log(error);
      }else {
        console.log(results);87
        return res.render('teste', {
          message: "Usuario registrado"
        });
      }
   })
  });
}