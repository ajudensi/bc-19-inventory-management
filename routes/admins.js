require('dotenv').config();
const express = require('express');
const [fireApp, fireUserRef, , iManagerMailer] = require('../configs/firebaseconfigs.js');
const [isAuthenticated, isNotAdminOrSuper, isNotSuper] = require('../configs/custom-middlewares.js');

const fireAuth = fireApp.auth();
const router = express.Router();

router.get('/', isNotSuper, (req, res) => {
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
        iManagerMailer('I-Manager', 'support@i-manager.com', 'New account registration', `A new account on I-Manager has been opened with this email. Your password is ${password}, and username ${username}`);
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
