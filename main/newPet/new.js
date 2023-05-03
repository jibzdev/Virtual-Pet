import * as pet from '../assets/petStuff/pet.mjs' ;
import * as svg from '../assets/petStuff/petSvg.js' ;

let time = Date.now();
let timeSurvived  = 0;
let devTools = localStorage.getItem("devTools");

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
    document.querySelector("#hunger").textContent = "Hunger: " + pet.getHunger();
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
        }
    }
    if (hunger > 0) {
      hunger--;
      pet.setHunger(hunger);
      document.querySelector("#hunger").textContent = "Hunger: " + pet.getHunger();
      document.querySelector("#petHunger").value = pet.getHunger();
    }
  }, 3000);
};

let activity = "default";
let decreasing;
let increaseSleep;
let svgState;
let increaseClean;
let decrease2;

// Decrease Sleep
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
    if (activity === "default"){
      if (increaseSleep) {
        clearInterval(increaseSleep);
        increaseSleep = null;
        decreasing = setInterval(decreaseSleepValue, 7000);
        sleepButton.textContent = "Sleep";
        updateSvg();
        activity = "default";
      } else {
        activity = "sleeping";
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
            notify("Pet is fully awake!","sleep");
            clearInterval(increaseSleep);
            increaseSleep = null;
            decreasing = setInterval(decreaseSleepValue, 7000);
            sleepButton.textContent = "Sleep";
            updateSvg();
            activity = "default";
          }
        }, 500);
      }
    }
    else if(activity === "sleeping"){
      clearInterval(increaseSleep);
      increaseSleep = null;
      decreasing = setInterval(decreaseSleepValue, 7000);
      sleepButton.textContent = "Sleep";
      updateSvg();
      activity = "default";
    }
    else{
      notify("Pet is showering!","sleep")
    }
  });
};


// Decrease Clean

function decreaseCleanValue() {
  let clean = pet.getClean();

  if (clean > 0) {
    if (clean <= 50 && svgState !== "dirty") {
      svg.changeSvgToDirty(selectedDuckColor);
      svgState = "dirty";
    } else if (clean > 50 && svgState !== "default") {
      svg.changeSvgToDefault(selectedDuckColor);
      svgState = "default";
    }

    clean--;
    pet.setClean(clean);
    document.querySelector("#clean").textContent = "Cleanliness: " + pet.getClean();
    document.querySelector("#petCleaner").value = pet.getClean();
  }
}

function decreaseClean() {
  decrease2 = setInterval(decreaseCleanValue, 10000);

  let cleanButton = document.querySelector("#giveClean");

  cleanButton.addEventListener("click", () => {
    if (activity == "default"){
      if (increaseClean) {
        clearInterval(increaseClean);
        increaseClean = null;
        decrease2 = setInterval(decreaseCleanValue, 10000);
        cleanButton.textContent = "Clean";
        svg.changeSvgToDefault(selectedDuckColor);
        activity = "default";
      } else {
        activity = "cleaning";
        clearInterval(decrease2);
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
            activity = "default";
            notify("Your Pet Is Fully Clean! 💦", "clean");
            clearInterval(increaseClean);
            increaseClean = null;
            decrease2 = setInterval(decreaseCleanValue, 10000);
            cleanButton.textContent = "Clean";
            svg.changeSvgToDefault(selectedDuckColor);
          }
        }, 500);
      }
    }
    else if(activity === "cleaning"){
      clearInterval(increaseClean);
      increaseClean = null;
      decrease2 = setInterval(decreaseCleanValue, 10000);
      cleanButton.textContent = "Clean";
      svg.changeSvgToDefault(selectedDuckColor);
      activity = "default";
    }
    else{
      notify("Pet is sleeping","clean")
    }
  });
};


// Decreasing Health
let prevHunger = pet.getHunger();
let prevClean = pet.getClean();
let prevSleep = pet.getSleep();

function decHealth() {
  let health = pet.getHealth();
  let hunger = pet.getHunger();
  let clean = pet.getClean();
  let sleep = pet.getSleep();

  if (hunger <= 35 && prevHunger > 35 || clean <= 50 && prevClean > 50 || sleep <= 50 && prevSleep > 50) {
    health -= 33;
  }
  else if(hunger > 55 && prevHunger <= 55 || clean > 50 && prevClean <= 50 || sleep > 50 && prevSleep <= 50){
    health += 33;
  }

  pet.setHealth(health);
  document.querySelector("#petHealthBar").value = pet.getHealth();
  
  prevHunger = hunger;
  prevClean = clean;
  prevSleep = sleep;
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
    set += 1;
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
  
let previousPayload = null;

async function savePet() {
  const id = pet.getId();
  notify("Pet Saved. 💾","sleep");
  const currentTime = new Date().getTime();
  let payload = {
    id: id,
    name: pet.getName(),
    hunger: pet.getHunger(),
    clean: pet.getClean(),
    sleep: pet.getSleep(),
    health: pet.getHealth(),
    colour: pet.getColour(),
    time: currentTime
  };
  console.log('Payload:', payload);

  if (JSON.stringify(payload) === JSON.stringify(previousPayload)) {
    console.log('Same data as previous save. Skipping save operation.');
    notify("No Changes Were Made.","clean");
    return;
  }

  try {
    let response = await fetch('../pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });
    console.log(response);

    previousPayload = payload;
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
  const saveGame = document.querySelector("#saveGame");
  buttons.classList.add("hidden");
  saveGame.classList.add("hidden");
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
    if(devTools === "true"){
      let devToolsArea = document.createElement("section");
      let area = document.querySelector("#buttons");
      let decreaseHungerButton = document.createElement("button");
      decreaseHungerButton.setAttribute("id","decreaseHungerButton");
      decreaseHungerButton.textContent = "Decrease Hunger 🔨";
      let decreaseCleanButton = document.createElement("button");
      decreaseCleanButton.setAttribute("id","decreaseCleanButton");
      decreaseCleanButton.textContent = "Decrease Clean 🔨";
      let decreaseSleepButton = document.createElement("button");
      decreaseSleepButton.setAttribute("id","decreaseSleepButton");
      decreaseSleepButton.textContent = "Decrease Sleep 🔨";
      devToolsArea.append(decreaseHungerButton);
      devToolsArea.append(decreaseCleanButton);
      devToolsArea.append(decreaseSleepButton);
      area.append(devToolsArea);

      decreaseHungerButton.addEventListener("click",() =>{
        let hunger = pet.getHunger();
        if (hunger > 0) {
          hunger = Math.max(hunger - 25, 0);
          pet.setHunger(hunger);
          document.querySelector("#hunger").textContent = "Hunger: " + pet.getHunger();
          document.querySelector("#petHunger").value = pet.getHunger();
        }
      });
      
      decreaseCleanButton.addEventListener("click",() =>{
        let clean = pet.getClean();
        if (clean > 0) {
          clean = Math.max(clean - 25, 0);
          pet.setClean(clean);
          document.querySelector("#clean").textContent = "Cleanliness: " + pet.getClean();
          document.querySelector("#petCleaner").value = pet.getClean();
        }
      });
      
      decreaseSleepButton.addEventListener("click",() =>{
        let sleep = pet.getSleep();
        if (sleep > 0) {
          sleep = Math.max(sleep - 25, 0);
          pet.setSleep(sleep);
        }
      });
    }
    gettingDuckSVG("#duck2");
    buttons.classList.remove("hidden");
    stats.classList.remove("hidden");
    saveGame.classList.remove("hidden");
    document.querySelector("#stats2").classList.remove("hidden");
    mainSection.classList.add("hidden");
    document.querySelector("#theGame").classList.remove("hidden");
    NameThePet();
    decHunger();
    setInterval(decHealth,1000);
    decreaseSleep();
    decreaseClean();
    
    document.querySelector("#givefood").addEventListener("click", () => {
      if (activity === "default"){
        const hunger = pet.getHunger();
        if (hunger < 100) {
          notify("1 🍗 was given.", "hunger");
          document.querySelector("#hunger").textContent = "Hunger: " + pet.getHunger();
          document.querySelector("#petHunger").value = pet.getHunger();
        } else {
          notify("The pet is full!", "hunger");
        }
      }
      else if(activity === "cleaning"){
        notify("Pet is Showering!","clean");
      }
      else{
        notify("Pet is Sleeping!","sleep");
      }
    });
  document.querySelector("#saveGame").addEventListener("click", () =>{
    savePet();
  });
  let health = pet.getHealth();

  function checkHealth() {
    if (health <= 1) {
      clearInterval(intervalId); // clear the interval if health is <= 1
      let endGame = document.createElement('div');
      endGame.setAttribute('id', 'endGame');
      endGame.innerHTML = `
        <h1>GAME OVER PET HAS DIED</h1>
        <p>Time Survived: ${formatTime(timeSurvived)}</p>
      `;
      document.querySelector("main").style.display = "none";
      document.querySelector("body").appendChild(endGame);
    }
  }
  
  let intervalId = setInterval(() => {
    health = pet.getHealth();
    checkHealth();
  }, 500);
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

