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
  if(selectedDuckColor === "yellowDuck"){

    return "Yellow Duck";
  }
  else if (selectedDuckColor === "redDuck"){
    return "Red Duck";
  }
  else{
    return "Blue Duck";
  }
}

function gettingDuckSVG(theDiv){
  if(selectedDuckColor === "yellowDuck"){
    document.querySelector(theDiv).append(svg.createDuck("yellowDuck","yellow"));
  }
  else if (selectedDuckColor === "redDuck"){
    document.querySelector(theDiv).append(svg.createDuck("redDuck","red"));
  }
  else{
    document.querySelector(theDiv).append(svg.createDuck("blueDuck","blue"));
  }
};

// Naming The Pet
function NameThePet() {
    let Name = document.querySelector("#petName").value;
    pet.setName(Name);
    pet.setColour(selectedDuckColor);
    document.querySelector("#name").textContent = "Name: " + pet.getName();
    document.querySelector("#Hunger").textContent = "Hunger: " + pet.getHunger();
    document.querySelector("#petHealth").textContent = "Health: " + "%" + pet.getHealth();
    document.querySelector("#Sleep").textContent = "Tired: " + pet.getSleep();
    document.querySelector("#Cleanliness").textContent = "Cleanliness: " + pet.getClean();
    document.querySelector("#colour").textContent = "Pet Colour: " + pet.getColour();
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
    }
    console.log(pet.getName(),pet.getHealth(),pet.getHunger(),pet.getClean(),pet.getSleep());
  }, 1000);
};

// Decreasing Health
function decHealth() {
  let decreaseH = setInterval(() => {
    let health = pet.getHealth();
    let hunger = pet.getHunger();
    if (hunger <= 10) {
      health--;
      pet.setHealth(health);
      document.querySelector("#petHealth").textContent = "Health: " + pet.getHealth();
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
        document.querySelector("#petHealth").textContent = "Health: " + pet.getHealth();
        document.querySelector("#petHealthBar").value = pet.getHealth();
      }
    }
  }, 1000);
};


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
        mainSection.classList.add("hidden");
        document.querySelector("#theGame").classList.remove("hidden");
        NameThePet();
        decHunger();
        decHealth();
        document.querySelector("#givefood").addEventListener("click", () =>{
          let hunger = pet.getHunger();
          hunger += 2;
          pet.setHunger(hunger);
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

// Retrieve the volume value from local storage if it exists
const storedVolume = localStorage.getItem("volume");
if (storedVolume !== null) {
audio.volume = storedVolume;
volumeRange.value = storedVolume;
audio.muted = (storedVolume == 0);
volumeIcon.className = (storedVolume == 0) ? "fas fa-volume-off" : (storedVolume <= 0.5) ? "fas fa-volume-down" : "fas fa-volume-up";
}

// Update the volume value in local storage when it changes
volumeRange.addEventListener("input", function() {
const volume = volumeRange.value;
audio.volume = volume;
audio.muted = (volume == 0);
volumeIcon.className = (volume == 0) ? "fas fa-volume-off" : (volume <= 0.5) ? "fas fa-volume-down" : "fas fa-volume-up";
localStorage.setItem("volume", volume);
});

