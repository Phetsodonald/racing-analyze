const { getDriversData, getSessionData } = require('../services/services');

const sessionTypes = {
  Qualifying: 'Qualifying',
  Practice: 'Practice',
  Race: 'Race'
};

async function getDrivers() {
  try {
    const drivers = await getDriversData();
    const driversMap = new Map();

    for (const driver of drivers) {
      if (!driversMap.has(driver.driver_number)) {
        driversMap.set(driver.driver_number, {
          driver_number: driver.driver_number,
          full_name: driver.full_name,
          team_name: driver.team_name,
          name_acronym: driver.name_acronym,
          team_colour: driver.team_colour,
          country_code: driver.country_code,
          headshot_url: driver.headshot_url
        });
      }
    }

    return [...driversMap.values()].sort(
      (a, b) => a.driver_number - b.driver_number
    );
  } catch (error) {
    throw new Error(`Failed to fetch drivers: ${error.message}`);
  }
}

async function getSessions(sessionType, year) {
  if (!Object.values(sessionTypes).includes(sessionType)) {
    throw new Error(`Invalid session type: ${sessionType}`);
  }

  try {
    const sessions = await getSessionData();
    return sessions.filter(
      s => s.session_type === sessionType && s.year === year
    );
  } catch (error) {
    throw new Error(`Failed to fetch sessions: ${error.message}`);
  }
}

module.exports = {
  getDrivers,
  getSessions
};
