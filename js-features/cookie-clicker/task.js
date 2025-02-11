const cookie = document.getElementById('cookie');
const counterElement = document.getElementById('clicker__counter');
let clickCounter = 0;

function handleClick() {
  clickCounter++;

  counterElement.textContent = clickCounter;

  const currentWidth = parseInt(cookie.style.width) || 200;
  const newWidth = currentWidth + (Math.random() * 20 - 10);

  cookie.style.width = `${newWidth}px`;
  cookie.style.height = `${newWidth}px`;
}

cookie.addEventListener('click', handleClick);


