const {User, Thought} = require('../models')

module.exports = {
    
    // Get all users
    async getUsers(req, res){
        try{
            const users = await User.find();
            res.json(users);
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Get one user by Id
    async getUserbyId(req, res){
        try{
            const user = await User.findOne({_id: req.params.userId}).populate('thoughts').populate('friends');

            if(!user){
                res.staus(404).json({"message": "No student found"});
            }
            res.json(user);

        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Create a new user
    async createUser(req, res){
        try{
            const newUser = await User.create(req.body);
            res.json(newUser);

        }catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a user
    async deleteUser(req,res){
        try{
            const user = await User.findOneAndDelete({_id: req.params.userId});
            if(!user){
                res.status(404).json({"message": "cannot delete - no user found with that id"});
            }
            res.json({"message": "User deleted successfully"});
        }catch(err){
            console.log(err);
            res.json(err);
        }
    }
};