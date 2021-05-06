"use strict";

var _require = require('timeago.js'),
    format = _require.format;

var helpers = {};

helpers.timeago = function (timestamp) {
  return format(timestamp);
};

module.exports = helpers;