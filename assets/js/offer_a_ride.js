'use strict';

var offerRideForm = document.querySelector('#offer-a-ride-form');
var from = document.querySelector('#from');
var to = document.querySelector('#to');
var seats = document.querySelector('#seats');

var offerRideValid = false;

from.addEventListener('keyup', function (e) {
  e.preventDefault();
  if (e.target.value == null || e.target.value.length < 1) {
    showInputMessage('error', 'Start location is required', e.target.nextElementSibling);
    offerRideValid = false;
  } else {
    var hasNumberAndSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9?]/;
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

to.addEventListener('keyup', function (e) {
  e.preventDefault();
  if (e.target.value == null || e.target.value.length < 1) {
    showInputMessage('error', 'Destination is required', e.target.nextElementSibling);
    offerRideValid = false;
  } else {
    var hasNumberAndSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9?]/;
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

seats.addEventListener('keyup', function (e) {
  e.preventDefault();
  if (e.target.value == null || e.target.value.length < 1) {
    showInputMessage('error', 'Please enter number of seats', seats.parentElement.children[2]);
    offerRideValid = false;
  } else {
    var params = /[a-zA-Z]+.+$/;
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

var offerRide = function offerRide(e) {
  e.preventDefault();
  if (offerRideValid === false) {
    showInputMessage('error', 'Error Occured!', offerRideForm.children[0]);
  } else {
    showInputMessage('success', 'Validated Successfully', offerRideForm.children[0]);
  }
};

offerRideForm.addEventListener('submit', offerRide);