import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  datetimePicker: document.querySelector('input#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.startButton.disabled = true;

let selectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const currentTime = Date.now();

    if (selectedDate <= currentTime) {
      Notify.failure('Please choose a date in the future');
      refs.startButton.disabled = true;
    } else {
      refs.startButton.disabled = false;
    }
  },
};

flatpickr(refs.datetimePicker, options);

refs.startButton.addEventListener('click', startCountDown);

function startCountDown() {
  refs.startButton.disabled = true;
  refs.datetimePicker.disabled = true;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const timeDifference = selectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      refs.datetimePicker.disabled = false;
      Notify.success('Countdown complete!');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Apply basic CSS styling to center the timer and input
document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';
document.body.style.alignItems = 'center';
document.body.style.justifyContent = 'center';
document.body.style.minHeight = '100vh';
document.body.style.fontFamily = 'Arial, sans-serif';

// Style the timer output
const timerContainer = document.querySelector('.timer');
if (timerContainer) {
  timerContainer.style.display = 'flex';
  timerContainer.style.gap = '20px';
  timerContainer.style.marginTop = '20px';
  timerContainer.style.fontSize = '30px';
  timerContainer.style.fontWeight = 'bold';
}

// Style the input and button
refs.datetimePicker.style.padding = '10px';
refs.datetimePicker.style.fontSize = '16px';
refs.datetimePicker.style.marginBottom = '10px';

refs.startButton.style.padding = '10px 20px';
refs.startButton.style.fontSize = '16px';
refs.startButton.style.cursor = 'pointer';
refs.startButton.style.marginTop = '10px';
