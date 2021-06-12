exports.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};

exports.isLoggedOut = function (req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect("/");
};
