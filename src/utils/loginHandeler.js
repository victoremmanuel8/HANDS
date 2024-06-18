module.exports.isLogin = (req, res, next) => {
  if (req.session.user || req.session.prof) {
    return next();
  } else {
    req.flash('error', 'You need to log in to perform this action');
    res.redirect('/');
  }
};
