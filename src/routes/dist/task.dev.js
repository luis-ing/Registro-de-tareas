"use strict";

var express = require('express');

var router = express.Router();

var pool = require('../database');

var _require = require('../lib/auth'),
    isLoggedIn = _require.isLoggedIn;

router.get('/add', isLoggedIn, function (req, res) {
  res.render('task/add');
});
router.post('/add', isLoggedIn, function _callee(req, res) {
  var _req$body, name_book, author, date_public, information, newLink;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //console.log(req.body);
          _req$body = req.body, name_book = _req$body.name_book, author = _req$body.author, date_public = _req$body.date_public, information = _req$body.information;
          newLink = {
            name_book: name_book,
            author: author,
            date_public: date_public,
            information: information,
            users_idusers: req.user.idusers
          }; //console.log(newLink);

          _context.next = 4;
          return regeneratorRuntime.awrap(pool.query('INSERT INTO favorite_books set ?', [newLink]));

        case 4:
          req.flash('success', 'Libro guardado correctamente');
          res.redirect('/task');

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/', isLoggedIn, function _callee2(req, res) {
  var task, hechos;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(pool.query('SELECT * FROM favorite_books WHERE information=1 AND users_idusers = ? ORDER BY name_book ASC', [req.user.idusers]));

        case 2:
          task = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(pool.query('SELECT * FROM favorite_books WHERE information=2 AND users_idusers = ?', [req.user.idusers]));

        case 5:
          hechos = _context2.sent;
          console.log(task);
          res.render('task/list', {
            task: task,
            hechos: hechos
          });

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/delete/:idbooks', isLoggedIn, function _callee3(req, res) {
  var idbooks;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          idbooks = req.params.idbooks;
          _context3.next = 3;
          return regeneratorRuntime.awrap(pool.query('DELETE FROM favorite_books WHERE idbooks = ?', [idbooks]));

        case 3:
          req.flash('success', 'Datos eliminados correctamente');
          res.redirect('/task');

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.get('/hecho/:idbooks', isLoggedIn, function _callee4(req, res) {
  var idbooks, _req$body$information, information, newLink;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          idbooks = req.params.idbooks;
          _req$body$information = req.body.information, information = _req$body$information === void 0 ? 2 : _req$body$information;
          newLink = {
            information: information
          };
          _context4.next = 5;
          return regeneratorRuntime.awrap(pool.query('UPDATE favorite_books set ? WHERE idbooks = ?', [newLink, idbooks]));

        case 5:
          req.flash('success', 'Cambios guardados correctamente');
          res.redirect('/task');

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.get('/edit/:idbooks', isLoggedIn, function _callee5(req, res) {
  var idbooks, task;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          idbooks = req.params.idbooks;
          _context5.next = 3;
          return regeneratorRuntime.awrap(pool.query('SELECT * FROM favorite_books WHERE idbooks = ?', [idbooks]));

        case 3:
          task = _context5.sent;
          res.render('task/edit', {
            link: task[0]
          });

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router.post('/edit/:idbooks', isLoggedIn, function _callee6(req, res) {
  var idbooks, _req$body2, name_book, author, date_public, information, newLink;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          idbooks = req.params.idbooks;
          _req$body2 = req.body, name_book = _req$body2.name_book, author = _req$body2.author, date_public = _req$body2.date_public, information = _req$body2.information;
          newLink = {
            name_book: name_book,
            author: author,
            date_public: date_public,
            information: information
          };
          _context6.next = 5;
          return regeneratorRuntime.awrap(pool.query('UPDATE favorite_books set ? WHERE idbooks = ?', [newLink, idbooks]));

        case 5:
          req.flash('success', 'Cambios guardados correctamente');
          res.redirect('/task');

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
});
module.exports = router;