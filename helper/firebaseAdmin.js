const admin = require("firebase-admin");

const serviceAccount = require("./green-club-nigeria-firebase-admingreen.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://green-club-nigeria.firebaseio.com"
});