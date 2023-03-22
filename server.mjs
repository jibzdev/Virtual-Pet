import express from 'express';
import * as safe from './petsMain.mjs';
import bodyParser from 'body-parser';

const app = express();
app.use(express.static('main'));
app.use(bodyParser.json());

async function getPets(req, res) {
  const pets = await safe.listPets();
  console.log(pets);
  res.send(pets);
}

async function getPet(req, res) {
  const pets = await safe.getPet(req.params.id);
  console.log(pets);
  res.send(pets);
}

async function postPet(req, res) {
  let data = req.body;
  console.log('Received pet data:', data);
  safe.addPet(data);
}

function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.get('/pets', getPets);
app.post('/pets', postPet);
app.get('/pets/:id', asyncWrap(getPet));

app.listen(8080);


