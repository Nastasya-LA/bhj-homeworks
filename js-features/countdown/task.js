const timerElement = document.querySelector('#timer');

let secondsRemaining = parseInt(timerElement.textContent);

function updateTimer() {
  secondsRemaining -= 1;

  timerElement.textContent = secondsRemaining.toString();

  if (secondsRemaining <= 0) {
    clearInterval(intervalId);
    alert('Вы победили в конкурсе!');
  }
}

const intervalId = setInterval(updateTimer, 1000);
