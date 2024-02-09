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
const publicDirectory = path.join(__dirname, './www'); //vi
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs'),
//Caso detecte algum erro
db.connect((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Banco de Dados Conectado...");
      db.query("SELECT * from usuario", (error, results) => {
        if (error) {
          console.log(error);
        } else {
          console.log(results);
        }
      });
    }
  });
  

app.get("/", (req, res) => {
  //res.send("<h1>Pagina-Inicial</h1>")
  res.render("index") //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

app.listen(5002, () => {
  console.log("Server startado na porta 5001");
})