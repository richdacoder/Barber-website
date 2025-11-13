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


router.get("/availibility", async (req, res) => {
try{
  const response = await getAvailibility();
  res.render('availibility', {data: response.data});
} catch (err){
  res.status(500).send("Error fetching appointments");
}
});
console.log('before post');
router.post("/availibility", async (req, res) => {
  const barberId = 1; // example, replace with session user if needed
  console.log("🧠 Request body:", req.body);
  const response = await postAvailibility(barberId, req.body);

  if (!response.status) {
    console.log("⚠️", response.message);
    return res.status(response.code || 400).send(response.message);
  }

  res.redirect("/availibility");
});

module.exports = router;
