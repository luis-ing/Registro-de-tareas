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
  var now, _req$body, name_task, _req$body$date_public, date_public, _req$body$date_final, date_final, _req$body$status, status, newLink;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //console.log(req.body);
          now = new Date();
          _req$body = req.body, name_task = _req$body.name_task, _req$body$date_public = _req$body.date_public, date_public = _req$body$date_public === void 0 ? now : _req$body$date_public, _req$body$date_final = _req$body.date_final, date_final = _req$body$date_final === void 0 ? now : _req$body$date_final, _req$body$status = _req$body.status, status = _req$body$status === void 0 ? 1 : _req$body$status;
          newLink = {
            name_task: name_task,
            date_public: date_public,
            date_final: date_final,
            status: status,
            users_idusers: req.user.idusers
          }; //console.log(newLink);

          _context.next = 5;
          return regeneratorRuntime.awrap(pool.query('INSERT INTO task_table set ?', [newLink]));

        case 5:
          req.flash('success', 'Libro guardado correctamente');
          res.redirect('/task');

        case 7:
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
          return regeneratorRuntime.awrap(pool.query('SELECT * FROM task_table WHERE status=1 AND users_idusers = ? ORDER BY name_task ASC', [req.user.idusers]));

        case 2:
          task = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(pool.query('SELECT TIMESTAMPDIFF (MINUTE, date_public, date_final) AS minutos, TIMESTAMPDIFF (HOUR, date_public, date_final) AS horas, TIMESTAMPDIFF (DAY, date_public, date_final) AS dias, name_task, date_public, date_final FROM task_table WHERE status=2 AND users_idusers = ? ORDER BY name_task ASC', [req.user.idusers]));

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
router.get('/delete/:idtask', isLoggedIn, function _callee3(req, res) {
  var idtask;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          idtask = req.params.idtask;
          _context3.next = 3;
          return regeneratorRuntime.awrap(pool.query('DELETE FROM task_table WHERE idtask = ?', [idtask]));

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
router.get('/realizado/:idtask', isLoggedIn, function _callee4(req, res) {
  var now, idtask, _req$body2, _req$body2$status, status, _req$body2$date_final, date_final, newLink;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          now = new Date();
          idtask = req.params.idtask;
          _req$body2 = req.body, _req$body2$status = _req$body2.status, status = _req$body2$status === void 0 ? 2 : _req$body2$status, _req$body2$date_final = _req$body2.date_final, date_final = _req$body2$date_final === void 0 ? now : _req$body2$date_final;
          newLink = {
            date_final: date_final,
            status: status
          };
          _context4.next = 6;
          return regeneratorRuntime.awrap(pool.query('UPDATE task_table set ? WHERE idtask = ?', [newLink, idtask]));

        case 6:
          req.flash('success', 'Cambios guardados correctamente');
          res.redirect('/task');

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.get('/edit/:idtask', isLoggedIn, function _callee5(req, res) {
  var idtask, task;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          idtask = req.params.idtask;
          _context5.next = 3;
          return regeneratorRuntime.awrap(pool.query('SELECT * FROM task_table WHERE idtask = ?', [idtask]));

        case 3:
          task = _context5.sent;
          res.render('task/edit', {
            task: task[0]
          });

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router.post('/edit/:idtask', isLoggedIn, function _callee6(req, res) {
  var idtask, name_task, newLink;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          idtask = req.params.idtask;
          name_task = req.body.name_task;
          newLink = {
            name_task: name_task
          };
          _context6.next = 5;
          return regeneratorRuntime.awrap(pool.query('UPDATE task_table set ? WHERE idtask = ?', [newLink, idtask]));

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