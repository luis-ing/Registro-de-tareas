"use strict";

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var pool = require('../database');

var helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function _callee(req, email, password, done) {
  var rows, user, validPassword;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(pool.query('SELECT * FROM users WHERE email = ?', [email]));

        case 2:
          rows = _context.sent;

          if (!(rows.length > 0)) {
            _context.next = 11;
            break;
          }

          user = rows[0];
          _context.next = 7;
          return regeneratorRuntime.awrap(helpers.matchPassword(password, user.password));

        case 7:
          validPassword = _context.sent;

          if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.email));
          } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
          }

          _context.next = 12;
          break;

        case 11:
          return _context.abrupt("return", done(null, false, req.flash('message', 'Correo invalido.')));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
}));
passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function _callee2(req, email, password, done) {
  var _req$body, name, last_name, country, phone, newUser, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, last_name = _req$body.last_name, country = _req$body.country, phone = _req$body.phone;
          newUser = {
            email: email,
            name: name,
            last_name: last_name,
            country: country,
            phone: phone,
            password: password
          };
          _context2.next = 4;
          return regeneratorRuntime.awrap(helpers.encryptPassword(password));

        case 4:
          newUser.password = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(pool.query('INSERT INTO users SET ?', [newUser]));

        case 7:
          result = _context2.sent;
          newUser.idusers = result.insertId;
          return _context2.abrupt("return", done(null, newUser));

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
}));
passport.serializeUser(function (user, done) {
  done(null, user.idusers);
});
passport.deserializeUser(function _callee3(idusers, done) {
  var rows;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(pool.query('SELECT * FROM users WHERE idusers = ?', [idusers]));

        case 2:
          rows = _context3.sent;
          done(null, rows[0]);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});