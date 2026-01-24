const express = require('express');
const {
  getAverageLapTime,
  getMaxLapSpeed,
  getTotalLaps,
  getThrottleBrakeRatio,
  getDriverConsistency,
  getSpeedOverTime
} = require('./analytics');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

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

app.listen(PORT, () =>
  console.log(`Dashboard running on http://localhost:${PORT}`)
);
