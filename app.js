const express = require("express");
const path = require('path');
//Garantir que o servidor starte 
const mysql = require('mysql2');
const dotenv = require('dotenv');
const hbs = require('express-hbs/lib/hbs');
const axios = require('axios');

dotenv.config({path: './.env'});

const app = express();

//.env
/*const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});
*/

//banco conectado com os pc's da escola

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "hands_db",
  port: "3307"
}); 

//script
const scripthbsDirectory = path.join(__dirname, './script-hbs'); 
app.use(express.static(scripthbsDirectory)); 
 
//criada para acessar a pasta public e acessar seu diretório CSS
const publicDirectory = path.join(__dirname, './public'); //views // ./public
app.use(express.static(publicDirectory));


//imagens 
const imgDirectory = path.join(__dirname, './res');
app.use(express.static(imgDirectory));

//Verificação do captcha
app.post('/submit', async (req, res) => {
  const captchaResponse = req.body['g-recaptcha-response'];
  //const SECRET_KEY = '6LcW8X4pAAAAADqckeuBr1Xq32efz7aoBE2IWZnl';

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${captchaResponse}`;

  try {
    const response = await axios.post(verificationUrl);

    if (response.data.success) {
      // Se a verificação for bem-sucedida, armazene as informações no banco de dados.
      comments.push(req.body.comments);
      res.json({ success: true });
    } else {
      // Se a verificação falhar, envie uma resposta de erro.
      res.json({ success: false, message: "Captcha verification failed." });
    }
  } catch (error) {
    console.error(error);
  }
});
//analisar urls codificados enviados através do forms HTML
app.use(express.urlencoded({ extended: false }));
//garantindo que os valores do formulario venha em json
app.use(express.json());

app.set('view engine', 'hbs'),
//Caso detecte algum erro
db.connect((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Banco de Dados Conectado...");
      db.query("SELECT * from tb_usuario", (error, results) => {
        if (error) {
          console.log(error);
        } else {
          console.log(results);
        }
      });
    }
  });
  
  //Definir as rotas (Routes)

  app.use('/', require('./routes/pages'));
  app.use('/auth', require('./routes/auth'));

app.listen(5002, () => {
  console.log("Server startado na porta 5002");
})