const {User, Thought} = require('../models')

module.exports = {
    
    // Get all users
    async getUsers(req, res){
        try{
            const users = await User.find();
            res.json(users);
        }catch(error){
            console.log(error.message);
            res.status(500).json(error.message);
        }
    },
    // Get one user by Id
    async getUserbyId(req, res){
        try{
            const user = await User.findOne({_id: req.params.userId});

            if(!user){
                res.staus(404).json({"message": "No student found"});
            }
            res.json(user);

        }catch(error){
            console.log(error.message);
            res.status(500).json(error.message);
        }
    },
    // Create a new user
    async createUser(req, res){
        try{
            const newUser = await User.create(req.body);
            res.json(newUser);

        }catch(error){
            console.log(error.message);
            return res.status(500).json(error.message);
        }
    }
};