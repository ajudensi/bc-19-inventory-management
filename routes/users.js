require('dotenv').config();
const express = require('express');
const [fireApp, fireUserRef, fireAssetsRef, iManagerMailer] = require('../configs/firebaseconfigs.js');
const [isAuthenticated, isNotAdminOrSuper, isNotSuper] = require('../configs/custom-middlewares.js');

const router = express.Router();

const fireAuth = fireApp.auth();

router.get('/:uid', isAuthenticated, (req, res) => {
  const uid = req.params.uid;
  fireApp.auth().signInWithEmailAndPassword(req.session.email, req.session.password).then((user) => {
    fireUserRef.child(uid).on('value', (snapshot) => {
      const username = snapshot.val().username;
      const role = snapshot.val().role;
      const email = snapshot.val().email;
      fireAssetsRef.once('value', (snapshot) => {
        const availableAssets = [];
        snapshot.forEach((childSnapshot) => {
          const eachAsset = [
            childSnapshot.val().name,
            childSnapshot.val().description,
            childSnapshot.val().dateBought,
            childSnapshot.key,
            uid,
            childSnapshot.val().serialNumber,
            childSnapshot.val().dataAdded,
          ];
          availableAssets.push(eachAsset);
        });
        fireUserRef.child(`${uid}/assignedItems`).once('value', (snapshot) => {
          const assignedAssets = [];
          snapshot.forEach((childSnapshot) => {
            const eachAsset = [
              childSnapshot.val().name,
              childSnapshot.val().description,
              childSnapshot.val().dateBought,
              childSnapshot.key,
              uid,
              childSnapshot.val().serialNumber,
              childSnapshot.val().dataAdded,
            ];
            assignedAssets.push(eachAsset);
          });
          res.render('user', {
            title: username,
            userInfo: { username, role, email, uid },
            assets: availableAssets,
            assigned: assignedAssets,
          });
        });
      });
    }, () => {
      res.redirect(`/users/${uid}`);
    });
  }).catch(() => {
    res.redirect(`/users/${uid}`);
  });
});

router.get('/', isAuthenticated, (req, res) => {
  fireApp.auth().signInWithEmailAndPassword(req.session.email, req.session.password).then(() => {
    fireUserRef.on('value', (snapshot) => {
      const allUsers = [];
      snapshot.forEach((childSnapshot) => {
        const eachUser = [
          childSnapshot.val().username,
          childSnapshot.val().email,
          childSnapshot.val().role,
          childSnapshot.key,
        ];
        allUsers.push(eachUser);
      });
      res.render('users', {
        title: 'Users',
        usersData: allUsers,
      });
    });
  }).catch((error) => {
    res.send(error);
  });
});

router.post('/assign-user', isNotAdminOrSuper, (req, res) => {
  const data = req.body;
  fireApp.auth().signInWithEmailAndPassword(req.session.email, req.session.password).then((user) => {
    const assetId = data.assetCheck;
    const uid = data.uid;
    const dueDate = data.date;
    const username = data.username;
    fireAssetsRef.child(assetId).once('value', (snapshot) => {
      fireUserRef.child(uid).child('assignedItems').child(assetId).update(snapshot.val(), (error) => {
        if (!error) {
          fireUserRef.child(uid).child('assignedItems').child(assetId).update({
            uid: data.uid,
            username: username,
            dueDate: dueDate,
          }, (error) => {
            if (!error) {
              fireAssetsRef.child(assetId).remove();
              iManagerMailer('I-Manager', 'support@i-manager.com', 'Assigned item', `An item with ID ${assetId} has been assigned to you. Login to see details`);
              res.redirect(`/users/${uid}`);
            }
          });
        }
      });
    });
  });
});

router.post('/unassign-user', isNotAdminOrSuper, (req, res) => {
  fireApp.auth().signInWithEmailAndPassword(req.session.email, req.session.password).then((user) => {
    const data = req.body;
    const assetId = data.assetCheck;
    const uid = data.uid;
    fireUserRef.child(`${uid}`).child('assignedItems').child(`${assetId}`).once('value', (snapshot) => {
      fireAssetsRef.child(`${assetId}`).set(snapshot.val(), (error) => {
        if (!error) {
          fireUserRef.child(`${uid}`).child('assignedItems').child(`${assetId}`).remove();
          iManagerMailer('I-Manager', 'support@i-manager.com', 'Unassigned item', `An item with ID ${assetId} has been unassigned from you. Login to see details`);
          res.redirect(`/users/${uid}`);
        }
      });
    });
  });
});
module.exports = router;
