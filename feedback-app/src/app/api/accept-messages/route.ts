import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";


export async function POST(request:Request) {
    await dbConnect();

     // get currently logged in user
     const session = await getServerSession(authOptions );
     const user:User = session?.user as User; 
     if(!session || !session.user){
         return Response.json({
             success:false,
             message:"Not authenticated!"
         },{
             status:401
         })
     }

     const userId = user._id;
     const {acceptMessages} = await request.json();
    
    try {
       const updatedUser = await UserModel.findByIdAndUpdate(userId,{isAcceptingMessage:acceptMessages},
        {new:true}
        );
        if(!updatedUser){
            return Response.json({
                success:false,
                message:"Failed to change user status of accepting messages!"
            },{
                status:401
            })
        }

        return Response.json({
            success:true,
            message:"Message acceptance status updated successfully!",
            updatedUser
        },{
            status:200
        })


    } catch (error) {
        console.log("Failed to change user status of accepting messages",error);
        return Response.json({
            success:false,
            message:"Failed to change user status of accepting messages!"
        },{
            status:500
        })
    }
}



export async function GET(request:Request){
    await dbConnect();

     // get currently logged in user
     const session = await getServerSession(authOptions );
     const user:User = session?.user as User; 
     if(!session || !session.user){
         return Response.json({
             success:false,
             message:"Not authenticated!"
         },{
             status:401
         })
     }

     const userId = user._id;

     try {
        const userFound = await UserModel.findById(userId);
        if(!userFound){
            return Response.json({
                success:false,
                message:"User not found!"
            },{
                status:404
            })
        }


        return Response.json({
            success:true,
            isAcceptingMessage:userFound.isAcceptingMessage
        },{
            status:200
        })


     } catch (error) {
        console.log("Failed getting message acceptance status",error);
        return Response.json({
            success:false,
            message:"Failed to get message acceptance status!"
        },{
            status:500
        })
     }
}