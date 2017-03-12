const firebase = require("../helper/firebase.js");
const fire_base = firebase.auth();
const db = firebase.database();
const ref = db.ref('/');

module.exports.viewUser = (req, res) => {
    let user = firebase.auth().currentUser;
    if (user) {
        ref.child('users').once('value', (snapShot) => {
            res.render('manageUser', { users: snapShot.val() })
        }, (err) => {
            let errorCode = err.code;
            let errorMessage = err.message;
            console.log(err);
            res.redirect('/manageUser')
        });
    }
}

module.exports.updateInfo = (req, res) => {
    let user = firebase.auth().currentUser;
    let userId = req.query.id;
    if (user) {
        ref.child('users/' + userId).once('value', (snapShot) => {
            res.render('updateUser', {
                users: snapShot.val(),
                error: null
            })
        }, (err) => {
            let errorCode = err.code;
            let errorMessage = err.message;
            console.log(err);
            res.redirect('/updateUser', { error: errorMessage })
        });
    }
}