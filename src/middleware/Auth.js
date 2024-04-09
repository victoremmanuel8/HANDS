const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const cookieParser = require('cookie-parser');
const { tb_usuario } = require('../controllers/authlogin');
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});


app.use(express.json()); // para parsing de application/json

// Rota de login
app.post('/login', async (req, res) => {
  // Buscar o usuário com base no nome de usuário e senha
  const usuario = await tb_usuario(req.body.email, req.body.senha);

  // Se o usuário não existir, envie uma resposta de erro
  if (!usuario) {
    return res.status(401).send('Não autorizado');
  }

  // Se o usuário existir, crie um token com base no ID do usuário
  const token = jwt.sign({ id: usuario.id }, 'JANX7AWB12BAKX');

 res.cookie('token', token, { httpOnly: true});

  // Envie uma resposta de sucesso
  res.json({ token });
});

// Middleware de autenticação
module.exports = async function verificaAutenticacao(req, res, next) {
  // Pegue o token do cookie
  const token = req.cookies['token'];

  try {
    // Verifique o token
    const dados = jwt.verify(token, 'JANX7AWB12BAKX');

    // Buscar o usuário com base no ID no token
    const usuario = await tb_usuario(dados.id);

    // Se o usuário não existir, envie uma resposta de erro
    if (!usuario) {
      return res.status(401).send('Não autorizado');
    }

    // Se o usuário existir, anexe-o ao objeto de solicitação e chame 'next' para continuar para a próxima função de middleware ou rota
    req.usuario = usuario;
    next();
  } catch (erro) {
    // Se houver um erro ao verificar o token, envie uma resposta de erro
    res.status(500).send('Erro ao verificar autenticação');
  }
}

app.post('cadastro', (req, res) => {
  const { token } = req.body; // Token de acesso retornado pelo Google
  
  // Decodificar o token para obter as informações do usuário
  const userData = jwt_decode(token);

  // Armazenar as informações do usuário no banco de dados MySQL
  const {email, senha } = userData;
  const sql = `INSERT INTO usuarios (email, senha) VALUES ('${email}', '${senha}')`;
  
  connection.query(sql, (error, results, fields) => {
      if (error) {
          console.error('Erro ao cadastrar usuário no banco de dados: ' + error);
          return res.status(500).send('Erro ao cadastrar usuário');
      }
      console.log('Usuário cadastrado com sucesso no banco de dados');
      res.status(200).send('Usuário cadastrado com sucesso');
  });
});

