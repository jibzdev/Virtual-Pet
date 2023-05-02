import * as pet from '../assets/petStuff/pet.mjs' ;
import * as svg from '../assets/petStuff/petSvg.js' ;

let time = Date.now();
let timeSurvived  = 0;

setInterval(() => {
  timeSurvived = Math.floor((Date.now() - time) / 1000);
}, 1000);

function formatTime(time) {
  let seconds = time;
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  seconds %= 60;
  minutes %= 60;
  hours %= 24;

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

const selectedDuckColor = localStorage.getItem('duckColour');
const mainSection = document.querySelector("#createPet");

function gettingDuckName(){
  if(selectedDuckColor === "yellow"){

    return "Yellow Duck";
  }
  else if (selectedDuckColor === "red"){
    return "Red Duck";
  }
  else if (selectedDuckColor === "blue"){
    return "Blue Duck";
  }
}

function gettingDuckSVG(theDiv){
  if(selectedDuckColor === "yellow"){
    document.querySelector(theDiv).append(svg.createDuck("yellow"));
  }
  else if (selectedDuckColor === "red"){
    document.querySelector(theDiv).append(svg.createDuck("red"));
  }
  else{
    document.querySelector(theDiv).append(svg.createDuck("blue"));
  }
};

// Naming The Pet
function NameThePet() {
    let Name = document.querySelector("#petName").value;
    pet.setName(Name);
    pet.setColour(selectedDuckColor);
    document.querySelector("#name").textContent = "Name: " + pet.getName();
    document.querySelector("#Hunger").textContent = "Hunger: " + pet.getHunger();
    document.querySelector("#petHealthBar").value = pet.getHealth();
    document.querySelector("#clean").textContent = "Cleanliness: " + pet.getClean();
    document.querySelector("#petColour").textContent = "Pet Colour: " + pet.getColour();
};

// decreasing Hunger
function decHunger() {
  let decreaseHungerTime = setInterval(() => {
    let hunger = pet.getHunger();
    if (hunger === 0) {
        const existingWarn = document.querySelector("#warn");
        if (existingWarn) {
          existingWarn.remove();
        }
        else{
            const warn = document.createElement("p");
            warn.setAttribute("id", "warn");
            warn.textContent = "Invalid Name";
            warn.style.color = "red";
        }
    }
    if (hunger > 0) {
      hunger--;
      pet.setHunger(hunger);
      document.querySelector("#Hunger").textContent = "Hunger: " + pet.getHunger();
      document.querySelector("#petHunger").value = pet.getHunger();
    }
    console.log(`
  Name: ${pet.getName()}
  Health: ${pet.getHealth()}
  Hunger: ${pet.getHunger()}
  Cleanliness: ${pet.getClean()}
  Sleep: ${pet.getSleep()}
`);
  }, 3000);
};

// Decrease Sleep

let decreasing;
let increaseSleep;

function updateStatusText(sleep, statusText) {
  if (sleep >= 80) {
    statusText.textContent = "Awake";
    statusText.style.color = "green";
  } else if (sleep >= 50) {
    statusText.textContent = "Tired";
    statusText.style.color = "#FFBF00";
  } else if (sleep >= 20) {
    statusText.textContent = "Sleepy";
    statusText.style.color = "#CC5500";
  } else if (sleep <= 15) {
    statusText.textContent = "Need Sleep!";
    statusText.style.color = "red";
  }
}

function decreaseSleepValue() {
  let sleep = pet.getSleep();
  let statusText = document.querySelector(".status");

  if (sleep > 0) {
    sleep--;
    pet.setSleep(sleep);
    updateStatusText(sleep, statusText);
  }
}


function decreaseSleep() {
  let sleepText = document.querySelector("#sleep");
  sleepText.textContent = "Sleep Status: ";
  let statusText = document.createElement("span");
  statusText.classList.add("status");
  sleepText.appendChild(statusText);
  decreasing = setInterval(decreaseSleepValue, 7000);

  let sleepButton = document.querySelector("#giveSleep");
  
  function updateSvg() {
    if(pet.getClean() <= 50) {
      if(increaseSleep) {
        svg.changeSvgToDirtySleep(selectedDuckColor);
      } else {
        svg.changeSvgToDirty(selectedDuckColor);
      }
    } else {
      svg.changeSvgToDefault(selectedDuckColor);
    }
  }

  sleepButton.addEventListener("click", () => {
    if (increaseSleep) {
      clearInterval(increaseSleep);
      increaseSleep = null;
      decreasing = setInterval(decreaseSleepValue, 7000);
      sleepButton.textContent = "Sleep";
      updateSvg();
    } else {
      clearInterval(decreasing);
      notify("Sleepy Time 😴", "sleep");
      statusText.textContent = "Sleeping";
      statusText.style.color = "black";
      if(pet.getClean() <= 50) {
        svg.changeSvgToDirtySleep(selectedDuckColor);
      } else {
        svg.changeSvgToSleep(selectedDuckColor);
      }
      sleepButton.textContent = "Sleeping...";
      increaseSleep = setInterval(() => {
        let sleep = pet.getSleep();
        sleep++;
        pet.setSleep(sleep);
        if (sleep >= 100) {
          clearInterval(increaseSleep);
          increaseSleep = null;
          decreasing = setInterval(decreaseSleepValue, 7000);
          sleepButton.textContent = "Sleep";
          updateSvg();
        }
      }, 1000);
    }
  });
};


// Decrease Clean

function decreaseCleanValue() {
  let clean = pet.getClean();

  if (clean > 0) {
    clean--;
    pet.setClean(clean);
    document.querySelector("#clean").textContent = "Cleanliness: " + pet.getClean();
    document.querySelector("#petCleaner").value = pet.getClean();
  }
}

let increaseClean;

function decreaseClean() {
  decreasing = setInterval(decreaseCleanValue, 1000);

  let cleanButton = document.querySelector("#giveClean");

  cleanButton.addEventListener("click", () => {
    if (increaseClean) {
      clearInterval(increaseClean);
      increaseClean = null;
      decreasing = setInterval(decreaseCleanValue, 1000);
      cleanButton.textContent = "Clean";
      svg.changeSvgToDefault(selectedDuckColor);
    } else {
      clearInterval(decreasing);
      notify("Shower Time 💦", "clean");
      svg.changeSvgToShower(selectedDuckColor);
      cleanButton.textContent = "Showering...";
      increaseClean = setInterval(() => {
        document.querySelector("#clean").textContent = "Cleanliness: " + pet.getClean();
        document.querySelector("#petCleaner").value = pet.getClean();
        let clean = pet.getClean();
        clean++;
        pet.setClean(clean);
        if (clean >= 100) {
          notify("Your Pet Is Fully Clean! 💦", "clean");
          clearInterval(increaseClean);
          increaseClean = null;
          decreasing = setInterval(decreaseCleanValue, 1000);
          cleanButton.textContent = "Clean";
          svg.changeSvgToDefault(selectedDuckColor);
        }
      }, 500);
    }
  });
};


// Decreasing Health
function decHealth() {
  let decreaseH = setInterval(() => {
    let health = pet.getHealth();
    let hunger = pet.getHunger();
    if (hunger <= 10) {
      health--;
      pet.setHealth(health);
      document.querySelector("#petHealthBar").value = pet.getHealth();
    }
    if(health == 0){
      let endGame = document.createElement('div');
      endGame.setAttribute('id', 'endGame');
      endGame.innerHTML = `
      <h1>GAME OVER PET HAS DIED</h1>
      <p>Time Survived: ${formatTime(timeSurvived)}</p>
      `;
      clearInterval(decreaseH);
      document.querySelector("main").style.display = "none";
      document.querySelector("body").appendChild(endGame);
    }
    if (hunger >= 75){
      if(health === 100){

      }
      else{
        health++;
        pet.setHealth(health);
        document.querySelector("#petHealthBar").value = pet.getHealth();
      }
    }
  }, 1500);
};


function notify(msg, what) {
  const notificationContainer = document.querySelector("#notification-container");
  const notifications = notificationContainer.querySelectorAll(".notification");
  
  if (notifications.length >= 5) {
    const oldestNotification = notifications[0];
    oldestNotification.classList.add("hidden");
    setTimeout(() => {
      oldestNotification.remove();
    }, 500);
  }
  
  const visibleNotifications = notificationContainer.querySelectorAll(".notification:not(.hidden)");
  
  if (visibleNotifications.length > 4) {
    for (let i = 4; i < visibleNotifications.length; i++) {
      visibleNotifications[i].classList.add("hidden");
    }
  }

  let set = pet[getMethodName(what)]();

  if (what === "hunger" && set < 100) {
    set += 2;
    pet[setMethodName(what)](set);
  }

  if (what === "hunger" && set >= 100) {
    msg = "The pet is full! 😡";
  }

  if (what === "clean") {
  }

  
  if (what === "sleep") {
  }

  const message = msg;
  const notification = document.createElement("div");
  notification.classList.add("notification", "top-right");
  notification.textContent = message;
  notificationContainer.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("hidden");
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 5000);
};

function getMethodName(what) {
  switch (what) {
    case "hunger":
      return "getHunger";
    case "clean":
      return "getClean";
    case "sleep":
      return "getSleep";
    default:
      throw new Error(`Invalid parameter: ${what}`);
  }
}

function setMethodName(what) {
  switch (what) {
    case "hunger":
      return "setHunger";
    case "clean":
      return "setClean";
    case "sleep":
      return "setSleep";
    default:
      throw new Error(`Invalid parameter: ${what}`);
  }
}
  
// Save Pet Button
async function savePet() {
  let payload = {
    name: pet.getName(),
    hunger: pet.getHunger(),
    clean: pet.getClean(),
    sleep: pet.getSleep(),
    health: pet.getHealth(),
    colour: pet.getColour(),
  };
  console.log('Payload:', payload);

  try {
    let response = await fetch('../pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener('load', () => {
  setupButtonEventListeners()
  const naming = document.querySelector("#chosenPet");
  naming.textContent = gettingDuckName();
  gettingDuckSVG("#duck1");
  const stats = document.querySelector("#stats");
  const buttons = document.querySelector("#buttons");
  buttons.classList.add("hidden");
  stats.classList.add("hidden");
  document.querySelector("#stats2").classList.add("hidden");
  document.querySelector("#theGame").classList.add("hidden");
  document.querySelector("#NameforPet").addEventListener("click", () => {
  const existingWarn = document.querySelector("#warn");
  if (existingWarn) {
    existingWarn.remove();
  }
  if (document.querySelector("#petName").value === "") {
    const warn = document.createElement("p");
    warn.setAttribute("id", "warn");
    warn.textContent = "Invalid Name";
    warn.style.color = "red";
    document.querySelector("#createPet").insertAdjacentElement("beforeend", warn);
  } else {
    gettingDuckSVG("#duck2");
    buttons.classList.remove("hidden");
    stats.classList.remove("hidden");
    document.querySelector("#stats2").classList.remove("hidden");
    mainSection.classList.add("hidden");
    document.querySelector("#theGame").classList.remove("hidden");
    NameThePet();
    decHunger();
    decHealth();
    decreaseSleep();
    decreaseClean();
    
    document.querySelector("#givefood").addEventListener("click", () => {
      const hunger = pet.getHunger();
      if (hunger < 100) {
        notify("1 🍗 was given.", "hunger");
      } else {
        notify("The pet is full!", "hunger");
      }
    });
  document.querySelector("#saveGame").addEventListener("click", () =>{
    savePet();
  });
}
});
});

// Audio Stuff
const clickSound = new Audio("../assets/music/click.wav");
const audio = document.querySelector("#my-audio");
const volumeRange = document.querySelector("#volume-range");
const volumeIcon = document.querySelector(".fa-volume-up");

function setupButtonEventListeners() {
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
button.addEventListener("click", () => {
clickSound.play();
});
});
}

document.addEventListener("click", (event) => {
const target = event.target;
if (target.tagName === "BUTTON") {
clickSound.play();
}
});


const storedVolume = localStorage.getItem("volume");
if (storedVolume !== null) {
audio.volume = storedVolume;
volumeRange.value = storedVolume;
audio.muted = (storedVolume == 0);
volumeIcon.className = (storedVolume == 0) ? "fas fa-volume-off" : (storedVolume <= 0.5) ? "fas fa-volume-down" : "fas fa-volume-up";
};


volumeRange.addEventListener("input", function() {
const volume = volumeRange.value;
audio.volume = volume;
audio.muted = (volume == 0);
volumeIcon.className = (volume == 0) ? "fas fa-volume-off" : (volume <= 0.5) ? "fas fa-volume-down" : "fas fa-volume-up";
localStorage.setItem("volume", volume);
});

