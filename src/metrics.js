const {getLapsData} = require('./services');


async function getAverageLapTime() {
    const laps = await getLapsData();
    const valid = laps.filter(lap => lap.lap_duration);
    
    const avg = valid.reduce((sum, l) => sum + l.lap_duration, 0) / valid.length;
    return Number(avg.toFixed(2));
}



