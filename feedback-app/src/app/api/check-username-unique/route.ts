import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signupSchema";
import {z} from 'zod'
 


const UsernameQuerySchema = z.object({
    username:usernameValidation
})

// This check is for functionality, when user types username and see if it available while typing

export async function GET(request:Request){
    await dbConnect()
    try {
        // syntax to get username from query 
        const {searchParams} = new URL(request.url);
        const queryParam = {
            username:searchParams.get("username")
        };

        // zod validation
        const result = UsernameQuerySchema.safeParse(queryParam);

        // console.log(result)
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json({
                success:false,
                message:usernameErrors?.length >0?usernameErrors.join(','):"Invalid query params!"
            },{
                status:400
            })
        }

        const {username} = result.data;
        const existingVerifiedUser = await UserModel.findOne({username,isVerified:true});
        if(existingVerifiedUser){
            return Response.json({
                success:false,
                message:"Username is already taken!"
            },{
                status:400
            })
        }else{
            return Response.json({
                success:true,
                message:"Username available!"
            },{
                status:201
            })
        }

        
    } catch (error) {
        console.error("Error checking username",error);
        return Response.json({
            success:false,
            message:"Error checking username"
        },{
            status:500
        })
    }
}