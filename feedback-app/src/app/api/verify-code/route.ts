import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export async function POST(request:Request){
    await dbConnect();
    try {
       const {username,code} = await request.json()

       // URI modify spaces, to get original we've to decode
        const decodedUsername = decodeURIComponent(username);

        const user = await UserModel.findOne({username:decodedUsername});
        if(!user){ 
            return Response.json({
                success:false,
                message:"User not found!"
            },{
                status:500
            })
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true;
            user.verifyCode = "";
            await user.save();
            return Response.json({
                success:true,
                message:"User account verified successfully!"
            },{
                status:200
            })
        }else if(!isCodeNotExpired){
            return Response.json({
                success:false,
                message:"Verification code expired,Signup again!"
            },{
                status:400
            })
        }else{
            return Response.json({
                success:false,
                message:"Incorrect verification code!"
            },{
                status:400
            })
        }

    } catch (error) {
        console.log("Error verifying user",error);
        return Response.json({
            success:false,
            message:"Error verifying user!"
        },{
            status:500
        })       
    }
}