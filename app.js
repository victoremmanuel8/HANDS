const express = require("express");
const req = require("./node_modules/req/node_modules/mime");
const path = require("path");
const mysql = require("mysql2");
const dotenv = require("dotenv");
require("dotenv").config();
const hbs = require("hbs");
const multer = require("multer");
//definindo o swiper
const Swiper = require("swiper/js/swiper.js").default;
const axios = require("axios"); //vê a utlidade futuramente
const fetch = require("fetch");
const { connSequelize, nmDB } = require("./src/config/bdConnection.js");
dotenv.config({ path: "./.env" });
const appBack = express();
const app = express();
// const { Query } = require('./Querys/QuerySelects.js');
const UsuarioRoutes = require("./src/routes/pages.js");
//const verificaAutenticacao = require('./src/middleware/Auth.js')
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const morgan = require("morgan");
const mongoose = require("mongoose");
//const video = require ('./src/assets/index.js')

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Sessão
app.use(
  session({
    secret: "hands",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

//Limpar Cache da navegação
app.use(function (req, res, next) {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

//Flash
app.use(flash());
//middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.use(morgan("dev"));

app.use(
  "/image",
  express.static(path.join(__dirname, "res/photo/profile/tmp"))
);

app.use("/files", express.static(path.resolve(__dirname, "./tmp/uploads")));

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

//mexendo com partials de eq
hbs.registerHelper("eq", function (a, b) {
  return a === b;
});

app.set("views", path.join(__dirname, "src/views"));

const scripthbsDirectory = path.join(__dirname, "src/script");
app.use(express.static(scripthbsDirectory));

//criada para acessar a pasta public e acessar seu diretório CSS
const publicDirectory = path.join(__dirname, "src/public"); //views // ./public
app.use(express.static(publicDirectory));

const videoDirectory = path.join(__dirname, "src/assets/video");
app.use(express.static(videoDirectory));
//imagens
const imgDirectory = path.join(__dirname, "./res");
app.use(express.static(imgDirectory));

const partialDirectory = path.join(__dirname, "src/views/partials");
app.use(express.static(partialDirectory));

//Verificação do captcha
app.post("/submit", async (req, res) => {
  const captchaResponse = req.body["g-recaptcha-response"];

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

app.set("view engine", "hbs"),
  // Conexão com o Sequelize
  connSequelize.sync();
connSequelize
  .authenticate()
  .then(() => {
    console.log(
      `Conexao bem sucedida do Sequelize com o MySQL de nome ${nmDB}`
    );
  })
  .catch((erroConn) => {
    console.error(
      `Incapaz de conectar-se ao banco MySQL de nome ${nmDB}`,
      erroConn
    );
  });

//rotas da consulta
appBack.use(express.json());

appBack.get("/usuario", (req, resp) => {});

appBack.put("/atualizar", (req, resp) => {});

appBack.delete("/delete", (req, resp) => {});

// Abaixo importei minhas rotas/caminhos criados e disse que minha aplicação web irá usá-los:
appBack.use("/prof", UsuarioRoutes);

//Definir as rotas (Routes)
app.use("/", require("./src/routes/pages.js"));
app.use("/auth", require("./src/routes/auth.js"));

//middleware
// app.use('/' , require('./src/middleware/auth.js'))
// app.use('/' , require('./src/middleware/index.js'))

app.listen(5000, async () => {
  console.log("Server startado na porta 5000");
});
