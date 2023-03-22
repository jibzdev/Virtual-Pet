let defaultPet = {
    petName: '',
    hunger: 6,
    clean: 100,
    sleep: 100,
    health: 10,
};

// Name 
export function getName(){
    return defaultPet.name;
}

export function setName(name){
    defaultPet.name = name;
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