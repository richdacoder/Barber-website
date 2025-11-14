// routes/availability.js
const express = require("express");
const router = express.Router();

// Import only availability queries
const { getAvailability, postAvailability } = require("../models/availability-queries");

// ----------------------
// GET — Show availability page
// ----------------------
router.get("/", async (req, res) => {
  try {
    const response = await getAvailability();
    res.render("availability", {
      data: response.data,
    });
  } catch (err) {
    console.error("❌ Error fetching availability:", err);
    res.status(500).send("Error fetching availability");
  }
});

// ----------------------
// POST — Create/update availability
// ----------------------
router.post("/", async (req, res) => {
  const barberId = 1; // Hardcoded for now — change to session user later

  console.log("📥 POST /availability body:", req.body);

  try {
    const response = await postAvailability(barberId, req.body);

    if (!response.status) {
      console.log("⚠️ Availability error:", response.message);
      return res.status(response.code || 400).send(response.message);
    }

    // Success — reload page
    res.redirect("/availability");
  } catch (err) {
    console.error("❌ Error posting availability:", err);
    res.status(500).send("Error saving availability");
  }
});

module.exports = router;
