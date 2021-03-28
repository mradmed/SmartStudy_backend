const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique: true,
        min: 6,
        max: 255
    },
    firstname : {
        type: String,
        required : false,
        min: 6,
        max: 255
    },
    lastname : {
        type: String,
        required : false,
        min: 6,
        max: 255
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 6
    },
    password: {
        type : String,
        required : true,
        max: 1024,
        min: 6
    },
    role : {
        type: String,
        required : true,
        min: 6,
        max: 255
    },
    image: {
		type: String,
		required: false
	},
    phone: {
        type: String,
        required: true
    },
    creationdate: {
        type: Date,
        default: Date.now
    },
    birthdate: {
        type: Date,
        required: false
    }

    
});

module.exports = mongoose.model("User",userSchema);