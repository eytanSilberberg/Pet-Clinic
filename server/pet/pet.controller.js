const petService = require('./pet.service');
const logger = require('../../services/logger.service')

// GET LIST
async function getPets(req, res) {

  try {
    logger.debug('Getting Pets')
    var queryParams = req.query
    const pets = await petService.query(queryParams)
    console.log('pets in controller', pets);
    res.end(pets);
  } catch (err) {
    logger.error('Failed to get pets', err)
    // res.status(500).send({ err: 'Failed to get pets' })
  }
}

// GET BY ID 
async function getPetById(req, res) {
  try {
    const petId = req.params.id;
    const pet = await petService.getById(petId)
    res.json(pet)
  } catch (err) {
    logger.error('Failed to get pet', err)
    res.status(500).send({ err: 'Failed to get pet' })
  }
}

// POST (add pet)
async function addPet(req, res) {
  logger.debug('adding')

  try {
    const pet = req.body;
    const addedPet = await petService.add(pet)
    res.json(addedPet)
  } catch (err) {
    logger.error('Failed to add pet', err)
    res.status(500).send({ err: 'Failed to add pet' })
  }
}

// PUT (Update pet)
async function updatePet(req, res) {
  try {
    const pet = req.body;
    const updatedPet = await petService.update(pet)
    res.json(updatedPet)
  } catch (err) {
    logger.error('Failed to update pet', err)
    res.status(500).send({ err: 'Failed to update pet' })

  }
}

// DELETE (Remove pet)
async function removePet(req, res) {
  console.log(req);
  console.log(req)
  try {
    const petId = req.params.id;
    const removedId = await petService.remove(petId)
    res.send(removedId)
    console.log('petId', petId);
  } catch (err) {
    logger.error('Failed to remove pet', err)
    res.status(500).send({ err: 'Failed to remove pet' })
  }
}

module.exports = {
  getPets,
  getPetById,
  addPet,
  updatePet,
  removePet
}
