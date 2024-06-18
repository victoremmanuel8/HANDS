// utils/userStatusChecker.js
module.exports = function (req, res, next) {
  if (req.session.user && req.session.userId) {
      // Usuário está logado
      res.locals.userStatus = {
          login: true,
          uid: req.session.userId,
          profileURL: req.session.user.profileURL, // Assumindo que você armazena a URL do perfil na sessão
      };
  } else {
      // Usuário não está logado
      res.locals.userStatus = {
          login: false,
      };
  }
  next();
};
