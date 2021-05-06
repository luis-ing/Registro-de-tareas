"use strict";

var bcrypt = require('bcryptjs');

var helpers = {};

helpers.encryptPassword = function _callee(password) {
  var salt, hash;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 2:
          salt = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 5:
          hash = _context.sent;
          return _context.abrupt("return", hash);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

helpers.matchPassword = function _callee2(password, savedPassword) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(bcrypt.compare(password, savedPassword));

        case 3:
          return _context2.abrupt("return", _context2.sent);

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

module.exports = helpers;