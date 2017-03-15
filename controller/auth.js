const firebase = require("../helper/firebase.js");
const fire_base = firebase.auth();
const db = firebase.database();
const ref = db.ref('/');

module.exports.signUp = (req, res) => {
    let fullName = req.body.full_name;
    let displayName = req.body.user_name;
    let schoolName = req.body.schoolName;
    let email = req.body.email;
    let password = req.body.password;

    fire_base.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            user.updateProfile({
                displayName: displayName,
                photoURL: "/img/blank-profile-picture.png"
            }).catch((err) => {
                let errorCode = err.code;
                let errorMessage = err.message;
                console.log(errorMessage);
            });
            user.sendEmailVerification();
            let userId = user.uid;
            let userRefs = ref.child("unapprovedUsers/" + schoolName + "/" + userId)
            userRefs.set({
                fullName: fullName,
                displayName: displayName,
                email: email,
                userId: userId,
                isApproved: false
            });
            res.redirect('/dashboard');
        })
        .catch((err) => {
            let errorCode = err.code;
            let errorMessage = err.message;
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
            let errorCode = err.code;
            let errorMessage = err.message;
            return res.render('signin', { error: errorMessage })
        });
}

module.exports.signOut = (req, res) => {
    fire_base.signOut().then(() => {
        res.redirect('/signIn');
    }, (error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorMessage);
    });
}


module.exports.viewUnapproved = (req, res) => {
    let user = fire_base.currentUser;
    let userId = user.uid;
    ref.child("schools").once("value", (snapShot) => {
        for (users in snapShot.val()) {
            if (userId === snapShot.val()[users].adminId) {
                ref.child("unapprovedUsers/" + users).once("value", (snapShot) => {
                    console.log(snapShot.val());
                    res.render("unapproved", { users: snapShot.val() })
                }).catch((err) => {
                    let errorCode = err.code;
                    let errorMessage = err.message;
                    return res.render('dashboard', { error: errorMessage })
                });
            }
        }
    }).catch((err) => {
        let errorCode = err.code;
        let errorMessage = err.message;
        return res.render('dashboard', { error: errorMessage })
    }).then(user=>{
        res.render("unapproved");
    });

} 
