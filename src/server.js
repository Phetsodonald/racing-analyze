const express = require('express');
const cors = require('cors');

const {
  getAverageLapTime,
  getMaxLapSpeed,
  getTotalLaps,
  getThrottleBrakeRatio,
  getDriverConsistency,
  getSpeedOverTime
} = require('./metrics');

const {getDriversData} = require('./services')
const app = express();
const PORT = 3000;

app.use(express.static('index.html'));
app.use(cors())

app.get('/api/dashboard', async (req, res) => {
  const sessionKey = 9158;
  const driverNumber = 44;

  const data = {
    avgLapTime: await getAverageLapTime(sessionKey, driverNumber),
    maxSpeed: await getMaxLapSpeed(sessionKey, driverNumber),
    totalLaps: await getTotalLaps(sessionKey, driverNumber),
    throttleBrakeRatio: await getThrottleBrakeRatio(sessionKey, driverNumber),
    consistency: await getDriverConsistency(sessionKey, driverNumber),
    speedOverTime: await getSpeedOverTime(sessionKey, driverNumber)
  };

  res.json(data);
});

app.get('/api/drivers', async (req, res) => {
  try {
    const drivers = await getDriversData();

    const seen = new Set();
    const uniqueDrivers = [];

    for (const d of drivers) {
      if (!seen.has(d.driver_number)) {
        seen.add(d.driver_number);
        uniqueDrivers.push({
          driver_number: d.driver_number,
          full_name: d.full_name,
          team_name: d.team_name,
          name_acronym: d.name_acronym,
          driver_number: d.driver_number,
          headshot_url: d.headshot_url,
          country_code: d.country_code,
          session_key: d.session_key,
          meeting_key: d.meeting_key,
          team_colour: d.team_colour
        });
      }
    }

    res.json(uniqueDrivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () =>
  console.log(`Dashboard running on http://localhost:${PORT}/api/drivers`)
);
