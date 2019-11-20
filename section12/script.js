var button = document.getElementById('enter');
var input = document.getElementById('userinput');
var ul = document.querySelector('ul');

function inputLength() {
  return input.value.length;
}

function getNewDeleteButton() {
  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'delete';
  console.log(deleteButton);
  deleteButton.addEventListener('click', deleteButtonClickHandler);
  return deleteButton;
}

function deleteButtonClickHandler(event) {
  event.target.parentNode.remove();
}

function createListElement() {
  var li = document.createElement('li');

  li.addEventListener('click', () => li.classList.toggle('done'));
  li.appendChild(document.createTextNode(input.value));
  li.appendChild(getNewDeleteButton());
  ul.appendChild(li);
  input.value = '';
}

function addListAfterClick() {
  if (inputLength() > 0) {
    createListElement();
  }
}

function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    createListElement();
  }
}

button.addEventListener('click', addListAfterClick);

input.addEventListener('keypress', addListAfterKeypress);
