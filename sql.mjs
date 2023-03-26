import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function init() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
    verbose: true
  });
  await db.migrate({ migrationsPath: './storage' });
  console.log("Connected");
  return db;
}

const dbConn = init();

export async function listPets() {
  const db = await dbConn;
  return db.all('SELECT * FROM Petslol ORDER BY time DESC LIMIT 10');
}

function currentTime() {
  return new Date().toISOString();
}

function generateId() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < 8; i++ ) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }
  return result;
}

export async function addPet(petData) {
  const db = await dbConn;
  const id = generateId();
  const time = currentTime();
  console.log("log successful");
  return db.run('INSERT INTO Petslol (petId, petName, health, hunger, clean, sleep, color, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id, petData.name, petData.health, petData.hunger, petData.clean, petData.sleep, petData.colour, time]);

}

export async function getPet(id){
  const db = await dbConn;
  console.log("pet loaded");
  return db.get('SELECT * FROM Petslol WHERE petId = ?', id);
}