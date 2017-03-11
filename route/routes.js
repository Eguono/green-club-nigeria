const auth = require("../controller/auth.js");
const user = require("../controller/user.js");

module.exports = (app, route) => {
    app.route("/")
    .get((req, res) => {
        res.render("index");
    });

    app.route("/signUp")
    .get((req, res) => {
        res.render("signup", {error:null});
    })
    .post(auth.signUp);

    app.route("/signIn").get((req, res) => {
        res.render("signin", {error:null});
    })
    .post(auth.signIn);

    app.route('/signOut')
        .get(auth.signOut);

    app.route("/dashBoard")
    .get((req, res) => {
        res.send("dashBoard");
    });

    app.get("/viewArticle", (req, res) => {
        res.send("Viewing Articles");
    });

    app.route("/viewUsers")
    .get(user.viewUser);

    app.get("/approveMembers", (req, res) => {
        res.send("Approve Members for Schools");
    });

    app.get("/createUser", (req, res) => {
        res.send("Creating Super Admins and User Admins");
    });

    app.get("/addedArticles", (req, res) => {
        res.send("List of Added Articles from User Admin");
    });

    app.get("/task", (req, res) => {
        res.send("Add Tasks for Users and User Admins");
    });
}