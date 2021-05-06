"use strict";

var express = require('express');

var router = express.Router();

var passport = require('passport');

var _require = require('../lib/auth'),
    isLoggedIn = _require.isLoggedIn,
    isNotLoggedIn = _require.isNotLoggedIn; // REGISTRO


router.get('/signup', isNotLoggedIn, function (req, res) {
  res.render('auth/signup');
});
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
})); // INGRESAR

router.get('/signin', isNotLoggedIn, function (req, res) {
  res.render('auth/signin');
});
router.post('/signin', isNotLoggedIn, function (req, res, next) {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});
router.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile');
});
router.get('/logout', function (req, res) {
  req.logOut();
  res.redirect('/signin');
});
module.exports = router;