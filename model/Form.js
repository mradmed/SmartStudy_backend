const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const formSchema = new mongoose.Schema({
    
    userID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'},

    RelationshipStatus :{
        type: String,
        min: 6,
        max: 255
    },
    Connections: {
        type: String,
        min: 6,
        max: 255
    },
    Interests: {
        type : String,
        min: 6,
        max: 255
    },
    Age:{
        type : Number,
        required : true,
    },
    Gender: {
        type: String,
        enum: ["All", "male", "female"],
        default: "All"
    },
    Location: {type: String,
        required : true,
        max: 255},
    Category: {
        type: String,
        required : true,
        min: 6,
        max: 255
    }
    ,status: {type: String, required: true, enum: ["pending", "Running", "finished"], default: "pending"}
    
});

module.exports = mongoose.model("Form",formSchema);