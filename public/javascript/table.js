async function loadRentalTable() {
    const response = await fetch('http://localhost:3000/api/ver');
    const rentals = await response.json();
  
    const tableBody = document.getElementById('rentalTable').getElementsByTagName('tbody')[0];
    rentals.forEach(rental => {
      const row = tableBody.insertRow();
      row.insertCell(0).innerText = rental.city;
      row.insertCell(1).innerText = rental.price;
    });
  }
  
  loadRentalTable();
  