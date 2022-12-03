const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

let intervalID = null;

refs.start.addEventListener('click', onStartButtonClick);
refs.stop.addEventListener('click', onStopButtonClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartButtonClick() {
  intervalID = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  refs.start.disabled = true;
}

function onStopButtonClick() {
  clearInterval(intervalID);
  refs.start.disabled = false;
}
