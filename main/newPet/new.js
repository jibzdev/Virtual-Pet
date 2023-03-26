import * as pet from '/pet.mjs' ;
const selectedDuckColor = localStorage.getItem('selectedDuckColor');
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
    document.querySelector(theDiv).innerHTML = `
    <svg width="200" height="250" id="theDuck">
    <circle cx="100" cy="125" r="50" fill="yellow" />
    <circle cx="110" cy="80" r="40" fill="yellow"/>
    <circle id="theDuckEye" cx="130" cy="70" r="10" fill="white" stroke="black" stroke-width="3" />
    <circle id="theDuckIris" cx="130" cy="70" r="3" fill="black" stroke="black" stroke-width="3" />
    <line x1="100" y1="175" x2="100" y2="200" stroke="black" stroke-width="4" />
    <line x1="100" y1="200" x2="125" y2="200" stroke="black" stroke-width="4" />
    <polygon points="15 5, 25 25, 5 25" style="fill: orange; order: -1;" transform="translate(170,55) rotate(90)"/>
    </svg>
    `;
  }
  else if (selectedDuckColor === "redDuck"){
    document.querySelector(theDiv).innerHTML = `
    <svg width="200" height="250" id="theDuck">
    <circle cx="100" cy="125" r="50" fill="red" />
    <circle cx="110" cy="80" r="40" fill="red"/>
    <circle id="theDuckEye" cx="130" cy="70" r="10" fill="white" stroke="black" stroke-width="3" />
    <circle id="theDuckIris" cx="130" cy="70" r="3" fill="black" stroke="black" stroke-width="3" />
    <line x1="100" y1="175" x2="100" y2="200" stroke="black" stroke-width="4" />
    <line x1="100" y1="200" x2="125" y2="200" stroke="black" stroke-width="4" />
    <polygon points="15 5, 25 25, 5 25" style="fill: orange; order: -1;" transform="translate(170,55) rotate(90)"/>
    </svg>
    `;
  }
  else{
    document.querySelector(theDiv).innerHTML = `
    <svg width="200" height="250" id="theDuck">
    <circle cx="100" cy="125" r="50" fill="blue" />
    <circle cx="110" cy="80" r="40" fill="blue"/>
    <circle id="theDuckEye" cx="130" cy="70" r="10" fill="white" stroke="black" stroke-width="3" />
    <circle id="theDuckIris" cx="130" cy="70" r="3" fill="black" stroke="black" stroke-width="3" />
    <line x1="100" y1="175" x2="100" y2="200" stroke="black" stroke-width="4" />
    <line x1="100" y1="200" x2="125" y2="200" stroke="black" stroke-width="4" />
    <polygon points="15 5, 25 25, 5 25" style="fill: orange; order: -1;" transform="translate(170,55) rotate(90)"/>
    </svg>
    `;
  }
};

// Naming The Pet
function NameThePet() {
    let Name = document.querySelector("#petName").value;
    pet.setName(Name);
    pet.setColour(selectedDuckColor);
    document.querySelector("#petHeader").textContent = "Name: " + pet.getName();
    document.querySelector("#Hunger").textContent = "Hunger: " + pet.getHunger();
    document.querySelector("#Health").textContent = "Health: " + "%" + pet.getHealth();
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
      document.querySelector("#Health").textContent = "Health: " + pet.getHealth();
    }
    if(health == 0){
      let endGame = document.createElement('div');
      endGame.setAttribute('id', 'endGame');
      endGame.innerHTML = `
      <h1>GAME OVER PET HAS DIED</h1>
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
        document.querySelector("#Health").textContent = "Health: " + pet.getHealth();
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
        NameThePet();
        decHunger();
        decHealth();
        document.querySelector("#givefood").addEventListener("click", () =>{
          let hunger = pet.getHunger();
          hunger++;
          pet.setHunger(hunger);
        });
        document.querySelector("#saveGame").addEventListener("click", () =>{
          savePet();
        });
      }
    });
  });

const clickSound = new Audio("../assets/click.wav");
const audio = document.getElementById('my-audio');
const volumeRange = document.getElementById("volume-range");
const volumeIcon = document.querySelector(".fa-volume-up");

function setupButtonEventListeners() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      clickSound.play();
    });
  });
}

  window.addEventListener('click', () => {
    audio.play();
  });
  audio.volume = volumeRange.value;
  volumeRange.addEventListener("input", function() {
    audio.volume = volumeRange.value;
    if (audio.volume == 0) {
      volumeIcon.className = "fas fa-volume-off";
    } else if (audio.volume <= 0.5) {
      volumeIcon.className = "fas fa-volume-down";
    } else {
      volumeIcon.className = "fas fa-volume-up";
    }
  });
  volumeRange.addEventListener("click", function() {
    if (volumeRange.value == 0) {
      audio.muted = true;
    } else {
      audio.muted = false;
    }
  });