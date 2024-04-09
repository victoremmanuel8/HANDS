const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'hands_db'
});

app.post('/cadastro', (req, res) => {
  const usuario = { ...req.body };
  db.query('INSERT INTO tb_usuario SET ?', usuario, (error, results) => {
    if (error) throw error;
    res.send('usuario registered successfully.');
  });
});

app.post('/login', (req, res) => {
  const { usuarioname, password } = req.body;
  db.query('SELECT * FROM tb_usuario WHERE email = ? AND senha = ?', [email, senha], (error, results) => {
    if (error) throw error;
    res.send(results.length > 0 ? 'Logged in successfully.' : 'Invalid credentials.');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
