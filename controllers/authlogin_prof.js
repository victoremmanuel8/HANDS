//conexão com o banco de dados
const mysql = require("mysql2");
const db = require('../app.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = (req,res) => {
  console.log(req.body);

  const { email, cpf, senha} = req.body;

    db.query('SELECT * FROM tb_profissional WHERE email = ? AND cd_cpf = ?', [email, cpf], async (error, results)=>{
    if(error) {
      console.log(error);
    } else {
      console.log(results);
      if(results.length > 0) {
        const compare = await bcrypt.compare(senha, results[0].senha);
        //comparar a senha criptografada com a forncecida pelo usuario
        if(compare) {
          return res.redirect('/index');
        } else {
          return res.render('login', {
            message: "Senha incorreta"
          });
        }
      } else {
        return res.render('login', {
          message: "Usuario não encontrado"
        });
      }
    }
  })
  }
  