const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../config/auth");
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/register", auth.isLoggedOut, (req, res) => {
  res.render("layouts/register");
});

router.post("/register", async (req, res) => {
  const exists = await User.exists({ username: req.body.username });

  if (exists) {
    res.redirect("/login");
    return;
  }
  pass = req.body.password;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(pass, salt, function (err, hash) {
      if (err) return next(err);

      const newAdmin = new User({
        username: req.body.username,
        password: hash,
      });

      newAdmin.save();

      res.redirect("/login");
    });
  });
});

router.get("/", auth.isLoggedIn, (req, res) => {
  res.render("layouts/index");
});

router.get("/", auth.isLoggedOut, (req, res) => {
  res.render("layouts/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?error=true",
  })
);

router.get("/login", auth.isLoggedOut, (req, res) => {
  res.render("layouts/login");
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
