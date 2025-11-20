const express = require("express");
const router = express.Router();
const {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation
} = require("../models/location-queries");

// Get ALL locations
router.get("/", async (req, res) => {
  try {
    const locations = await getAllLocations();
    res.render('services');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch locations" });
  }
});

// Get one location by ID
router.get("/:id", async (req, res) => {
  try {
    const location = await getLocationById(req.params.id);
    res.json(location);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch location" });
  }
});

// Create new location
router.post("/", async (req, res) => {
  try {
    const { address, type, description } = req.body;
    const newLocation = await createLocation(address, type, description);
    res.json(newLocation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create location" });
  }
});

// Update a location
router.put("/:id", async (req, res) => {
  try {
    const { address, type, description } = req.body;
    const updated = await updateLocation(req.params.id, address, type, description);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update location" });
  }
});

// Delete a location
router.delete("/:id", async (req, res) => {
  try {
    await deleteLocation(req.params.id);
    res.json({ message: "Location deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete location" });
  }
});

module.exports = router;
