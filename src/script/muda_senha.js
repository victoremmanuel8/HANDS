const bcrypt = require('bcrypt');

app.post('/muda_senha', async (req, res) => {
  const { senhaAtual, novaSenha } = req.body;

  // Verificar se a senha atual está correta
  const usuario = await Usuario.findOne({ email: req.user.email });
  if (!usuario || !(await bcrypt.compare(senhaAtual, usuario.senha))) {
    return res.status(400).send('Senha atual incorreta');
  }

  // Verificar se a nova senha atende aos requisitos de segurança
  const senhaSeguraRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,}$/;
  if (!senhaSeguraRegex.test(novaSenha)) {
    return res.status(400).send('A nova senha não atende aos requisitos de segurança.');
  }

  // Hash da nova senha
  const hashedNovaSenha = await bcrypt.hash(novaSenha, 10);

  // Atualize a senha no banco de dados
  usuario.senha = hashedNovaSenha;
  await usuario.save();

  // Responda ao cliente
  res.send('Senha atualizada com sucesso!');
});
