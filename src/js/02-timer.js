import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import Motiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
const layoutDays = document.querySelector('[data-days]');
const layoutHours = document.querySelector('[data-hours]');
const layoutMinutes = document.querySelector('[data-minutes]');
const layoutSeconds = document.querySelector('[data-seconds]');

buttonStart.disabled = true;

let totalTime = null;
let timer = null;
const TIMER_STEP = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] < new Date()) {
          buttonStart.disabled = true;
          Notiflix.Notify.success('Please choose a date in the future😎', {
              timeout: 2000,
              success: {
                  background: '#ff5549',
              },
          });
          return;
      }
      else {
          buttonStart.disabled = false;
          totalTime = selectedDates[0];
      }
  },
};

flatpickr('#datetime-picker', options);
buttonStart.addEventListener('click', countDownTimer);

function countDownTimer() {
    timer = setInterval(() => {
        let timeToEnd = totalTime - new Date();
        if (timeToEnd < 0) {
            console.log('The end');
            clearInterval(timer);
            return;
        }

        const timeObject = convertMs(timeToEnd);
        layOutCounter(timeObject);
    }, TIMER_STEP);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function layOutCounter(timeObject) {
    const { days, hours, minutes, seconds } = timeObject; 
    
    layoutDays.textContent = addLeadingZero(days);
  layoutHours.textContent = addLeadingZero(hours);
  layoutMinutes.textContent = addLeadingZero(minutes);
  layoutSeconds.textContent = addLeadingZero(seconds);
}