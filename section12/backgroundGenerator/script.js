var css = document.querySelector('h3');
var color1 = document.querySelector('.color1');
var color2 = document.querySelector('.color2');
var body = document.getElementById('gradient');
var randomColor = document.getElementById('randomColorButton');
console.log(randomColor);

const setRandomColors = () => {
  const getRandomXDigitHexNumber = x => {
    const getRandomHexDigit = () => Math.floor(Math.random() * 16).toString(16);

    return new Array(x)
      .fill(null)
      .map(getRandomHexDigit)
      .join('');
  };

  const getRandomColor = () => '#' + getRandomXDigitHexNumber(6);

  color1.value = getRandomColor();
  color2.value = getRandomColor();
  setGradient();
};

function setGradient() {
  body.style.background =
    'linear-gradient(to right, ' + color1.value + ', ' + color2.value + ')';

  css.textContent = body.style.background + ';';
}

// Event Listeners

color1.addEventListener('input', setGradient);
color2.addEventListener('input', setGradient);
randomColor.addEventListener('click', setRandomColors);

setGradient();
