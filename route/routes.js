const auth = require("../controller/auth.js");
const user = require("../controller/user.js");
const admin = require("../controller/admin.js");
const article = require("../controller/article.js");
const upload = require("../controller/upload.js");

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

    app.route("/dashboard")
    .get((req, res) => {
        res.render("dashboard", {error:null});
    });

    app.get("/viewArticle", (req, res) => {
        res.send("Viewing Articles");
    });

    app.route("/viewUsers")
    .get(user.viewUser);

    app.route("/createUser")
    .get((req, res) => {
        res.render("createUser", {error:null});
    })
    .post(admin.createUser);

    app.route("/updateUser")
    .get(user.updateInfo)
    .post(admin.updateUser);
 
    app.route("/deleteUser")
    .get(admin.deleteUser);

    app.route("/article")
    .get((req, res)=>{
        res.render("article", {error:null});
    })
    .post(article.postArticle);

    app.route("/approveMembers")
    .get(auth.viewUnapproved);

    app.get("/createUser", (req, res) => {
        res.send("Creating Super Admins and User Admins");
    });

    app.get("/addedArticles", (req, res) => {
        res.send("List of Added Articles from User Admin");
    });

    app.get("/task", (req, res) => {
        res.send("Add Tasks for Users and User Admins");
    });

    app.route("/upload")
    .get((req, res)=>{
        res.render("upload", {error:null});
    })
    .post(upload.uploadFile);
}