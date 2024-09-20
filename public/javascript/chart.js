async function fetchRentalData() {
    const response = await fetch('http://localhost:3000/api/ver');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}

  async function renderChart() {
    const rentals = await fetchRentalData();
    const cities = rentals.map(r => r.city);
    const prices = rentals.map(r => r.price);
  
    const ctx = document.getElementById('rentChart').getContext('2d');
    new Chart(ctx, {
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
  
  renderChart();
  