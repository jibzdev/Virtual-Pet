const clickSound = new Audio("assets/click.wav");


const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    clickSound.play();
  });
});

function runGame() {
  const section = document.querySelector("section");
  let newGameButton = document.querySelector("#newGame");
  const loadGameButton = document.querySelector("#loadGame");

  newGameButton.addEventListener("click", () => {
    const choose = document.createElement("section");
    choose.setAttribute("id", "choose");
    choose.innerHTML = `
      <div>Pet 1</div>
      <div>Pet 2</div>
      <div>Pet 3</div>
    `;

    section.innerHTML = "";
    section.appendChild(choose);
    history.pushState({ page: "choose" }, "Choose Pet", "?choose");
  });

  window.addEventListener("popstate", (event) => {
    if (event.state && event.state.page === "choose") {
      const choose = document.createElement("section");
      choose.setAttribute("id", "choose");
      choose.innerHTML = `
        <div>Pet 1</div>
        <div>Pet 2</div>
        <div>Pet 3</div>
      `;
      
      section.innerHTML = "";
      section.appendChild(choose);
      
      newGameButton = document.querySelector("#newGame");
      loadGameButton = document.querySelector("#loadGame");

      newGameButton.addEventListener("click", () => {
        history.pushState({ page: "choose" }, "Choose Pet", "?choose");
        runGame();
      });

      loadGameButton.addEventListener("click", () => {
        window.location.href = "/loadPet/allPets.html";
      });
    }
  });
}

window.addEventListener('load', () => {
  runGame();
});

const audio = document.getElementById('my-audio');
const volumeRange = document.getElementById("volume-range");
const volumeIcon = document.querySelector(".fa-volume-up");

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