async function fetchRentalData() {
  const response = await fetch('https://28l3dkpq-3000.use2.devtunnels.ms/api/ver');
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return await response.json();
}

let chartInstance; // Guardará la instancia de la gráfica actual

async function renderChart(filteredRentals) {
  const cities = filteredRentals.map(r => r.city);
  const prices = filteredRentals.map(r => r.price);

  const ctx = document.getElementById('rentChart').getContext('2d');

  // Destruir la gráfica previa si existe
  if (chartInstance) {
      chartInstance.destroy();
  }

  // Crear una nueva gráfica
  chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: cities,
          datasets: [{
              label: 'Precios de Alquiler',
              data: prices,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

async function renderDropdown(rentals) {
  const cityFilter = document.getElementById('cityFilter');
  const uniqueCities = [...new Set(rentals.map(r => r.city))];

  // Agregar opciones al dropdown
  uniqueCities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      cityFilter.appendChild(option);
  });

  // Escuchar cambios en el filtro
  cityFilter.addEventListener('change', () => {
      const selectedCity = cityFilter.value;
      const filteredRentals = selectedCity === 'all'
          ? rentals
          : rentals.filter(r => r.city === selectedCity);
      renderChart(filteredRentals);
  });
}

async function initialize() {
  const rentals = await fetchRentalData();
  renderChart(rentals); // Renderizar la gráfica inicial
  renderDropdown(rentals); // Renderizar el filtro de ciudades
}

initialize();
