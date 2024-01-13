document.addEventListener('DOMContentLoaded', function () {
    // Load existing reservations on page load
    loadReservations();
});

function loadReservations() {
    // Use AJAX to fetch reservations from the API
    // Assume the API endpoint is "/api/reservations"
    fetch('/api/reservations')
        .then(response => response.json())
        .then(data => displayReservations(data))
        .catch(error => console.error('Error fetching reservations:', error));
}

function displayReservations(reservations) {
    const reservationList = document.getElementById('reservationList');
    reservationList.innerHTML = '';

    reservations.forEach(reservation => {
        const reservationItem = document.createElement('div');
        reservationItem.innerHTML = `<strong>${reservation.guestName}</strong> - Room ${reservation.roomNumber}`;
        reservationList.appendChild(reservationItem);
    });
}

function addReservation() {
    const guestName = document.getElementById('guestName').value;
    const roomNumber = document.getElementById('roomNumber').value;

    // Use AJAX to add a new reservation to the API
    // Assume the API endpoint is "/api/reservations/add"
    fetch('/api/reservations/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guestName, roomNumber }),
    })
    .then(response => response.json())
    .then(data => {
        // Update the reservation list after adding a new reservation
        loadReservations();
    })
    .catch(error => console.error('Error adding reservation:', error));
}
