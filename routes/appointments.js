const express = require("express");
const router = express.Router();
const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require("../models/appointments-queries");

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const response = await getAppointments();
    if (!response.status) return res.status(500).send(response.message);
    res.render("appointments", { data: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching appointments");
  }
});

// Create a new appointment
router.post("/create", async (req, res) => {
  try {
    const response = await createAppointment(req.body);
    res.json(response);
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
