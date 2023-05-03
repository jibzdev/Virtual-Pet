let defaultPet = {
    petName: '',
    hunger: 100,
    clean: 100,
    sleep: 100,
    health: 100,
    petColour: '',
};
let sessionId = '';

export function getId() {
  if (!sessionId) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < 8; i++ ) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    sessionId = result;
  }
  return sessionId;
}
// Name 
export function getName(){
    return defaultPet.name;
}

export function setName(name){
    defaultPet.name = name;
}

// Colour 
export function getColour(){
    return defaultPet.petColour;
}

export function setColour(colour){
    defaultPet.petColour = colour;
}

// Health
export function getHealth(){
    return defaultPet.health;
}

export function setHealth(health){
    defaultPet.health = health;
}

// Cleanliness
export function getClean(){
    return defaultPet.clean;
}

export function setClean(clean){
    defaultPet.clean = clean;
}

// Sleep
export function getSleep(){
    return defaultPet.sleep;
}

export function setSleep(sleep){
    defaultPet.sleep = sleep;
}

// Hunger
export function getHunger(){
    return defaultPet.hunger;
}

export function setHunger(hunger){
    defaultPet.hunger = hunger;
}