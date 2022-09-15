const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query() {
    try {
        const collection = await dbService.getCollection('pet')
        console.log(collection);
        const pets = await collection.find({}).toArray()
        return pets
    } catch (err) {
        logger.error('cannot find pets', err)
        throw err
    }
}

async function getById(petId) {
    try {
        const collection = await dbService.getCollection('pet')
        const pet = collection.findOne({ _id: ObjectId(petId) })
        return pet
    } catch (err) {
        logger.error(`while finding pet ${petId}`, err)
        throw err
    }
}

async function remove(petId) {
    try {
        const collection = await dbService.getCollection('pet')
        await collection.deleteOne({ _id: ObjectId(petId) })
        return petId
    } catch (err) {
        logger.error(`cannot remove pet ${petId}`, err)
        throw err
    }
}

async function add(pet) {
    try {


        const collection = await dbService.getCollection('pet')
        const addedPet = await collection.insertOne(pet)

        return addedPet.ops
    } catch (err) {
        logger.error('cannot insert pet', err)
        throw err
    }
}
async function update(pet) {

    try {
        const id = ObjectId(pet._id)
        delete pet._id
        const collection = await dbService.getCollection('pet')
        await collection.updateOne({ _id: id }, { $set: { ...pet } })
        return pet
    } catch (err) {
        logger.error(`cannot update pet ${petId}`, err)
        throw err
    }
}

async function updateMini(pet) {
    try {
        const id = ObjectId(pet._id)
        delete pet._id
        const collection = await dbService.getCollection('pet')

        await collection.updateOne({ _id: id }, { $set: { ...pet } })
        pet._id = id

        return pet
    } catch {

    }
}

function _buildCriteria({ txt, label, page = 1 }) {
    const criteria = {}
    const pageSkip = 4
    const reg = { $regex: txt, $options: 'i' }
    page = +page
    if (txt) criteria.title = reg
    return criteria
}

module.exports = {
    query,
    getById,
    remove,
    add,
    update,
    updateMini
}