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

var loginForm = document.querySelector('#login_form');
var loginEmail = document.querySelector('#login_email');
var loginPassword = document.querySelector('#login_password');

var loginValid = false;

loginEmail.addEventListener('keyup', function (e) {
  e.preventDefault();

  if (e.target.value == null || e.target.value.length < 1) {
    showInputMessage('error', 'Email is required', loginEmail.parentElement.children[2]);
    loginValid = false;
  } else if (validateEmail(e.target.value) !== true) {
    showInputMessage('error', 'Email is invalid', loginEmail.parentElement.children[2]);
    loginValid = false;
  } else {
    loginEmail.parentElement.children[2].innerHTML = '';
    loginEmail.parentElement.children[2].style.display = 'none';
    loginValid = true;
  }
});

loginPassword.addEventListener('keyup', function (e) {
  e.preventDefault();
  if (e.target.value == null || e.target.value.length < 1) {
    showInputMessage('error', 'Password is required', loginPassword.parentElement.children[2]);
    loginValid = false;
  } else {
    loginPassword.parentElement.children[2].innerHTML = '';
    loginPassword.parentElement.children[2].style.display = 'none';
    loginValid = true;
  }
});

var login = function login(e) {
  e.preventDefault();
  if (loginValid == false) {
    showInputMessage('error', 'Error Occured!', loginForm.children[0]);
  } else {
    // showInputMessage('success', 'Validated Successfully', loginForm.children[0]);
    var loginData = {
      email: loginEmail.value,
      password: loginPassword.password
    };

    fetch('http://localhost:9999/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(loginData)
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.status) {
        showInputMessage('error', data.message, loginForm.children[0]);
      } else {
        showInputMessage('success', data.message, loginForm.children[0]);
      };
    });
  }
};

loginForm.addEventListener('submit', login);