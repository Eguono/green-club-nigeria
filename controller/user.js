const firebase = require("../helper/firebase.js");
const fire_base = firebase.auth();
const db = firebase.database();
const ref = db.ref('/');

module.exports.viewUser = (req, res) => {
    var user = firebase.auth().currentUser
    if (user) {
        ref.child('users').once('value', (snapShot) => {
            res.render('manageUser', { users: snapShot.val() })
        }, (err) => {
            var errorCode = err.code;
            var errorMessage = err.message;
            console.log(err);
            res.redirect('/manageUser')
        });
    }
}