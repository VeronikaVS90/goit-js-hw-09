import Notiflix from 'notiflix';

const form = document.querySelector('.form');
let mainDelay = 0;

form.addEventListener('submit', promiceGenerator);

function promiceGenerator(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);
  let amountValue = Number(amount.value);

  mainDelay = delayValue;

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, mainDelay);
    mainDelay += stepValue;
  }
}


function createPromise(position, delay) {
  const promice = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promice
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.success(`❌ Rejected promise ${position} in ${delay}ms`, {
        success: {
          background: '#ff5549',
        },
      });
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
