const db = require('../queries');
const express = require("express");
const bodyParser = require("body-parser");
let ejs = require('ejs');
const app = express();
const port = 3000;
app.set("views", "./views");       // folder for templates
app.set("view engine", "ejs");     // use EJS as default

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get("/clients", (req, res) => {
    console.log("GET /clients called");

    db.getclients((err, clients) => {
        if (err) {
            console.error("DB error:", err);
            return res.status(500).send("Database error");
        }

        console.log("clients from DB:", clients);
        res.render("index", { clients }); // pass clients to your template
    });
});

app.listen(port, () => {
    console.log("Server is running on " + port);
});

app.get("/clients/:id", db.getClientsById);
app.put("/clients/:id", db.updateClient);
app.post("/clients", db.createClient);
app.delete("/clients/:id", db.deleteClient);
