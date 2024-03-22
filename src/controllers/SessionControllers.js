const jwt = require('jsonwebtoken'); // Certifique-se de importar o módulo 'jsonwebtoken'

class SessionController {
    index(req, res) {
        const { tipo } = req.body;

        if (tipo === 'admin') {
            // Crie um token para o usuário admin
            const adminToken = jwt.sign({ tipo: 'admin' }, 'chave_secreta', {
                expiresIn: '1h', // Defina o tempo de expiração do token
            });

            return res.status(200).json({ token: adminToken });
        }

        if (tipo === 'user') {
            // Crie um token para o usuário comum
            const userToken = jwt.sign({ tipo: 'user' }, 'chave_secreta', {
                expiresIn: '1h',
            });

            return res.status(200).json({ token: userToken });
        }

        // Caso o tipo não seja 'admin' nem 'user'
        return res.status(400).json({ message: 'Tipo inválido' });
    }
}

module.exports = new SessionController();
