const showInputMessage = (status, message, elem) => {
  elem.classList.remove('success', 'error');
  elem.classList.add(status);
  elem.innerHTML = message;
  elem.style.display = 'block';
};

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const loginForm = document.querySelector('#login_form');
const loginEmail = document.querySelector('#login_email');
const loginPassword = document.querySelector('#login_password');

let loginValid = false;

loginEmail.addEventListener('keyup', (e) => {
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

loginPassword.addEventListener('keyup', (e) => {
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

const login = (e) => {
  e.preventDefault();
  if (loginValid === false) {
    showInputMessage('error', 'Error Occured!', loginForm.children[0]);
  } else {
    const user = {
      email: 'loginEmail.value',
      password: 'loginPassword.value',
    };

    fetch('http://localhost:9999/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then((data) => {
        if (data.status) {
          showInputMessage('error', data.message, loginForm.children[0]);
        } else {
          localStorage.setItem('token', data.token);
          showInputMessage('success', `${data.message} You will be redirected in 5secs`, loginForm.children[0]);
          window.setTimeout(() => {
            window.location = './user/index.html';
          }, 5000);
        }
      });
  }
};


loginForm.addEventListener('submit', login);
