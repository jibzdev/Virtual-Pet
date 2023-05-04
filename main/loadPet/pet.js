import * as svg from '../assets/petStuff/petSvg.js';
const devTools = localStorage.getItem('devTools');
const selectedDuckColor = localStorage.getItem('duckColour');

function gettingDuckSVG(theDiv) {
  if (selectedDuckColor === 'yellow') {
    document.querySelector(theDiv).append(svg.createDuck('yellow'));
  } else if (selectedDuckColor === 'red') {
    document.querySelector(theDiv).append(svg.createDuck('red'));
  } else {
    document.querySelector(theDiv).append(svg.createDuck('blue'));
  }
}

async function loadPet() {
  const params = new URLSearchParams(document.location.search);
  const id = params.get('ID');
  const response = await fetch(`../pets/${id}`);
  const petdetails = await response.json();
  console.log(petdetails);

  const pet = {
    id: petdetails.petId,
    name: petdetails.petName,
    hunger: petdetails.hunger,
    clean: petdetails.clean,
    sleep: petdetails.sleep,
    health: petdetails.health,
    color: petdetails.color,
    time: petdetails.time,
    setName(name) {
      this.name = name;
    },
    setHunger(hunger) {
      this.hunger = hunger;
    },
    setClean(clean) {
      this.clean = clean;
    },
    setSleep(sleep) {
      this.sleep = sleep;
    },
    setHealth(health) {
      this.health = health;
    },
  };

  return pet;
}


async function continueGame() {
  const pet = await loadPet();
  let activity = 'default';
  let decreasing;
  let increaseSleep;
  let svgState;
  let increaseClean;
  let decrease2;
  let time = Date.now();
  let timeSurvived = Math.floor((Date.now() - parseInt(pet.time)) / 1000);
  gettingDuckSVG('#duck2');

  setInterval(() => {
    const currentTime = Date.now();
    const timePassed = Math.floor((currentTime - time) / 1000);
    timeSurvived += timePassed;
    time = currentTime;
  }, 1000);

  function formatTime(time) {
    let seconds = time;
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }
  document.querySelector('#name').textContent = 'Name: ' + pet.name;
  document.querySelector('#hunger').textContent = 'Hunger: ' + pet.hunger;
  document.querySelector('#petHealthBar').value = pet.health;
  document.querySelector('#clean').textContent = 'Cleanliness: ' + pet.clean;
  document.querySelector('#petColour').textContent = 'Pet Colour: ' + pet.color;

  function decHunger() {
    setInterval(() => {
      let hunger = pet.hunger;
      if (hunger === 0) {
        const existingWarn = document.querySelector('#warn');
        if (existingWarn) {
          existingWarn.remove();
        } else {
          const warn = document.createElement('p');
          warn.setAttribute('id', 'warn');
          warn.textContent = 'Invalid Name';
          warn.style.color = 'red';
        }
      }
      if (hunger > 0) {
        hunger--;
        pet.setHunger(hunger);
        document.querySelector('#hunger').textContent = 'Hunger: ' + pet.hunger;
        document.querySelector('#petHunger').value = pet.hunger;
      }
    }, 3000);
  }

  function updateStatusText(sleep, statusText) {
    if (sleep >= 80) {
      statusText.textContent = 'Awake';
      statusText.style.color = 'green';
    } else if (sleep >= 50) {
      statusText.textContent = 'Tired';
      statusText.style.color = '#FFBF00';
    } else if (sleep >= 20) {
      statusText.textContent = 'Sleepy';
      statusText.style.color = '#CC5500';
    } else if (sleep <= 15) {
      statusText.textContent = 'Need Sleep!';
      statusText.style.color = 'red';
    }
  }

  function decreaseSleepValue() {
    let sleep = pet.sleep;
    const statusText = document.querySelector('.status');

    if (sleep > 0) {
      sleep--;
      pet.setSleep(sleep);
      updateStatusText(sleep, statusText);
    }
  }


  function decreaseSleep() {
    const sleepText = document.querySelector('#sleep');
    sleepText.textContent = 'Sleep Status: ';
    const statusText = document.createElement('span');
    statusText.classList.add('status');
    sleepText.appendChild(statusText);
    decreasing = setInterval(decreaseSleepValue, 7000);

    const sleepButton = document.querySelector('#giveSleep');

    function updateSvg() {
      if (pet.clean <= 50) {
        if (increaseSleep) {
          svg.changeSvgToDirtySleep(selectedDuckColor);
        } else {
          svg.changeSvgToDirty(selectedDuckColor);
        }
      } else {
        svg.changeSvgToDefault(selectedDuckColor);
      }
    }

    sleepButton.addEventListener('click', () => {
      if (activity === 'default') {
        if (increaseSleep) {
          clearInterval(increaseSleep);
          increaseSleep = null;
          decreasing = setInterval(decreaseSleepValue, 7000);
          sleepButton.textContent = 'Sleep';
          updateSvg();
          activity = 'default';
        } else {
          activity = 'sleeping';
          clearInterval(decreasing);
          notify('Sleepy Time 😴', 'sleep');
          statusText.textContent = 'Sleeping';
          statusText.style.color = 'black';
          if (pet.clean <= 50) {
            svg.changeSvgToDirtySleep(selectedDuckColor);
          } else {
            svg.changeSvgToSleep(selectedDuckColor);
          }
          sleepButton.textContent = 'Sleeping...';
          increaseSleep = setInterval(() => {
            let sleep = pet.sleep;
            sleep++;
            pet.setSleep(sleep);
            if (sleep >= 100) {
              notify('Pet is fully awake!', 'sleep');
              clearInterval(increaseSleep);
              increaseSleep = null;
              decreasing = setInterval(decreaseSleepValue, 7000);
              sleepButton.textContent = 'Sleep';
              updateSvg();
              activity = 'default';
            }
          }, 500);
        }
      } else if (activity === 'sleeping') {
        clearInterval(increaseSleep);
        increaseSleep = null;
        decreasing = setInterval(decreaseSleepValue, 7000);
        sleepButton.textContent = 'Sleep';
        updateSvg();
        activity = 'default';
      } else {
        notify('Pet is showering!', 'sleep');
      }
    });
  }

  function decreaseCleanValue() {
    let clean = pet.clean;

    if (clean > 0) {
      if (clean <= 50 && svgState !== 'dirty') {
        svg.changeSvgToDirty(selectedDuckColor);
        svgState = 'dirty';
      } else if (clean > 50 && svgState !== 'default') {
        svg.changeSvgToDefault(selectedDuckColor);
        svgState = 'default';
      }

      clean--;
      pet.setClean(clean);
      document.querySelector('#clean').textContent = 'Cleanliness: ' + pet.clean;
      document.querySelector('#petCleaner').value = pet.clean;
    }
  }

  function decreaseClean() {
    decrease2 = setInterval(decreaseCleanValue, 10000);

    const cleanButton = document.querySelector('#giveClean');

    cleanButton.addEventListener('click', () => {
      if (activity === 'default') {
        if (increaseClean) {
          clearInterval(increaseClean);
          increaseClean = null;
          decrease2 = setInterval(decreaseCleanValue, 10000);
          cleanButton.textContent = 'Clean';
          svg.changeSvgToDefault(selectedDuckColor);
          activity = 'default';
        } else {
          activity = 'cleaning';
          clearInterval(decrease2);
          notify('Shower Time 💦', 'clean');
          svg.changeSvgToShower(selectedDuckColor);
          cleanButton.textContent = 'Showering...';
          increaseClean = setInterval(() => {
            document.querySelector('#clean').textContent = 'Cleanliness: ' + pet.clean;
            document.querySelector('#petCleaner').value = pet.clean;
            let clean = pet.clean;
            clean++;
            pet.setClean(clean);
            if (clean >= 100) {
              activity = 'default';
              notify('Your Pet Is Fully Clean! 💦', 'clean');
              clearInterval(increaseClean);
              increaseClean = null;
              decrease2 = setInterval(decreaseCleanValue, 10000);
              cleanButton.textContent = 'Clean';
              svg.changeSvgToDefault(selectedDuckColor);
            }
          }, 500);
        }
      } else if (activity === 'cleaning') {
        clearInterval(increaseClean);
        increaseClean = null;
        decrease2 = setInterval(decreaseCleanValue, 10000);
        cleanButton.textContent = 'Clean';
        svg.changeSvgToDefault(selectedDuckColor);
        activity = 'default';
      } else {
        notify('Pet is sleeping', 'clean');
      }
    });
  }

  function notify(msg, what) {
    const notificationContainer = document.querySelector('#notification-container');
    const notifications = notificationContainer.querySelectorAll('.notification');

    if (notifications.length >= 5) {
      const oldestNotification = notifications[0];
      oldestNotification.classList.add('hidden');
      setTimeout(() => {
        oldestNotification.remove();
      }, 500);
    }

    const visibleNotifications = notificationContainer.querySelectorAll('.notification:not(.hidden)');

    if (visibleNotifications.length > 4) {
      for (let i = 4; i < visibleNotifications.length; i++) {
        visibleNotifications[i].classList.add('hidden');
      }
    }


    if (what === 'hunger' && pet.hunger >= 100) {
      msg = 'The pet is full! 😡';
    }

    const message = msg;
    const notification = document.createElement('div');
    notification.classList.add('notification', 'top-right');
    notification.textContent = message;
    notificationContainer.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('hidden');
      setTimeout(() => {
        notification.remove();
      }, 500);
    }, 5000);
  }

  let prevHunger = pet.hunger;
  let prevClean = pet.clean;
  let prevSleep = pet.sleep;

  function decHealth() {
    let health = pet.health;
    const hunger = pet.hunger;
    const clean = pet.clean;
    const sleep = pet.sleep;

    if ((hunger <= 35 && prevHunger > 35) || (clean <= 50 && prevClean > 50) || (sleep <= 50 && prevSleep > 50)) {
      health -= 33;
    } else if ((hunger > 55 && prevHunger <= 55) || (clean > 50 && prevClean <= 50) || (sleep > 50 && prevSleep <= 50)) {
      health += 33;
    }

    pet.setHealth(health);
    document.querySelector('#petHealthBar').value = pet.health;

    prevHunger = hunger;
    prevClean = clean;
    prevSleep = sleep;
  }

  let previousPayload = null;
  async function savePet() {
    const id = pet.id;
    notify('Pet Saved. 💾', 'sleep');
    const currentTime = new Date().getTime();
    const payload = {
      id: id,
      name: pet.name,
      hunger: pet.hunger,
      clean: pet.clean,
      sleep: pet.sleep,
      health: pet.health,
      colour: pet.color,
      time: currentTime,
    };
    console.log('Payload:', payload);

    if (JSON.stringify(payload) === JSON.stringify(previousPayload)) {
      console.log('Same data as previous save. Skipping save operation.');
      notify('No Changes Were Made.', 'clean');
      return;
    }

    try {
      const response = await fetch('../pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log(response);

      previousPayload = payload;
    } catch (error) {
      console.error(error);
    }
  }

  if (devTools === 'true') {
    const devToolsArea = document.createElement('section');
    const area = document.querySelector('#buttons');
    const decreaseHungerButton = document.createElement('button');
    decreaseHungerButton.setAttribute('id', 'decreaseHungerButton');
    decreaseHungerButton.textContent = 'Decrease Hunger 🔨';
    const decreaseCleanButton = document.createElement('button');
    decreaseCleanButton.setAttribute('id', 'decreaseCleanButton');
    decreaseCleanButton.textContent = 'Decrease Clean 🔨';
    const decreaseSleepButton = document.createElement('button');
    decreaseSleepButton.setAttribute('id', 'decreaseSleepButton');
    decreaseSleepButton.textContent = 'Decrease Sleep 🔨';
    devToolsArea.append(decreaseHungerButton);
    devToolsArea.append(decreaseCleanButton);
    devToolsArea.append(decreaseSleepButton);
    area.append(devToolsArea);

    decreaseHungerButton.addEventListener('click', () => {
      let hunger = pet.hunger;
      if (hunger > 0) {
        hunger = Math.max(hunger - 25, 0);
        pet.setHunger(hunger);
        document.querySelector('#hunger').textContent = 'Hunger: ' + pet.hunger;
        document.querySelector('#petHunger').value = pet.hunger;
      }
    });

    decreaseCleanButton.addEventListener('click', () => {
      let clean = pet.clean;
      if (clean > 0) {
        clean = Math.max(clean - 25, 0);
        pet.setClean(clean);
        document.querySelector('#clean').textContent = 'Cleanliness: ' + pet.clean;
        document.querySelector('#petCleaner').value = pet.clean;
      }
    });

    decreaseSleepButton.addEventListener('click', () => {
      let sleep = pet.sleep;
      if (sleep > 0) {
        sleep = Math.max(sleep - 25, 0);
        pet.setSleep(sleep);
      }
    });
  }

  let health = pet.health;

  function checkHealth() {
    if (health <= 1) {
      clearInterval(intervalId);
      const endGame = document.createElement('div');
      endGame.setAttribute('id', 'endGame');
      endGame.innerHTML = `
            <h1>GAME OVER PET HAS DIED</h1>
            <p>Time Survived: ${formatTime(timeSurvived)}</p>
          `;
      document.querySelector('main').style.display = 'none';
      document.querySelector('body').appendChild(endGame);
    }
  }

  const intervalId = setInterval(() => {
    health = pet.health;
    checkHealth();
  }, 500);

  setInterval(decHealth, 1000);
  decreaseClean();
  decHunger();
  decreaseSleep();

  document.querySelector('#givefood').addEventListener('click', () => {
    if (activity === 'default') {
      let hunger = pet.hunger;
      if (hunger < 100) {
        hunger++;
        pet.setHunger(hunger);
        notify('1 🍗 was given.', 'hunger');
        document.querySelector('#hunger').textContent = 'Hunger: ' + pet.hunger;
        document.querySelector('#petHunger').value = pet.hunger;
      } else {
        notify('The pet is full!', 'hunger');
      }
    } else if (activity === 'cleaning') {
      notify('Pet is Showering!', 'clean');
    } else {
      notify('Pet is Sleeping!', 'sleep');
    }
  });
  document.querySelector('#saveGame').addEventListener('click', () => {
    savePet();
  });
}

window.addEventListener('load', continueGame);

// Audio Stuff
const clickSound = new Audio('../assets/music/click.wav');
const audio = document.querySelector('#my-audio');
const volumeRange = document.querySelector('#volume-range');
const volumeIcon = document.querySelector('.fa-volume-up');

document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === 'BUTTON') {
    clickSound.play();
  }
});


const storedVolume = localStorage.getItem('volume');
if (storedVolume !== null) {
  audio.volume = storedVolume;
  volumeRange.value = storedVolume;
  audio.muted = (storedVolume === 0);
  volumeIcon.className = (storedVolume === 0) ? 'fas fa-volume-off' : (storedVolume <= 0.5) ? 'fas fa-volume-down' : 'fas fa-volume-up';
}


volumeRange.addEventListener('input', function () {
  const volume = volumeRange.value;
  audio.volume = volume;
  audio.muted = (volume === 0);
  volumeIcon.className = (volume === 0) ? 'fas fa-volume-off' : (volume <= 0.5) ? 'fas fa-volume-down' : 'fas fa-volume-up';
  localStorage.setItem('volume', volume);
});
