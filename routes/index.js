const express = require("express");
const router = express.Router();
const db = require("../models/queries");

router.get( "/", (req,res) => {
res.send("Luxury Fresh 💈")
}

)

router.get("/clients", (req, res) => {
  console.log("GET /clients called");

  db.getclients((err, clients) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send("Database error");
    }

    console.log("clients from DB:", clients);
    res.render("index", { clients });
  });
});


router.get("/clients/:id", (req, res) => {
  const id = req.params.id;
  db.getClientsById(id, (err, client) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send("Database error");
    }

    if (!client) {
      return res.status(404).send("Client not found");
    }

    res.render("clientDetail", { client });
  });
});

module.exports = router;
