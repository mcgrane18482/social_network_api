const router = require('express').Router();
const { getThoughts, getThoughtbyId, createThought, deleteThought } = require('../../controllers/thoughtControllers')

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtbyId).delete(deleteThought)


module.exports = router;