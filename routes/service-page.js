const express = require('express');
const router = express.Router();
const { getAllServices } = require('../models/service-queries');
const { getAllLocations } = require('../models/location-queries');
console.log('admin 1');

router.get('/services', async (req, res) => {

  try {
    const services = await getAllServices();
    const locations = await getAllLocations();

    res.render('services', { services, locations });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load services page');
  }
});

module.exports = router;
