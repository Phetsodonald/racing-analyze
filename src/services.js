const axios = require('axios');

const BASE_URL = 'https://api.openf1.org/v1';

async function getDriversData() {
  try {
    const res = await axios.get(`${BASE_URL}/drivers`);
    console.log(res.data);
  } catch (error) {
    console.error(error.message);
  }
}

getDriversData();
