import * as svg from './assets/petStuff/petSvg.js' ;


// On Load
window.addEventListener('load', () => {
  runGame();
});


// Audio Stuff
const clickSound = new Audio("assets/music/click.wav");
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
}

volumeRange.addEventListener("input", function() {
const volume = volumeRange.value;
audio.volume = volume;
audio.muted = (volume == 0);
volumeIcon.className = (volume == 0) ? "fas fa-volume-off" : (volume <= 0.5) ? "fas fa-volume-down" : "fas fa-volume-up";
localStorage.setItem("volume", volume);
});


// Main Game Function
function runGame() {
  let newGameButton = document.querySelector("#newGame");
  const loadGameButton = document.querySelector("#loadGame");

  newGameButton.addEventListener("click", showChooseSection);
  loadGameButton.addEventListener("click", goToLoadPets);
};

function goToLoadPets() {
  window.location.href = "/loadPet/allPets.html";
};

function goToHomePage() {
  const section = document.querySelector("section");
  const headerr = document.createElement("h1");
  const versions = document.createElement("p");
  headerr.textContent = "Welcome to Virtual Pet";
  versions.textContent = "V1.0";
  versions.setAttribute("id","version");
  const newGameButton = document.createElement("button");
  newGameButton.setAttribute("id", "newGame");
  newGameButton.textContent = "New Game";
  
  const loadGameButton = document.createElement("button");
  loadGameButton.setAttribute("id", "loadGame");
  loadGameButton.textContent = "Load Game";
  
  section.innerHTML = "";
  section.appendChild(headerr);
  section.appendChild(versions);
  section.appendChild(newGameButton);
  section.appendChild(loadGameButton);
  
  newGameButton.addEventListener("click", showChooseSection);
  loadGameButton.addEventListener("click", goToLoadPets);

  setupButtonEventListeners();
}

window.addEventListener("popstate", (event) => {
  const newGameButton = document.querySelector("#newGame");
  const loadGameButton = document.querySelector("#loadGame");

  if (event.state && event.state.page === "choose") {
    showChooseSection();

    newGameButton.addEventListener("click", () => {
      history.pushState({ page: "choose" }, "Choose Pet", "?choose");
      runGame();
    });
    loadGameButton.addEventListener("click", goToLoadPets);
  } else {
    if (history.state !== null) {
      history.go(-1);
    } else {
      goToHomePage();
    }
  }
});

// Choose Section
function showChooseSection() {
  const section = document.querySelector("section");
  const choose = document.createElement("section");

  choose.setAttribute("id", "choose");
  choose.innerHTML = `<h2>Choose a Duck!</h2>`;
  choose.append(svg.createDuck("yellowDuck","yellow"));
  choose.append(svg.createDuck("redDuck","red"));
  choose.append(svg.createDuck("blueDuck","blue"));

  const ducks = choose.querySelectorAll('div');
  ducks.forEach((duck) => {
    duck.setAttribute("class", "ducks");
    duck.addEventListener('click', () => {
    localStorage.setItem('duckColour', duck.id);
    console.log(localStorage.getItem("duckColour"));
    window.location.href = '/newPet/new.html';
  })});
  
  section.innerHTML = "";
  section.appendChild(choose);
  
  history.pushState({ page: "choose" }, "Choose Pet", "?choose");
  
  const divs = document.querySelectorAll("section div");
  divs.forEach((button) => {
  button.addEventListener("click", () => {
  window.location.href = "/newPet/new.html";
});
});

  divs.forEach((button) => {
    button.addEventListener("hover", () => {
    window.location.href = "/newPet/new.html";
  });
  });
};