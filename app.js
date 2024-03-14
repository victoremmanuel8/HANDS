const express = require("express");
const path = require('path');
const session = require('express-session');
//Garantir que o servidor starte 
const mysql = require('mysql2');
const dotenv = require('dotenv');
const hbs = require('express-hbs/lib/hbs');
//definindo o swiper
const Swiper = require('swiper/js/swiper.js').default;
const axios = require('axios');
const { connSequelize, nmDB } = require('./config/bdConnection');
dotenv.config({path: './.env'});
const appBack = express()  
const app = express();
const { runQuery } = require('./Querys/QuerySelects.js');



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

  
//sessions
/*
app.use(session({
  secret: '5480909043209',
  resave: false,
  saveUninitialized: false,
}));
*/

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

    console.log('Msg aparece no console Node caso eu use essa rota!')
    resp.send(`
        <div id="conteudo-pagina" style="font-family: monospace;" >
            <h1>Página-Zero</h1>
            <p>Olhe, uma proto-página no ínicio do meu ~site~.</p>
        </div>
    `)

})

// Abaixo importei minhas rotas/caminhos criados e disse que minha aplicação web irá usá-los:
const usuarioRoutes = require('./routes/pages.js')
appBack.use('/usuario', usuarioRoutes)


  //Definir as rotas (Routes)
  app.use('/', require('./routes/pages'));
  app.use('/auth', require('./routes/auth'));

  app.listen(5000, async () => {
    console.log("Server startado na porta 5000");
  
    // Executando a consulta e imprimindo o resultado no terminal
    try {
      let resultBusca = await runQuery();
      console.log(resultBusca);
    } catch (error) {
      console.error('Erro ao executar a consulta:', error);
    }
  });


