require('dotenv').config();
const express = require('express');
const [fireApp, fireUserRef] = require('../configs/firebaseconfigs.js');

const fireAuth = fireApp.auth();
const router = express.Router();

router.get('/', (req, res) => {
  if (!(req.session) || (req.session.role !== 'super')) {
    res.redirect('/');
  } else {
    res.render('register-admin', {
      title: 'Register a new admin',
    });
  }
});

router.post('/', (req, res) => {
  const reqData = req.body;
  const email = reqData.email;
  const password = reqData.password;
  const username = reqData.username;
  fireAuth.createUserWithEmailAndPassword(email, password).then((user) => {
    fireUserRef.child(user.uid).set({
      email: email,
      role: 'admin',
      username: username,
      addedBy: req.session.email,
    }).then(() => {
      user.sendEmailVerification().then(() => {
        res.render('register-admin', {
          title: 'Register a new Admin',
          status: 'User created as admin and password verification sent',
        });
      }).catch((error) => {
        res.render('register-admin', {
          title: 'Register a new Admin',
          status: error,
        });
      });
    }).catch((error) => {
      res.render('register-admin', {
        title: 'Register a new Admin',
        status: error,
      });
    });
  }).catch((error) => {
    res.render('register-admin', {
      title: 'Register a new Admin',
      status: error,
    });
  });
});

module.exports = router;
