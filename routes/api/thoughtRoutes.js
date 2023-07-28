const router = require('express').Router();
const { createThought } = require('../../controllers/thoughtControllers')

// /api/users
router.route('/').post(createThought);

// /api/users/:userId
// router.route('/:userId').get(getUserbyId)

// /api/users/:userId/friends/:friendId

// router.route('/:userId/friends/:friendId')

// /api/thoughts



module.exports = router;