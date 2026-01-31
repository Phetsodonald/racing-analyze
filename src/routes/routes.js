const express = require('express');
const router = express.Router();

const { getDrivers, getSessions } = require('../controllers/controllers');

router.get('/drivers', async (req, res) => {
  try {
    const drivers = await getDrivers();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/sessions', async (req, res) => {
  try {
    const { type, year } = req.query;

    if (!type || !year) {
      return res.status(400).json({
        error: 'type and year are required'
      });
    }

    const sessions = await getSessions(type, Number(year));
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
