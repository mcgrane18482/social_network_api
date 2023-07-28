const { Thought, User } = require('../models')


module.exports = {
    async createThought(req, res) {
        try {
            // create thought
            const thoughtData = await Thought.create(req.body);

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
                res.json({ message: 'no user found, but thought was created' });
            }

            res.json({ message: 'thought has been added to the user' });

        } catch (err) {
            res.json(err)
        }
    },
    async getThoughts(req, res){
        try{
            const thoughts = await Thought.find();
            res.json(thoughts);
        }catch(error){
            console.log(err);
            res.json(err);
        }
    },
    async getThoughtbyId(req, res){
        try{
            const thought = await Thought.findOne({_id: req.params.thoughtId}).populate('reactions');
            if(!thought){
                res.status(404).json({"message": "no thought found with that id"});
            }
            res.json(thought);

        }catch(err){
            console.log(err);
            res.json(err);
        }
    },
    async deleteThought(req,res){
        try{
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});
            if(!thought){
                res.status(404).json({"message": "cannot delete - no thought found with that id"});
            }
            res.json({"message": "Thought deleted successfully"});
        }catch(err){
            console.log(err);
            res.json(err);
        }
    }
}