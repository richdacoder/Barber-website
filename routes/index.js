const express = require("express");
const router = express.Router();
// const db = require("../models/queries");
const { getAppointments, getContacts } = require('../models/queries');
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
    const response = await getContacts();
    console.log(response);
    res.render("contacts", {data: response.data });
    } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching contacts");
  }
});


router.get("/availibility", async (req, res) => {
try{
  res.render('availibility');
} catch (err){
  res.status(500).send("Error fetching appointments");
}
});

module.exports = router;
