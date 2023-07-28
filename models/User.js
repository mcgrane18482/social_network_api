const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function(email){
              return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z\.]{2,6}$/.test(email);
            },
            message: props => `${props.value} is not a valid email address`
        },
    },
    thoughts:  [{
        type: Types.ObjectId,
        ref: 'Thought'
        }],
    friends:  [{
            type: Types.ObjectId,
            ref: 'User'
        }]               
});

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;