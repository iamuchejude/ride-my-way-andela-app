const SHOW_INPUT_MESSAGE = (status, message, elem) => {
  elem.classList.remove('success', 'error');
  elem.classList.add(status);
  elem.innerHTML = message;
  elem.style.display = 'block';
};

export default SHOW_INPUT_MESSAGE;