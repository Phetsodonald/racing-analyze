const { getDriversData, getSessionData } = require('../services/services');


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
  try {
    const sessions = await getSessionData();

    return sessions.filter(
      session =>
        session.session_type === sessionType &&
        session.year === year
    );
  } catch (error) {
    throw new Error(`Failed to fetch sessions: ${error.message}`);
  }
}

module.exports = { getDrivers, getSessions};