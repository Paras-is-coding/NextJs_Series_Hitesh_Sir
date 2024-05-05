const mongoose = require('mongoose');

const userModelSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide a username"],
        min:2,
        max:50
    },
    email:{
        type:String,
        required:[true,"Please provide an email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
    },
    isVerified:{
        type:Boolean,
        enum:["active","inactive"],
        default:false
    },
    forgotPasswordToken:String,
    verifyToken:String,
    verifyTokenExpiry:String,
    forgotPasswordTokenExpiry:String,
    isAdmin:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true,
    autoCreate:true,
    autoIndex:true
})


const User = mongoose.models.users || mongoose.model("User",userModelSchema);

module.exports = User;