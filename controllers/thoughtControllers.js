const { truncate } = require('fs/promises')
const { Thought, User } = require('../models')


module.exports = {
    async createThought(req, res) {
        try {
            // create thought
            const thoughtData = await Thought.create(req.body)

            // pass the id of the thought to the user
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.body.userId },
                {
                    $push: {
                        thoughts: thoughtData._id
                    }
                },
                { new: true }
            );
            if (!updatedUser) {
                res.json({ message: 'no user found, but thought was created' })
            }

            res.json({ message: 'thought has been added to the user' })

        } catch (err) {
            res.json(err)
        }
    }
}