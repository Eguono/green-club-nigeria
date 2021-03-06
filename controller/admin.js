'use strict';
const admin = require("../helper/firebaseAdmin.js");
const firebase_admin = admin.auth();
const db = admin.database();
const ref = db.ref('/');

module.exports.updateUser = (req, res) => {
    let userId = req.query.id;
    let fullName = req.body.full_name;
    let displayName = req.body.user_name;
    let email = req.body.email;
    let password = req.body.password;
    // let photoUrl = ()=>{
    //     let photoUrl = req.body.photoURL;
    //     if (photoUrl != null){
    //             return photoUrl;
    //         }
    //         return "/img/blank-profile-picture.png";
    //     }
    // }

    firebase_admin.updateUser(userId, {
        email: email,
        emailVerified: true,
        password: password,
        displayName: displayName,
        photoURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png",
        disabled: false
    }).then((userRecord) => {
        let userRefs = ref.child("users/" + userId);
        userRefs.set({
            fullName: fullName,
            displayName: displayName,
            email: email,
            userId: userId
        });
        res.redirect('viewUsers');
    }).catch((err) => {
        var errorCode = err.code;
        var errorMessage = err.message;
        console.log(errorMessage);
        res.redirect('viewUsers');
    });
};

module.exports.deleteUser = (req, res) => {
    let userId = req.query.id;
    admin.auth().deleteUser(userId)
        .then(() => {
            let userRefs = ref.child("users/" + userId)
            userRefs.set(null);
            res.redirect('viewUsers');
        })
        .catch((err) => {
            let errorCode = err.code;
            let errorMessage = err.message;
            console.log(errorMessage);
            res.redirect('viewUsers');
        });

}

module.exports.createUser = (req, res) => {

    let fullName = req.body.full_name;
    let displayName = req.body.user_name;
    let email = req.body.email;
    // let schoolName = req.body.schoolName;
    let password = req.body.password;

    firebase_admin.createUser({
        email: email,
        emailVerified: true,
        password: password,
        displayName: displayName,
        photoURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png",
        disabled: false
    }).then((user) => {
        let userId = user.uid;
        let userRefs = ref.child("users/" + userId);
        // let schoolRefs = ref.child("schools/"+ schoolName);

        // schoolRefs.set({
        //     adminId: userId
        // });

        userRefs.set({
            fullName: fullName,
            displayName: displayName,
            email: email,
            userId: userId
        }).catch((err) => {
            let errorCode = err.code;
            let errorMessage = err.message;
            console.log(errorMessage);
            return res.render('createUser', { error: errorMessage })
        });

        res.redirect('/viewUsers');

    }).catch((err) => {
        let errorCode = err.code;
        let errorMessage = err.message;
        console.log(errorMessage);
        return res.render('createUser', { error: errorMessage })
    });
}