window.addEventListener('load', () => {
  runGame();
});

function runGame() {
  let newGameButton = document.querySelector("#newGame");
  const loadGameButton = document.querySelector("#loadGame");

  newGameButton.addEventListener("click", showChooseSection);
  loadGameButton.addEventListener("click", goToLoadPets);

  function goToLoadPets() {
    window.location.href = "/loadPet/allPets.html";
  }
};

const clickSound = new Audio("assets/click.wav");
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

// Call the function on initial page load
setupButtonEventListeners();

window.addEventListener("popstate", (event) => {
  const section = document.querySelector("section");
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
    // Only go back in history if previous state is not null
    if (history.state !== null) {
      history.go(-1);
    } else {
      // Recreate initial state of game page
      const headerr = document.createElement("h1");
      const versions = document.createElement("p");
      headerr.textContent = "Welcome to Virtual Pet";
      versions.textContent = "V1.0";
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
  }
});

function goToLoadPets() {
  window.location.href = "/loadPet/allPets.html";
}

function showChooseSection() {
  const section = document.querySelector("section");
  const choose = document.createElement("section");
  choose.setAttribute("id", "choose");
  choose.innerHTML = `

  <h2>Choose a Pet!</h2>
    <div id="yellowDuck">
    <svg width="200" height="250" id="theDuck">
    <circle cx="100" cy="125" r="50" fill="yellow" />
    <circle cx="110" cy="80" r="40" fill="yellow"/>
    <circle id="theDuckEye" cx="130" cy="70" r="10" fill="white" stroke="black" stroke-width="3" />
    <circle id="theDuckIris" cx="130" cy="70" r="3" fill="black" stroke="black" stroke-width="3" />
    <line x1="100" y1="175" x2="100" y2="200" stroke="black" stroke-width="4" />
    <line x1="100" y1="200" x2="125" y2="200" stroke="black" stroke-width="4" />
    <polygon points="15 5, 25 25, 5 25" style="fill: orange; order: -1;" transform="translate(170,55) rotate(90)"/>
    </svg>
    </div>

    <div id="redDuck">
    <svg width="200" height="250" id="theDuck">
    <circle cx="100" cy="125" r="50" fill="red" />
    <circle cx="110" cy="80" r="40" fill="red"/>
    <circle id="theDuckEye" cx="130" cy="70" r="10" fill="white" stroke="black" stroke-width="3" />
    <circle id="theDuckIris" cx="130" cy="70" r="3" fill="black" stroke="black" stroke-width="3" />
    <line x1="100" y1="175" x2="100" y2="200" stroke="black" stroke-width="4" />
    <line x1="100" y1="200" x2="125" y2="200" stroke="black" stroke-width="4" />
    <polygon points="15 5, 25 25, 5 25" style="fill: orange; order: -1;" transform="translate(170,55) rotate(90)"/>
    </svg>
    </div>

    <div id="blueDuck">
    <svg width="200" height="250" id="theDuck">
    <circle cx="100" cy="125" r="50" fill="blue" />
    <circle cx="110" cy="80" r="40" fill="blue"/>
    <circle id="theDuckEye" cx="130" cy="70" r="10" fill="white" stroke="black" stroke-width="3" />
    <circle id="theDuckIris" cx="130" cy="70" r="3" fill="black" stroke="black" stroke-width="3" />
    <line x1="100" y1="175" x2="100" y2="200" stroke="black" stroke-width="4" />
    <line x1="100" y1="200" x2="125" y2="200" stroke="black" stroke-width="4" />
    <polygon points="15 5, 25 25, 5 25" style="fill: orange; order: -1;" transform="translate(170,55) rotate(90)"/>
    </svg>
    </div>
  `;
  
  const ducks = choose.querySelectorAll('div');
  ducks.forEach((duck) => {
    duck.addEventListener('click', () => {
      localStorage.setItem('selectedDuckColor', duck.id);
      window.location.href = 'newPet/new.html';
    });
  });

  section.innerHTML = "";
  section.appendChild(choose);
  
  history.pushState({ page: "choose" }, "Choose Pet", "?choose");

  const divs = document.querySelectorAll("section div");
  divs.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "/newPet/new.html";
    });
  });
};

// Audio Section

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