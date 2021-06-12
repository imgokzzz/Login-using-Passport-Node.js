const mongoose = require("mongoose");
const passport = require("passport");
var localStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const user = require("../models/user");
const bcrypt = require("bcrypt");

passport.use(
  new localStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);

      bcrypt.compare(password, user.password, function (err, res) {
        if (err) return done(err);
        if (res === false) return done(null, false);

        return done(null, user);
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
