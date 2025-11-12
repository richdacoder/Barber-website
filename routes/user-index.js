const express = require('express');
const router = express.Router();
const { getAvailibility } = require('../models/queries');
console.log('working')

router.get('/', async (req, res) => {
  const { date } = req.query; // e.g., '2025-11-12'
  console.log(date);
  try {
    const allSlots = await getAvailibility();
    if (!allSlots.status) return res.status(500).json({ error: 'DB error' });

    // Filter slots by date (since getAvailibility currently returns all)
    const filteredSlots = allSlots.data.filter(
      slot => slot.slot_date && new Date(slot.slot_date).toISOString().split('T')[0] === date && slot.is_available
    );

    res.json(filteredSlots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch time slots' });
  }
});

module.exports = router;
