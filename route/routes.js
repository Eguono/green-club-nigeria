

module.exports.webRoutes = (app, route) => {
    app.get("/", (req, res) => {
        res.send("Working!");
    });

    app.get("/signUp", (req, res) => {
        res.send("signUp");
    });

    app.get("/logIn", (req, res) => {
        res.send("logIn");
    });

    app.get("/dashBoard", (req, res) => {
        res.send("dashBoard");
    });

    app.get("/viewArticle", (req, res) => {
        res.send("Viewing Articles");
    });

    app.get("/viewUsers", (req, res) => {
        res.send("Viewing Users");
    });

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