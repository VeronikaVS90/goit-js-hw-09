const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');

console.dir(stopButton);
stopButton.disabled = true;

let intervalId = null;

startButton.addEventListener('click', startChangeColor);
stopButton.addEventListener('click', stopChangeColor);

function startChangeColor() {
    stopButton.disabled = false;
    startButton.disabled = true;

    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopChangeColor() {
    startButton.disabled = false;
    stopButton.disabled = true;

    clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
