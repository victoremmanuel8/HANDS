//conexão com o banco de dados
const mysql = require("mysql2");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = (req,res) => {
  console.log(req.body);

  const { nome, sobrenome, email, cpf, senha, ConfirmarSenha, dt_nascimento, tp_usuario} = req.body;

  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hands_db",
    port: "3307"
  }); 


    db.query('SELECT email FROM tb_usuario WHERE email = ?', [email], async (error, results) => {
    if(error) {
      console.log(error);
    }
    if (results.length > 0) {
      return res.render('cadastro', { //pagina do formulario 
        message: "Este email já está em uso"
      }) 
    }else if( senha !== ConfirmarSenha) {
      return res.render('cadastro', {
        message: "As senhas não correspondem"
      });
    }
    let hashedPassword = await bcrypt.hash(senha, 8);
    console.log(hashedPassword);

    bcrypt.compare(senha, hashedPassword)

   db.query('INSERT INTO tb_usuario SET ?', {nm_nome: nome, nm_sobrenome: sobrenome, email: email, cd_cpf: cpf, senha: hashedPassword, dt_nascimento: dt_nascimento, tp_usuario: tp_usuario}, (error, results)=>{
      if(error){
        console.log(error);
      }else {
        console.log(results);
        return res.render('cadastro', {
          message: "Usuario registrado"
        });
      }
   })
  });
}