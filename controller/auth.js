const firebase = require("../helper/firebase.js");
const fire_base = firebase.auth();
const db = firebase.database();
const ref = db.ref('/');

module.exports.signUp = (req, res) => {
    let fullName = req.body.full_name;
    let displayName = req.body.user_name;
    let email = req.body.email;
    let password = req.body.password;

    fire_base.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            user.updateProfile({
                displayName: displayName,
                photoURL: "/img/blank-profile-picture.png"
            }).catch((err) => {
                var errorCode = err.code;
                var errorMessage = err.message;
                console.log(errorMessage);
            });
            user.sendEmailVerification();
            let userId = user.uid;
            let userRefs = ref.child("users/" + userId)
            userRefs.set({
                fullName: fullName,
                displayName: displayName,
                email: email,
                userId: userId
            });
            res.redirect('/dashboard');
        })
        .catch((err) => {
            var errorCode = err.code;
            var errorMessage = err.message;
            return res.render('signup', { error: errorMessage })
        });
}

module.exports.signIn = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    fire_base.signInWithEmailAndPassword(email, password)
        .then((user) => {
            res.redirect('/dashboard');
        })
        .catch((err) => {
            var errorCode = err.code;
            var errorMessage = err.message;
            return res.render('signin', { error: errorMessage })
        });
}

module.exports.signOut = (req, res) => {
    fire_base.signOut().then(() => {
        res.redirect('/signIn');
    }, (error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
}

