'use strict';

var showInputMessage = function showInputMessage(status, message, elem) {
  elem.classList.remove('success', 'error');
  elem.classList.add(status);
  elem.innerHTML = message;
  elem.style.display = 'block';
};

var validateEmail = function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

var registerForm = document.querySelector('#register_form');
var registerName = document.querySelector('#register_name');
var registerEmail = document.querySelector('#register_email');
var registerPassword = document.querySelector('#register_password');
var registerVerifyPassword = document.querySelector('#register_verify_password');

var registerValid = false;

registerName.addEventListener('keyup', function (e) {
  e.preventDefault();

  if (e.target.value == null || e.target.value.length < 2) {
    showInputMessage('error', 'Name is required', registerName.parentElement.children[2]);
    registerValid = false;
  } else {
    var hasNumberAndSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9?]/;
    if (hasNumberAndSpecialCharacters.test(e.target.value)) {
      showInputMessage('error', 'Name must contain only alphabets and spaces', registerName.parentElement.children[2]);
      registerValid = false;
    } else if (e.target.value.split(' ').length < 2 || e.target.value.split(' ')[0].length < 1 || e.target.value.split(' ')[1].length < 1) {
      showInputMessage('error', 'Please enter your First and Last Names', registerName.parentElement.children[2]);
      registerValid = false;
    } else {
      registerName.parentElement.children[2].innerHTML = '';
      registerName.parentElement.children[2].style.display = 'none';
      registerValid = true;
    }
  }
});

registerEmail.addEventListener('keyup', function (e) {
  e.preventDefault();

  if (e.target.value === null || e.target.value.length < 1) {
    showInputMessage('error', 'Email is required', registerEmail.parentElement.children[2]);
    registerValid = false;
  } else if (validateEmail(e.target.value) !== true) {
    showInputMessage('error', 'Email is invalid', registerEmail.parentElement.children[2]);
    registerValid = false;
  } else {
    registerEmail.parentElement.children[2].innerHTML = '';
    registerEmail.parentElement.children[2].style.display = 'none';
    registerValid = true;
  }
});

registerPassword.addEventListener('keyup', function (e) {
  e.preventDefault();
  if (e.target.value == null || e.target.value.length < 1) {
    showInputMessage('error', 'Password is required', registerPassword.parentElement.children[2]);
    registerValid = false;
  } else if (e.target.value.length < 5) {
    showInputMessage('error', 'Password is too short. Password must be greater than 5 characters', registerPassword.parentElement.children[2]);
    registerValid = false;
  } else {
    registerPassword.parentElement.children[2].innerHTML = '';
    registerPassword.parentElement.children[2].style.display = 'none';
    registerValid = true;
  }
});

registerVerifyPassword.addEventListener('keyup', function (e) {
  e.preventDefault();
  if (e.target.value == null || e.target.value.length < 1) {
    showInputMessage('error', 'Password is required', registerVerifyPassword.parentElement.children[2]);
    registerValid = false;
  } else if (e.target.value !== registerPassword.value) {
    showInputMessage('error', 'Password does not match', registerVerifyPassword.parentElement.children[2]);
    registerValid = false;
  } else {
    registerVerifyPassword.parentElement.children[2].innerHTML = '';
    registerVerifyPassword.parentElement.children[2].style.display = 'none';
    registerValid = true;
  }
});

var register = function register(e) {
  e.preventDefault();
  if (registerValid === false) {
    showInputMessage('error', 'Error Occured!', registerForm.children[0]);
  } else {
    showInputMessage('success', 'Validated Successfully', registerForm.children[0]);
  }
};

registerForm.addEventListener('submit', register);