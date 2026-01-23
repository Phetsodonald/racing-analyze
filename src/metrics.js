const {getLapsData, getCarData} = require('./services');


async function getAverageLapTime() {
    const laps = await getLapsData();
    const valid = laps.filter(lap => lap.lap_duration);
    
    const avg = valid.reduce((sum, l) => sum + l.lap_duration, 0) / valid.length;
    return Number(avg.toFixed(2));
}



async function getSpeedOverTime() {
  const carData = await getCarData();

  return carData.map(d => ({
    time: d.date,
    speed: d.speed
  }));
}

