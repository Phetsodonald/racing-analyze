const axios = require('axios');

const BASE_URL = 'https://api.openf1.org/v1';

async function getDriversData() {
  try {
    const res = await axios.get(`${BASE_URL}/drivers`);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getSessionData() {
  try {
    const res = await axios.get(`${BASE_URL}/sessions`);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getLapsData(sessionKey, driverNumber) {
  try {
    const res = await axios.get(`${BASE_URL}/laps`, {
      params: {
        session_key: sessionKey,
        driver_number: driverNumber
      }
    });

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getCarData(sessionKey, driverNumber) {
  try {
    const res = await axios.get(`${BASE_URL}/car_data`, {
      params: {
        session_key: sessionKey,
        driver_number: driverNumber
      }
    });

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getDriversData,
  getSessionData,
  getLapsData,
  getCarData
};
