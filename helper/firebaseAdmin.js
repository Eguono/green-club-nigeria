const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");

module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://green-club-nigeria.firebaseio.com"
});

