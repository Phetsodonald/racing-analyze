document.addEventListener('DOMContentLoaded', async () => {
  const driversContainer = document.querySelector('.drivers-container');
  const FALLBACK_IMAGE = 'https://via.placeholder.com/150x200?text=No+Image';

  async function getDrivers() {
    const res = await fetch('http://localhost:3000/api/drivers');
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    return res.json();
  }

  try {
    const drivers = await getDrivers();

    // Build HTML for all drivers
    driversContainer.innerHTML = drivers.map(driver => {
      const imageSrc = driver.headshot_url || FALLBACK_IMAGE;
      return `
        <div class="driver-card">
          <div class="image-container">
            <img src="${imageSrc}" alt="Headshot of ${driver.full_name}" loading="lazy" 
            onerror="this.src='${FALLBACK_IMAGE}'">
          </div>
          <div>
            <p class="fullname-container">${driver.full_name}</p>
          </div>
          <div>
            <p class="driver-number">${driver.driver_number}</p>
          </div>
        </div>
      `;
    }).join('');
  } catch (error) {
    driversContainer.innerHTML = `<p class="error">Failed to load drivers</p>`;
    console.error(error.message);
  }
});
