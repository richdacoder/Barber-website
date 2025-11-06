const express = require("express");
const router = express.Router();
// const db = require("../models/queries");
const { getAppointments, getContacts, getAvailibility, postAvailibility } = require('../models/queries');
console.log('index.js is running');
router.get("/", async (req, res) => {
      try {
        const response = await getAppointments(); // returns ResponseClass
        console.log("Appointments:", response.data);
        res.render("index", { data: response.data }); // pass only the appointments array
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching appointments");
  }
});

router.get("/contacts", async (req, res) => {
  try{
    const response = await getContacts();
    res.render("contacts", {data: response.data });
    } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching contacts");
  }
});


router.get("/availibility", async (req, res) => {
try{
  const response = await getAvailibility();
  res.render('availibility', {data: response.data});
} catch (err){
  res.status(500).send("Error fetching appointments");
}
});

router.post("/availibility", async (req, res) => {
  const barberId = 1; // example, replace with session user if needed
  console.log(req.body);

  const response = await postAvailibility(barberId, req.body);

  if (!response.status) {
    console.log("⚠️", response.message);
    return res.status(response.code || 400).send(response.message);
  }

  res.redirect("/availibility");
});

module.exports = router;
