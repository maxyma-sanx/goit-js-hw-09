import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let intervalID = null;
let diffTime = null;
refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - new Date() <= 0) {
      refs.start.disabled = true;
      Notify.failure('Виберiть дату в майбутньому', {
        position: 'center-center',
        timeout: 3000,
        backOverlay: true,
        clickToClose: true,
      });
    } else {
      refs.start.disabled = false;
    }
  },
};

flatpickr(refs.input, options);

refs.start.addEventListener('click', onStartButtonClick);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onStartButtonClick() {
  refs.input.disabled = true;
  refs.start.disabled = true;

  intervalID = setInterval(() => {
    diffTime = new Date(refs.input.value) - new Date();
    updateTimerValues(diffTime);

    if (Math.floor(diffTime / 1000) <= 0) {
      Notify.success('Час вичерпано', {
        position: 'center-center',
        timeout: 3000,
        backOverlay: true,
        clickToClose: true,
      });
      clearInterval(intervalID);
      refs.input.disabled = false;
    }
  }, 1000);
}

function updateTimerValues(value) {
  const { days, hours, minutes, seconds } = convertMs(value);

  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
