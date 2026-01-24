const { getLapsData, getCarData } = require('./services');

async function getAverageLapTime(sessionKey, driverNumber) {
  const laps = await getLapsData(sessionKey, driverNumber);
  const valid = laps.filter(lap => lap.lap_duration);

  if (!valid.length) return 0;

  const avg =
    valid.reduce((sum, l) => sum + l.lap_duration, 0) / valid.length;

  return Number(avg.toFixed(2));
}

async function getMaxLapSpeed(sessionKey, driverNumber) {
  const carData = await getCarData(sessionKey, driverNumber);
  if (!carData.length) return 0;

  return Math.max(...carData.map(d => d.speed));
}

async function getTotalLaps(sessionKey, driverNumber) {
  const laps = await getLapsData(sessionKey, driverNumber);
  return laps.length;
}

async function getThrottleBrakeRatio(sessionKey, driverNumber) {
  const carData = await getCarData(sessionKey, driverNumber);
  if (!carData.length) return 0;

  const totalThrottle = carData.reduce((sum, d) => sum + d.throttle, 0);
  const totalBrake = carData.reduce((sum, d) => sum + d.brake, 0);

  return totalBrake === 0
    ? 0
    : Number((totalThrottle / totalBrake).toFixed(2));
}

async function getDriverConsistency(sessionKey, driverNumber) {
  const laps = await getLapsData(sessionKey, driverNumber);
  const lapTimes = laps
    .filter(l => l.lap_duration)
    .map(l => l.lap_duration);

  if (!lapTimes.length) return 0;

  const mean =
    lapTimes.reduce((sum, t) => sum + t, 0) / lapTimes.length;

  const variance =
    lapTimes.reduce((sum, t) => sum + Math.pow(t - mean, 2), 0) /
    lapTimes.length;

  return Number(Math.sqrt(variance).toFixed(2));
}

async function getSpeedOverTime(sessionKey, driverNumber) {
  const carData = await getCarData(sessionKey, driverNumber);

  return carData.map(d => ({
    time: d.date,
    speed: d.speed
  }));
}

module.exports = {
  getAverageLapTime,
  getMaxLapSpeed,
  getTotalLaps,
  getThrottleBrakeRatio,
  getDriverConsistency,
  getSpeedOverTime
};

getAverageLapTime(9156, 20).then
((data) => console.log(data))