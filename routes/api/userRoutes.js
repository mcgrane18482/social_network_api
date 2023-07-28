const router = require('express').Router();
const { getUsers, getUserbyId, createUser, deleteUser } = require('../../controllers/userController')

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserbyId).delete(deleteUser)

// /api/users/:userId/friends/:friendId
// router.route('/:userId/friends/:friendId').post().delete()





module.exports = router;