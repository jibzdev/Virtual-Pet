import * as pet from '/pet.mjs' ;

// Naming The Pet
function NameThePet() {
  document.querySelector("#saveGame").style.display = "block";
  document.querySelector("#petStats").style.display = "block";
  document.querySelector(".petButtons").style.display = "block";
  document.querySelector("#welcomeMessage").style.display = "none";
  let Name = document.querySelector("#petName").value;
  let center = document.querySelector("#center");
  center.textContent = "Pet created! Read Stats Below.";
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
      document.querySelector("#warn").textContent = "Pet is Hungry! (Feed the pet or it will lose its health)";
    }
    if (hunger > 0) {
      hunger--;
      document.querySelector("#warn").textContent = "";
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

// get Single Pet
async function fetchPet(id){
  let response = await fetch(`pets/${id}`);
  let pets = await response.json();
  let main = document.querySelector("main");
  main.innerHTML = `${pets}`;
}


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
    let response = await fetch('pets', {
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

async function loadPets() {
  let response = await fetch("pets");
  let pets = await response.json();
  let content = document.querySelector("main");

  let table = document.createElement("table");
  table.innerHTML = `
    <thead id="tableHeader">
    <tr>
        <th id="headerOne">ID</th>
        <th id="headerTwo">Name</th>
      </tr>
    </thead>
    <tbody id="thePet">
    </tbody>
  `;
  let tbody = table.querySelector("tbody");
  for (let pet of pets) {
    let row = document.createElement("tr");
    let editButton = document.createElement("button");
    editButton.setAttribute("id","editButton");
    editButton.innerHTML = `Load`;
    row.innerHTML = `
      <td id="statOne">${pet.petId}</td>
      <td id="statTwo">${pet.petName}</td>
    `;
    row.appendChild(editButton);
    row.querySelector("#editButton").addEventListener("click", () => {
      fetchPet(`${pet.petId}`);
    });
    tbody.appendChild(row);
  }

  let backButton = document.createElement("button");
  backButton.setAttribute("id","backToMain");
  backButton.textContent = "Back";
  document.querySelector("body").appendChild(table);
  document.querySelector("body").appendChild(backButton);
  document.querySelector("#backToMain").addEventListener("click", () => {
    document.querySelector("body").removeChild(table);
    document.querySelector("body").removeChild(backButton);
    runGame();
  });
}

function runGame(){
  let startMenu = document.createElement('div');
  startMenu.setAttribute('id', 'startMenu');
  startMenu.innerHTML = `
  <h1>Welcome to Virtal Pet</h1>
  <button class="startMenuButtons" id="newGame">New Game</button>
  <br><br>
  <button class="startMenuButtons" id="loadGame">Load Game</button>
  <br><br>
  <button class="startMenuButtons" id="settings">Settings</button>
  <p>v1.0</p>
  `;
  document.querySelector("body").appendChild(startMenu);
  document.querySelector("#loadGame").addEventListener("click", () => {
    document.querySelector("body").removeChild(startMenu);
    loadPets();
  });
  document.querySelector("#newGame").addEventListener("click", () => {
    document.querySelector("body").removeChild(startMenu);
    document.querySelector("#saveGame").style.display = "none";
    document.querySelector("#petStats").style.display = "none";
    document.querySelector(".petButtons").style.display = "none";
    document.querySelector("main").style.display = "block";
  });
}

window.addEventListener('load', () => {
  runGame();
  document.querySelector("#NameforPet").addEventListener("click", () => {
    if(document.querySelector("#petName").value === ""){
      document.querySelector("#petNameEntered").textContent = "Invalid Name";
    } else {
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
