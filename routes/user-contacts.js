// routes/clients.js
const express = require("express");
const router = express.Router();
const { checkClientExists, createClient } = require("../models/contacts-queries");

// POST /clients — handles both check and create actions
router.post("/", async (req, res) => {
  const { action, first_name, last_name, email, phone_number, profile_picture } = req.body;

  if (!action) return res.status(400).json({ error: "Missing action" });

  try {
    if (action === "check") {
      // ✅ Check if client exists
      const result = await checkClientExists({ first_name, last_name, email, phone_number });
      return res.json({ exists: result.exists, id: result.clientId });
    }

    if (action === "create") {
      // ✅ First check if client already exists to avoid UNIQUE violation
      const existing = await checkClientExists({ first_name, last_name, email, phone_number });
      if (existing.exists) {
        return res.status(400).json({ error: "Client already exists", id: existing.clientId });
      }

      // Create new client
      const newClient = await createClient({ first_name, last_name, email, phone_number, profile_picture });
      if (!newClient.status) {
        return res.status(500).json({ error: newClient.message });
      }

      return res.json({ id: newClient.data.id, message: "Client created successfully" });
    }

    return res.status(400).json({ error: "Invalid action" });

  } catch (err) {
    console.error("❌ /clients POST error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
