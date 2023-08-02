const router = require('express').Router();
const { getThoughts, getThoughtbyId, createThought, updateThought, deleteThought } = require('../../controllers/thoughtControllers')

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtbyId).put(updateThought).delete(deleteThought)


module.exports = router;