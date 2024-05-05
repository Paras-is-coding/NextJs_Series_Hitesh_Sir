import mongoose,{Schema,Document, mongo} from "mongoose";


// defining message interface format for typescript
// extends Document - since schema will be part of mongoose Document
export interface Message extends Document{
    content:string;
    createdAt:Date;
}



const MessageSchema: Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})




export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isAcceptingMessage:boolean;
    isVerified:boolean;
    messages:Message[]
}

const UserSchema: Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,"Username is required!"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required!"],
        unique:true,
        match:[/.+\@.+\..+/,"Please use a valid email address!"]
    },
    password:{
        type:String,
        required:[true,"Password is required!"]
    },
    verifyCode:{
        type:String,
        required:[true,"VerifyCode is required!"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"VerifyCode Expiry is required!"]
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    messages:[MessageSchema]
})



// Next js runs in edge, it dosen't know which time app is booting up
// export is a little different that's why 


// two cases already model exist OR  new model create
const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema));

export default UserModel;