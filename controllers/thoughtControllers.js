const { Thought, User } = require('../models')


module.exports = {
    // Create a new thought
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
    // Get all thoughts
    async getThoughts(req, res){
        try{
            const thoughts = await Thought.find();
            res.json(thoughts);
        }catch(error){
            console.log(err);
            res.json(err);
        }
    },
    // Get a single thought by its id
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
    // Delete a thought
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
    },
    // Update a thought
    async updateThought(req,res){
        try{
            const thought = await Thought.findbyIdAndUpdate(
                req.params.thoughtId, 
                {$set: req.body},
                {runValidators:true, new: true});
            if(!thought){
                res.status(404).json({"message": "No thought found with that id"});
            }
            res.json({"message": "Thought updated successfully"});
        }catch(err){
            console.log(err);
            res.json(err);
        }
    },
    // Add a reaction
    async createReaction(req,res){
        try{
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId, 
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true});
            if(!thought){
                res.status(404).json({"message": "No thought found with that id"});
            }
            res.json(thought);
        }catch(err){
            console.log(err);
            res.json(err);
        }
    },
    async deleteReaction(req,res){
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: req.body.reactionId}},
                {new: true}
                );
            if(!thought){
                res.status(404).json({"message": "cannot delete - no thought found with that id"});
            }
            res.json({"message": "Thought deleted successfully"});
        }catch(err){
            console.log(err);
            res.json(err);
        }
    },
}