require('dotenv').config();
const express = require('express');
const [fireApp, fireUserRef, fireAssetsRef, iManagerMailer] = require('../configs/firebaseconfigs.js');
const [isAuthenticated, isNotAdminOrSuper, isNotSuper] = require('../configs/custom-middlewares.js');

const router = express.Router();

router.get('/', isAuthenticated, (req, res) => {
  fireApp.auth().signInWithEmailAndPassword(req.session.email, req.session.password).then(() => {
    fireAssetsRef.on('value', (snapshot) => {
      const allAssets = [];
      snapshot.forEach((childSnapshot) => {
        const eachAsset = [
          childSnapshot.val().name,
          childSnapshot.val().description,
          childSnapshot.val().dateBought,
          childSnapshot.key,
          childSnapshot.val().serialNumber,
          childSnapshot.val().dataAdded,
        ];
        allAssets.push(eachAsset);
      });
      res.render('assets', {
        title: 'View available assets',
        status: 'all is well',
        assets: allAssets,
      });
    }, (error) => {
      res.send(error);
    });
  }).catch((error) => {
    res.send(error);
  });
});

router.get('/add-assets', isNotAdminOrSuper, (req, res) => {
  res.render('add-assets', {
    title: 'Add a new asset',
    status: 'all is well',
  });
});

router.post('/add-assets', (req, res) => {
  const data = req.body;
  const asset = {
    name: data.name,
    description: data.description,
    serialNumber: data.serialNumber,
    andelaSerialCode: data.andelaSerialCode,
    dateBought: data.date,
    dateAdded: Date.now(),
  };
  fireAssetsRef.child(asset.andelaSerialCode).set(asset).then(() => {
    res.render('add-assets', {
      title: 'Add new assets',
      status: 'Item added sucessfully',
    });
  }).catch((error) => {
    res.render('add-assets', {
      title: 'Add new assets',
      status: error,
    });
  });
});

router.get('/assigned', isAuthenticated, (req, res) => {
  const sess = req.session;
  fireApp.auth().signInWithEmailAndPassword(sess.email, sess.password).then(() => {
    fireUserRef.orderByChild('andelaSerialCode').on('child_added', (snapshot) => {
      const allPromise = [];
      (function getAllItems() {
        return new Promise((resolve) => {
          for (const key in snapshot.val().assignedItems) {
            const eachPromise = [];
            if (snapshot.val().assignedItems) {
              const name = snapshot.val().assignedItems[key].name;
              const description = snapshot.val().assignedItems[key].description;
              const dateBought = snapshot.val().assignedItems[key].dateBought;
              const andelaSerial = snapshot.val().assignedItems[key].andelaSerialCode;
              const username = snapshot.val().assignedItems[key].username;
              const uid = snapshot.val().assignedItems[key].uid;
              const dueDate = snapshot.val().assignedItems[key].dueDate;
              const lost = snapshot.val().assignedItems[key].lost;
              eachPromise.push(name, description, dateBought, andelaSerial, username, uid, dueDate, lost);
              allPromise.push(eachPromise);
            }
            resolve(allPromise);
          }
        }).then((result) => {
          res.render('assigned', {
            title: 'All assigned assets',
            allItems: result,
          });
        }).catch((error) => {
            // console.log(error);
        });
      }());
    });
  });
});

router.post('/report', isAuthenticated, (req, res) => {
  fireApp.auth().signInWithEmailAndPassword(req.session.email, req.session.password).then(() => {
    const data = req.body;
    const assetId = data.serialCode;
    const username = data.username;
    const uid = data.uid;
    fireUserRef.child(`${uid}`).child('assignedItems').child(`${assetId}`).update({
      lost: 1,
    }, (error) => {
      if (!error) {
        iManagerMailer('I-Manager', 'support@i-manager.com', 'Case of lost item', `Asset with Andela code ${assetId}, assigned to ${username} has been reported missing`);
        res.redirect('/assets');
      }
    });
  });
});

router.post('/found', isAuthenticated, (req, res) => {
  fireApp.auth().signInWithEmailAndPassword(req.session.email, req.session.password).then(() => {
    const data = req.body;
    const assetId = data.serialCode;
    const uid = data.uid;
    const username = data.username;
    fireUserRef.child(`${uid}`).child('assignedItems').child(`${assetId}`).update({
      lost: 0,
    }, (error) => {
      if (!error) {
        iManagerMailer('I-Manager', 'support@i-manager.com', 'Case of lost but found item', `Lost asset with Andela code ${assetId}, assigned to ${username} has been reported as found`)
        res.redirect('/assets');
      }
    });
  });
});

module.exports = router;
