const admin = require ("../helper/firebaseAdmin.js");
const db = admin.database();
const ref = db.ref("restricted_access/secret_document");



ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});