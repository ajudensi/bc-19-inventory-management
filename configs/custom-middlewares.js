const express = require('express');


function isAuthenticated(req, res, next) {
  if (req.session.role && req.session.email && req.session.password) {
    return next();
  }
  res.redirect('/login');
}

function isNotAdminOrSuper(req, res, next) {
  if (req.session.role === 'super' || req.session.role === 'admin') {
    return next();
  }
  res.redirect('/');
}

function isNotSuper(req, res, next) {
  if (req.session.role === 'super') {
    return next();
  }
  res.redirect('/');
}


module.exports = [isAuthenticated, isNotAdminOrSuper, isNotSuper];
