const { getLapsData, getCarData } = require('./services');


async function getAverageLapTime() {
  const laps = await getLapsData();
  const valid = laps.filter(lap => lap.lap_duration);

  if (!valid.length) return 0;

  const avg = valid.reduce((sum, l) => sum + l.lap_duration, 0) / valid.length;
  return Number(avg.toFixed(2));
}


async function getMaxLapSpeed() {
  const carData = await getCarData();
  if (!carData.length) return 0;

  const maxSpeed = Math.max(...carData.map(d => d.speed));
  return maxSpeed;
}


async function getTotalLaps() {
  const laps = await getLapsData();
  return laps.length;
}


async function getThrottleBrakeRatio() {
  const carData = await getCarData();
  if (!carData.length) return 0;

  const totalThrottle = carData.reduce((sum, d) => sum + d.throttle, 0);
  const totalBrake = carData.reduce((sum, d) => sum + d.brake, 0);


  return totalBrake === 0 ? Infinity : Number((totalThrottle / totalBrake).toFixed(2));
}

async function getDriverConsistency() {
  const laps = await getLapsData();
  const lapTimes = laps.filter(l => l.lap_duration).map(l => l.lap_duration);

  if (!lapTimes.length) return 0;

  const mean = lapTimes.reduce((a, b) => a + b, 0) / lapTimes.length;
  const variance = lapTimes.reduce((sum, t) => sum + Math.pow(t - mean, 2), 0) / lapTimes.length;

  return Number(Math.sqrt(variance).toFixed(2));
}


async function getSpeedOverTime() {
  const carData = await getCarData();
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


  getTotalLaps().then((data) => {
    console.log(data)
})
