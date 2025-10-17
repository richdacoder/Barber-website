const express = require("express");
const router = express.Router();
console.log('point 1');
const db = require("../models/queries");
console.log('point 4');
console.log('index.js is running');

console.log('point 5')
router.get("/", async (req, res) => {
  console.log('point 6');
  try {
    const data = await db('appointments').select('*');
    res.render("index", {data});
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching appointments");
  }
});


router.get("/clients", (req, res) => {
  console.log("GET /clients called");
  if (err) {
      console.log("DB error:", err);
      return res.status(500).send("Database error");
    }
  res.render("index")
  // db.getclients((err, clients) => {
  //   if (err) {
  //     console.log("DB error:", err);
  //     return res.status(500).send("Database error");
  //   }

  //   console.log("clients from DB:", clients);
  //   res.render("index", { clients });
  //   res.send("/clients")
  // });
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
