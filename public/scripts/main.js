const sessionType = document.getElementById('sessionType');
const seasonYear = document.getElementById('seasonYear');

const totalSessions = document.getElementById('totalSessions');
const totalCircuits = document.getElementById('totalCircuits');
const seasonLabel = document.getElementById('seasonLabel');

const sessionsByCircuit = document.getElementById('sessionsByCircuit');
const sessionsTimeline = document.getElementById('sessionsTimeline');

const cache = new Map();
let charts = [];

async function fetchSessions(type, year) {
  const key = `${type}-${year}`;

  if (cache.has(key)) {
    return cache.get(key);
  }

  const res = await fetch(`/api/sessions?type=${type}&year=${year}`);
  const data = await res.json();

  cache.set(key, data);
  return data;
}

function updateKPIs(sessions, year) {
  totalSessions.textContent = sessions.length;
  totalCircuits.textContent =
    new Set(sessions.map(s => s.circuit_short_name)).size;
  seasonLabel.textContent = year;
}

function destroyCharts() {
  charts.forEach(c => c.destroy());
  charts = [];
}

const baseOptions = {
  responsive: true,
  plugins: {
    legend: { labels: { color: '#e5e7eb' } }
  },
  scales: {
    x: { ticks: { color: '#9ca3af' } },
    y: { ticks: { color: '#9ca3af' } }
  }
};

function renderBar(ctx, labels, data) {
  charts.push(new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ label: 'Sessions', data }] },
    options: baseOptions
  }));
}

function renderLine(ctx, labels, data) {
  charts.push(new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{ label: 'Sessions over Time', data, tension: 0.4 }]
    },
    options: baseOptions
  }));
}

async function loadDashboard() {
  document.body.classList.add('loading');
  destroyCharts();

  const type = sessionType.value;
  const year = seasonYear.value;

  const sessions = await fetchSessions(type, year);
  updateKPIs(sessions, year);

  const grouped = sessions.reduce((acc, s) => {
    acc[s.circuit_short_name] = (acc[s.circuit_short_name] || 0) + 1;
    return acc;
  }, {});

  renderBar(
    sessionsByCircuit,
    Object.keys(grouped),
    Object.values(grouped)
  );

  renderLine(
    sessionsTimeline,
    Object.keys(grouped),
    Object.values(grouped)
  );

  document.body.classList.remove('loading');
}

sessionType.addEventListener('change', loadDashboard);
seasonYear.addEventListener('change', loadDashboard);

loadDashboard();
