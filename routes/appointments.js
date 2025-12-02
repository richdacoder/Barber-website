const express = require("express");
const router = express.Router();
const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require("../models/appointment-queries");

// -----------------------------
// Render Homepage with appointments only
// -----------------------------
router.get("/", async (req, res) => {
  try {
    const appointmentsResp = await getAppointments();
    const appointment = appointmentsResp.status ? appointmentsResp.data : [];
    res.render("index", { data: appointment });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading homepage");
  }
});
// Create a new appointment
router.post("/create", async (req, res) => {
  try {
    const response = await createAppointment(req.body);
    const reqBod = req.body
    res.json(response);
    console.log('selected date', reqBod, reqBod.selectedDate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error creating appointment" });
  }
});

// Update an existing appointment
router.put("/update/:id", async (req, res) => {
  try {
    const response = await updateAppointment(req.params.id, req.body);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error updating appointment" });
  }
});

// Delete an appointment
router.delete("/delete/:id", async (req, res) => {
  try {
    const response = await deleteAppointment(req.params.id);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error deleting appointment" });
  }
});

module.exports = router;
