const express = require('express');
const router = express.Router();
const {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation
} = require('../models/location-queries');

console.log('check here', 'location connected to user');

// API endpoints only
router.get('/api', async (req, res) => {
  try {
    const locations = await getAllLocations();
   const resultsloc = res.json(locations);
  //  console.log('check here', resultsloc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

router.post('/api', async (req, res) => {
  try {
    const { address } = req.body;
    const location = await createLocation(address);
    const loc = res.json(location);
    console.log(loc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create location' });
  }
});

router.delete('/api/:id', async (req, res) => {
  try {
    await deleteLocation(req.params.id);
    res.json({ message: 'Location deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete location' });
  }
});

module.exports = router;
