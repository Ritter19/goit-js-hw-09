function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let colorChangeInterval = null;
stopBtn.disabled = true;

function startColorChange() {
  colorChangeInterval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  stopBtn.disabled = false;
  startBtn.disabled = true;
}

function stopColorChange() {
  clearInterval(colorChangeInterval);
  stopBtn.disabled = true;
  startBtn.disabled = false;
}

startBtn.addEventListener('click', startColorChange);
stopBtn.addEventListener('click', stopColorChange);

// my style
const buttonContainer = document.createElement('div');
buttonContainer.style.display = 'flex';
buttonContainer.style.flexDirection = 'column';
buttonContainer.style.alignItems = 'center';
buttonContainer.style.justifyContent = 'center';
buttonContainer.style.height = '100vh';
buttonContainer.style.gap = '20px';

body.appendChild(buttonContainer);
buttonContainer.appendChild(startBtn);
buttonContainer.appendChild(stopBtn);

[startBtn, stopBtn].forEach(btn => {
  btn.style.fontSize = '2rem';
  btn.style.padding = '15px 30px';
  btn.style.cursor = 'pointer';
  btn.style.borderRadius = '10px';
  btn.style.border = 'none';
  btn.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
});
