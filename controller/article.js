const firebase = require('../helper/firebase.js');
const db = firebase.database();
const ref = db.ref('/');


module.exports.postArticle = (req, res) => {

    let user = firebase.auth().currentUser;
    let article = req.body.article;
    let userId = user.uid;

    if (user) {
        ref.child('users/' + userId + '/displayName').once('value', (snapShot) => {

            let result = {};
            let data = {
                displayName: snapShot.val(),
                article: article,
            };

            let articlesRef = ref.child('article' + '/' + userId);
            let articleRef = articlesRef.push();
            let articleKey = articleRef.key;

            result["article/" + userId + "/" + articleKey] = data;
            result["allArticles/" + articleKey] = data;
            console.log(result);

            ref.update(result).catch((err) => {
                let errorCode = err.code;
                let errorMessage = err.message;
                console.log(errorMessage);
                return res.render('/article', { error: errorMessage })

            }).then(res.redirect("/dashboard"))


        }, (err) => {
            let errorCode = err.code;
            let errorMessage = err.message;
            console.log(errorMessage);
            return res.render('/article', { error: errorMessage })
        });
    }
}