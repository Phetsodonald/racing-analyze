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
        return res.data
    } catch (error) {
        throw new Error(error.message)
    }
}

async function getLapsData() {
  try {
    const res = await axios.get(`${BASE_URL}/laps`, {
      params: {
        session_key: 9158,
        driver_number: 44 
      }
    });

    return res.data
  } catch (error) {
    throw new Error(error.message)
  }
}


async function getCarData() {
  try {
    const res = await axios.get(`${BASE_URL}/car_data`, {
      params: {
        session_key: 9158,
        driver_number: 1
      }
    });

    return res.data.slice(0, 5)
  } catch (error) {
    throw new Error(error.message)
  }
}
