import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";


export default async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
    ):Promise<ApiResponse> {

        try {

            const res = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject: "Feedback app | Verification code",
                react: VerificationEmail({username,otp:verifyCode}),
              });

            if(res.error){
                return{success:false,message:res?.error?.message}
            }
            return {success:true,message:"Verification email sent successfully!"}
            
        } catch (error) {
            console.log("Error sending verification email!",error)
            return {success:false,message:"Failed to send verification email!"}
        }
  
  };