module.exports = function (req, res, next) {
  if (req.session.user && req.session.userId) {
      res.locals.userStatus = {
          login: true,
          uid: req.session.userId,
          profileURL: req.session.user.profileURL
      };
  } else {
      res.locals.userStatus = {
          login: false,
      };
  }
  next();
};
