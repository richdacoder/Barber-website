const db = require('../queries');
const express = require("express");
const bodyParser = require("body-parser");
let ejs = require('ejs');
const app = express();
const port = 3000;
const db = require('./queries');
app.set("views", "./views");       // folder for templates
app.set("view engine", "ejs");     // use EJS as default

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get("/users", (req, res) => {
res.render("index")
})

app.listen(port, () => {
    console.log("Server is running on " + port);
});

app.get("/users", db.getusers);
app.get("/users/:id", db.getUserById);
app.put("/users/:id", db.updateUser);
app.post("/users", db.createUser);
app.delete("/users/:id", db.deleteUser);
