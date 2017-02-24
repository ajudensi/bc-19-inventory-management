require('dotenv').config();
const firebase = require('firebase');
const nodemailer = require('nodemailer');

const config = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DB_URL,
  messagingSenderId: process.env.FB_MSG_ID,
};

const fireApp = firebase.initializeApp(config);
const fireUserRef = fireApp.database().ref('users');
const fireAssetsRef = fireApp.database().ref('assets');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ADDRR,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const iManagerMailer = function iManagerMailer(from, to, subject, text, html) {
  let mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
};


// send mail with defined transport object


module.exports = [fireApp, fireUserRef, fireAssetsRef, iManagerMailer];
