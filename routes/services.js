const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} = require('../models/service-queries');
console.log('check here', 'before service with user');

// API endpoints only
router.get('/api', async (req, res) => {
  console.log('check here', ' service connected to user');

  try {
    const services = await getAllServices();
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

router.post('/api', async (req, res) => {
  try {
    const { name } = req.body;
    const service = await createService(name);
    const serviceJson = res.json(service);
    // console.log(serviceJson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

router.delete('/api/:id', async (req, res) => {
  try {
    await deleteService(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

module.exports = router;
