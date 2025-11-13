const express = require("express");
const router = express.Router();
const {
  getContacts,
  checkClientExists,
  createClient,
  updateClient
} = require("../models/contacts-queries"); // make sure the file name matches

// Get all clients
router.get("/", async (req, res) => {
  try {
    const response = await getContacts();
    if (!response.status) return res.status(500).send(response.message);
    res.render("contacts", { data: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching clients");
  }
});

// Check if client exists (by first_name, last_name, email, or phone_number)
router.post("/check-client", async (req, res) => {
  try {
    const client = await checkClientExists(req.body);
    res.json(client); // client object if exists, null if not
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error checking client" });
  }
});

// Create a new client
router.post("/create-client", async (req, res) => {
  try {
    const response = await createClient(req.body);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error creating client" });
  }
});

// Update an existing client
router.put("/update-client/:id", async (req, res) => {
  try {
    const response = await updateClient(req.params.id, req.body);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error updating client" });
  }
});

module.exports = router;
