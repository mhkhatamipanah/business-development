const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AutoIncrementFactory = require('mongoose-sequence');

var connection = mongoose.createConnection(process.env.MONGOOSE);

const AutoIncrement = AutoIncrementFactory(connection);



const userSchema = new Schema ({
    username:{
        type: String,
        required:true,
        collation: "fa" 
    } , 
    phone:{
        type: String,
        required:true,
    } , 
    email:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    },
    role:{
        type: String,
        required:true,
    },
 
    team:{
        type: String,
        required:true,
    },
    status:{
        type: String,
        required:true,
    },

}, {timestamps: true})

userSchema.plugin(AutoIncrement, { inc_field: 'id_user' });

const User  = mongoose.models.User || mongoose.model("User" , userSchema )
module.exports =  User;
