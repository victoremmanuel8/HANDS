const express = require("express");
const path = require('path');
const https = require("https");
const fs = require("fs")
//Garantir que o servidor starte 
const mysql = require('mysql2');
const dotenv = require('dotenv');
const hbs = require('express-hbs/lib/hbs');
const multer = require('multer');
//definindo o swiper
const Swiper = require('swiper/js/swiper.js').default;
const axios = require('axios'); //vê a utlidade futuramente
const { connSequelize, nmDB } = require('../config/bdConnection.js');
dotenv.config({path: './.env'});
const appBack = express()  
const app = express();
// const { Query } = require('./Querys/QuerySelects.js');
const UsuarioRoutes = require('./routes/pages.js')
//const verificaAutenticacao = require('./src/middleware/Auth.js')
const cookieParser = require('cookie-parser')
const session = require("express-session")
const flash = require("connect-flash");
const morgan = require("morgan")
const mongoose = require("mongoose");
//const video = require ('./src/assets/index.js')

mongoose.connect("mongodb://localhost:27017/hands_db", {
  useNewUrlParser: true,
  });

  const privateKey = fs.readFileSync('server.key', 'utf8'); 
const certificate = fs.readFileSync('server.crt');

const passphrase = 'hands'; // Substitua 'sua_senha_da_chave' pela senha real da sua chave

const https_server = https.createServer({ key: privateKey, cert: certificate, passphrase: passphrase }, app);

//Sessão
app.use(session({
  secret: 'hands',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 2300 }
}))

//Flash
app.use(flash())
//middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg - req.flash("error_msg")
    next()
})

app.use(morgan('dev'))

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

app.set('views', path.join(__dirname, 'views'));

const scripthbsDirectory = path.join(__dirname, 'src/script-hbs'); 
app.use(express.static(scripthbsDirectory)); 
 
//criada para acessar a pasta public e acessar seu diretório CSS
const publicDirectory = path.join(__dirname, 'css'); //views // ./public
app.use(express.static(publicDirectory));

const videoDirectory = path.join(__dirname, 'src/assets/video');
app.use(express.static(videoDirectory))
//imagens 
const imgDirectory = path.join(__dirname, './res');
app.use(express.static(imgDirectory));

const partialDirectory = path.join(__dirname, 'src/views/partials')
app.use(express.static(partialDirectory))

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

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


 // Conexão com o Sequelize
connSequelize.sync()
connSequelize.authenticate().then(() => {
    console.log(`Conexao bem sucedida do Sequelize com o MySQL de nome ${nmDB}`)
}).catch(erroConn => {
    console.error(`Incapaz de conectar-se ao banco MySQL de nome ${nmDB}`, erroConn)
})

  //rotas da consulta 
  appBack.use(express.json())

  appBack.get('/usuario', (req, resp) => {
})

appBack.put('/atualizar', (req, resp) => {

})

appBack.delete('/delete', (req, resp) => {
})

// Abaixo importei minhas rotas/caminhos criados e disse que minha aplicação web irá usá-los:
appBack.use('/prof', UsuarioRoutes)


  //Definir as rotas (Routes)
  app.use('/', require('./routes/pages.js'));
 app.use('/auth', require('./routes/auth.js'));

 https_server.listen(5000, async () => {
  console.log("Server startado na porta 5000 (HTTPS)");
});


