const offerRideForm = document.querySelector('#offer-a-ride-form');
const from = document.querySelector('#from');
const to = document.querySelector('#to');
const seats = document.querySelector('#seats');
const date = document.querySelector('#date');
const time = document.querySelector('#time');

let offerRideValid = false;

from.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.target.value == null || e.target.value.length < 1) {
    showInputMessage('error', 'Start location is required', e.target.nextElementSibling);
    offerRideValid = false;
  } else {
    const hasNumberAndSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9?]/;
    if (hasNumberAndSpecialCharacters.test(e.target.value)) {
      showInputMessage('error', 'Start location must contain only alphabets and spaces', e.target.nextElementSibling);
      offerRideValid = false;
    } else {
      e.target.nextElementSibling.innerHTML = '';
      e.target.nextElementSibling.style.display = 'none';
      offerRideValid = true;
    }
  }
});

to.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.target.value == null || e.target.value.length < 1) {
    showInputMessage('error', 'Destination is required', e.target.nextElementSibling);
    offerRideValid = false;
  } else {
    const hasNumberAndSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9?]/;
    if (hasNumberAndSpecialCharacters.test(e.target.value)) {
      showInputMessage('error', 'Destination must contain only alphabets and spaces', e.target.nextElementSibling);
      offerRideValid = false;
    } else {
      e.target.nextElementSibling.innerHTML = '';
      e.target.nextElementSibling.style.display = 'none';
      offerRideValid = true;
    }
  }
});


seats.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.target.value == null || e.target.value.length < 1) {
    showInputMessage('error', 'Please enter number of seats', seats.parentElement.children[2]);
    offerRideValid = false;
  } else {
    const params = /[a-zA-Z]+.+$/;
    if (params.test(e.target.value)) {
      showInputMessage('error', 'Number of seats must be integer', seats.parentElement.children[2]);
      offerRideValid = false;
    } else if (e.target.value < 1 || e.target.value > 6) {
      showInputMessage('error', 'Number of seats available must be atleast 1 and at most 6', seats.parentElement.children[2]);
      offerRideValid = false;
    } else {
      seats.parentElement.children[2].innerHTML = '';
      seats.parentElement.children[2].style.display = 'none';
      offerRideValid = true;
    }
  }
});

const offerRide = (e) => {
  e.preventDefault();
  if (offerRideValid === false) {
    showInputMessage('error', 'Error Occured!', offerRideForm.children[0]);
  } else {
    const ride = {startLocation: from.value,destination: to.value,seats: seats.value,departureDate: date.value,departureTime: time.value};

    fetch('http://localhost:9999/api/v1/users/rides', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(ride),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          showInputMessage('error', data.message, loginForm.children[0]);
        } else {
          localStorage.setItem('token', data.token);
          showInputMessage('success', `${data.message}`, loginForm.children[0]);
          window.setTimeout(() => {
            window.location = './ride_offers.html';
          }, 5000);
        };
      });
  }
};

offerRideForm.addEventListener('submit', offerRide);
