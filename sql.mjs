import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function init() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
    verbose: true,
  });
  await db.migrate({ migrationsPath: './storage' });
  console.log('Connected');
  return db;
}

const dbConn = init();

export async function listPets() {
  const db = await dbConn;
  return db.all('SELECT * FROM Petslol ORDER BY time DESC LIMIT 10');
}


export async function addPet(petData) {
  const db = await dbConn;
  console.log('log successful');

  const existingPet = await db.get('SELECT * FROM Petslol WHERE petId = ?', petData.id);

  if (existingPet) {
    await db.run('DELETE FROM Petslol WHERE petId = ?', petData.id);
  }

  return db.run('INSERT INTO Petslol (petId, petName, health, hunger, clean, sleep, color, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [petData.id, petData.name, petData.health, petData.hunger, petData.clean, petData.sleep, petData.colour, petData.time]);
}

export async function getPet(id) {
  const db = await dbConn;
  console.log('pet loaded');
  return db.get('SELECT * FROM Petslol WHERE petId = ?', id);
}
