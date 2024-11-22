async function fetchRentalData() {
  const response = await fetch('http://localhost:3000/api/ver');
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return await response.json();
}

function renderTable(data) {
  const tableBody = document.getElementById('rentalTable').querySelector('tbody');
  tableBody.innerHTML = ''; // Limpiar la tabla

  data.forEach(rental => {
      const row = document.createElement('tr');
      const cityCell = document.createElement('td');
      const priceCell = document.createElement('td');
      const habsCell = document.createElement('td');
      const sourceCell = document.createElement('td');

      cityCell.textContent = rental.city;
      priceCell.textContent = rental.price;
      habsCell.textContent = rental.habs;
      sourceCell.textContent = rental.source

      row.appendChild(cityCell);
      row.appendChild(priceCell);
      row.appendChild(habsCell)
      row.appendChild(sourceCell)
      tableBody.appendChild(row);
  });
}

function renderCityDropdown(rentals) {
  const cityFilter = document.getElementById('cityFilter');
  const uniqueCities = [...new Set(rentals.map(r => r.city))];

  uniqueCities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      cityFilter.appendChild(option);
  });
}

function applyFilters(rentals) {
  const cityFilter = document.getElementById('cityFilter').value;
  const orderFilter = document.getElementById('orderFilter').value;

  // Filtrar por ciudad
  let filteredRentals = cityFilter === 'all'
      ? rentals
      : rentals.filter(rental => rental.city === cityFilter);

  // Ordenar los datos
  if (orderFilter === 'asc') {
      filteredRentals.sort((a, b) => a.price - b.price);
  } else if (orderFilter === 'desc') {
      filteredRentals.sort((a, b) => b.price - a.price);
  }

  // Renderizar la tabla con los datos filtrados y ordenados
  renderTable(filteredRentals);
}

async function initialize() {
  const rentals = await fetchRentalData();

  renderTable(rentals); // Renderizar la tabla inicial
  renderCityDropdown(rentals); // Renderizar el filtro de ciudades

  // Añadir eventos a los filtros
  document.getElementById('cityFilter').addEventListener('change', () => applyFilters(rentals));
  document.getElementById('orderFilter').addEventListener('change', () => applyFilters(rentals));
}

initialize();
