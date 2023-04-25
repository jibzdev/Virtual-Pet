window.addEventListener('load', () => {
    load();
    document.querySelector("#my-audio").volume = 0.3;
});

async function load() {
    const response = await fetch('/pets');
    const pets = await response.json();
    for (const pet of pets) {
      const petlist = document.querySelector("#petList");
      const li = document.createElement('li');
      
      const idSpan = document.createElement('span');
      idSpan.textContent = pet.petId;
      li.appendChild(idSpan);
      
      const nameSpan = document.createElement('span');
      nameSpan.textContent = pet.petName;
      li.appendChild(nameSpan);
      
      const buttonContainer = document.createElement('div');
      const loadButton = document.createElement('a');
      loadButton.textContent = 'load';
      loadButton.href = `pet.html?ID=${pet.petId}`;
      buttonContainer.appendChild(loadButton);
      li.appendChild(buttonContainer);
      
      petlist.append(li);
    }
  }

// Audio Stuff
document.addEventListener("DOMContentLoaded", () => {
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
            }
        
        
        volumeRange.addEventListener("input", function() {
            const volume = volumeRange.value;
            audio.volume = volume;
            audio.muted = (volume == 0);
            volumeIcon.className = (volume == 0) ? "fas fa-volume-off" : (volume <= 0.5) ? "fas fa-volume-down" : "fas fa-volume-up";
            localStorage.setItem("volume", volume);
        });
});

