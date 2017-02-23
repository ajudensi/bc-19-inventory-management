require('dotenv').config();
const express = require('express');
const [fireApp, fireUserRef] = require('../configs/firebaseconfigs.js');

const router = express.Router();

const fireAuth = fireApp.auth();
const fireCurrentUser = fireAuth.currentUser;


let sess = { email: '', password: '', role: '' };

router.get('/', (req, res) => {
  let isLoggedIn;
  sess = req.session;
  let authStatus;

  (function checkLogin() {
    if (!(sess.email) && !(sess.role)) {
      authStatus = 'Guest. You are not logged in';
      isLoggedIn = false;
    } else {
      authStatus = `${sess.role}`;
      isLoggedIn = true;
    }
    res.render('index', { title: 'I-Manager', status: authStatus, isLoggedIn });
  }());
});

router.get('/login', (req, res) => {
  if (sess.email || sess.role) res.redirect('/');
  res.render('login', {
    title: 'Login',
    status: fireCurrentUser || 'Not logged in',
  });
});

router.post('/login', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const reqData = req.body;
  fireAuth.signInWithEmailAndPassword(reqData.email, reqData.password).then((user) => {
    fireUserRef.child(user.uid).on('value', (snapshot) => {
      sess = req.session;
      sess.role = snapshot.val().role;
      sess.email = user.email;
      sess.password = user.password;
      res.redirect('/');
    });
  }).catch((error) => {
    res.render('login', { title: 'Login error', status: error.message });
  });
});


router.get('/register', (req, res) => {
  if (sess.email || sess.role) {
    res.redirect('/');
  } else {
    res.render('register', { title: 'Register' });
  }
});

router.post('/register', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const reqData = req.body;
  fireAuth.createUserWithEmailAndPassword(reqData.email, reqData.password).then((user) => {
    fireUserRef.child(user.uid).set({
      email: reqData.email,
      username: reqData.username,
      role: 'regular',
    }).then(() => {
      user.sendEmailVerification().then(() => {
        res.render('register', {
          title: `Registration success ${user.email}`,
          status: `Account registered. \n Verify this email address. ${reqData.email}`,
        });
      });
    }).catch((error) => {
      res.render('register', {
        title: 'Registration error',
        status: error.message,
      });
    });
  }).catch((error) => {
    res.render('register', {
      title: 'Registration error',
      status: error.message,
    });
  });
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        res.end(error);
      } else {
        res.redirect('/');
      }
    });
  }
});

module.exports = router;
