const router = require('express').Router();
const { getUsers, getUserbyId, createUser } = require('../../controllers/userController')

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserbyId)

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')

// /api/thoughts



module.exports = router;