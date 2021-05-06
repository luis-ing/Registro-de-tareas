"use strict";

module.exports = {
  isLoggedIn: function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    return res.redirect('/signin');
  },
  isNotLoggedIn: function isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }

    return res.redirect('/profile');
  }
};