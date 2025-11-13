const express = require("express");
const router = express.Router();
const { getAppointments, getContacts, getAvailibility, postAvailibility } = require('../models/queries');
router.get("/", async (req, res) => {
      try {
        const response = await getAppointments();
        console.log("Appointments:", response.data);
        res.render("index", { data: response.data });
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



module.exports = router;
