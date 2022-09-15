const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
// const { log } = require('../../middlewares/logger.middleware')
const { getPets, getPetById, addPet, updatePet, removePet } = require('../pet/pet.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getPets)
router.get('/:id', getPetById)
router.post('/', addPet)
router.put('/:id', updatePet)
router.delete('/:id', removePet)
// router.post('/', requireAuth, requireAdmin, addPet)
// router.put('/:id', requireAuth, requireAdmin, updatePet)
// router.delete('/:id', requireAuth, requireAdmin, removePet)


// debug routes
// router.post('/', addPet)
// router.put('/:id', updatePet)
// router.delete('/:id', removePet)

module.exports = router