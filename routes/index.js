const db = require('../queries');
const express = require("express");
const bodyParser = require("body-parser");
let ejs = require('ejs');
const app = express();
const port = 3000;
const db = require('./queries');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get("/", (request, response) => {
    render.json({
        info: 'Hello world!'
    });
})

app.listen(port, () => {
    console.log("Server is running on " + port);
});

app.get("/users", db.getusers);
app.get("/users/:id", db.getUserById);
app.put("/users/:id", db.updateUser);
app.post("/users", db.createUser);
app.delete("/users/:id", db.deleteUser);
