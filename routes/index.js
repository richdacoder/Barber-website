const express = require("express");
const router = express.Router();
// const db = require("../models/queries");
const { getAppointments } = require('../models/queries');
console.log('index.js is running');


router.get("/", async (req, res) => {
  console.log('read /');
    try {
    const response = await getAppointments(); // returns ResponseClass
    res.render("index", { data: response.data }); // pass only the appointments array
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching appointments");
  }
});


router.get("/contacts", async (req, res) => {
  try{
    res.render("contacts");
    } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching appointments");
  }
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
