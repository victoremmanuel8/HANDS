const express = require("express");
const path = require('path');
//Garantir que o servidor starte 
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const app = express();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

//criada para acessar a pasta public e acessar seu diretório 
const publicDirectory = path.join(__dirname, './public'); //views // ./public
app.use(express.static(publicDirectory));

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
      db.query("SELECT * from users", (error, results) => {
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