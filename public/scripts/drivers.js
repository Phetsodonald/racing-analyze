const container = document.getElementById('drivers-container');

async function loadDrivers() {
  const res = await fetch('http://localhost:3000/api/drivers');
  const drivers = await res.json();

  drivers.forEach(driver => {
    const card = document.createElement('div');
    card.className = 'driver-card';

    const imageSrc = driver.headshot_url || 'https://tse3.mm.bing.net/th/id/OIP.KLGjPa0aDuHx7cdu00_65QHaHV?rs=1&pid=ImgDetMain&o=7&rm=3';
    const country = driver.country_code || 'N/A';

    card.innerHTML = `
      <img 
        src="${imageSrc}"
        alt="${driver.full_name}"
        onerror="this.src='assets/driver-placeholder.png'"
      />

      <div class="driver-info">
        <h3>${driver.full_name}</h3>
        <p class="team">${driver.team_name}</p>
        <p class="meta">#${driver.driver_number} • ${country}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

loadDrivers();
