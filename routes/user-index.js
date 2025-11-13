const express = require('express');
const router = express.Router();
const { getAvailibility } = require('../models/queries');
console.log('working');

router.get('/', async (req, res) => {
  const { date } = req.query; // e.g., '2025-11-12'
  console.log('the date', date);

  if (!date) return res.status(400).json({ error: 'Missing date parameter' });

  try {
    const allSlots = await getAvailibility();
    console.log('here all slots', allSlots);

    if (!allSlots.status) return res.status(500).json({ error: 'DB error' });

    // Get day of the week from selected date
    const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const requestedDayName = dayNames[new Date(date).getDay() + 1];
    console.log('requested day name:', requestedDayName);

    // Filter slots by either exact date or recurring day of week
    const filteredSlots = allSlots.data.filter(slot => {
      console.log("All slots returned from DB:", allSlots.data);
      // Only include available slots
      if (!slot.is_available) return false;

      // Match slot_date if it exists
      if (slot.slot_date) {
        return new Date(slot.slot_date).toISOString().split('T')[0] === date;
      }

      // Otherwise match by day_of_week
      return slot.day_of_week === requestedDayName;
    });

    console.log('filtered slots:', filteredSlots);

    res.json(filteredSlots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch time slots' });
  }
});

module.exports = router;
