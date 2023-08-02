const router = require('express').Router();
const { getThoughts, getThoughtbyId, createThought, updateThought, deleteThought, createReaction, deleteReaction } = require('../../controllers/thoughtControllers')

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtbyId).put(updateThought).delete(deleteThought)

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;