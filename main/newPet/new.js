import * as pet from '/pet.mjs' ;

// Naming The Pet
function NameThePet() {
    let Name = document.querySelector("#petName").value;
    pet.setName(Name);
    document.querySelector("#petHeader").textContent = "Name: " + pet.getName();
    document.querySelector("#Hunger").textContent = "Hunger: " + pet.getHunger();
    document.querySelector("#Health").textContent = "Health: " + "%" + pet.getHealth();
    document.querySelector("#Sleep").textContent = "Tired: " + pet.getSleep();
    document.querySelector("#Cleanliness").textContent = "Cleanliness: " + pet.getClean();
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
        buttons.classList.remove("hidden");
        stats.classList.remove("hidden");
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