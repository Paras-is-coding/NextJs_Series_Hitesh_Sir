'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {  useState } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod';

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Form, FormControl,  FormField,  FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { loginSchema } from "@/schemas/loginSchema";
import { signIn } from "next-auth/react";


export default function page() {
  const [isSubmitting, setIsSubmitting] = useState(false);


  const { toast } = useToast();
  const router = useRouter();

  // zod implementation
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    }
  });




  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    // next auth 
   const result = await signIn('credentials',{
      redirect:false,
      identifier:data.identifier,
      password:data.password
    })
    console.log("resss",result)
    if(result?.error){
      if(result.error === 'CredentialsSignin'){
        toast({
          title:"Login Failed!",
          description:"Incorrect username or password!",
          variant:"destructive"
        })
      }else{
        toast({
          title:"Login Failed!",
          description:result?.error,
          variant:"destructive"
        })
      }
     
    }

    if(result?.url){
      toast({
        title:"Login Successful!",
        description:"Successfully logged in!",
        variant:"default"
      })
      router.replace('/dashboard')
    }
    setIsSubmitting(false);
     
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className='text-center'>
                <h1 className='text-3xl font-extrabold tracking-tight lg:text-4xl mb-6'>Join Mystery Message</h1>
                <p className='mb-4'>
                Login to send your feedback!
                </p>
            </div>          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email/Username</FormLabel>
                      <FormControl>
                        <Input placeholder="enter email/username" {...field}
                         />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="enter password" {...field}
                         />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/*  add button  */}
                <Button type="submit" disabled={isSubmitting}>
                  {
                    isSubmitting?(
                      <>
                      <Loader2 className="mr-2 h-4 w-2 animate-ping" /> Please wait...
                      </>
                    ):("Login")
                  }
                </Button>
              </form>
            </Form>
            <div className="text-center mt-4">
              <p>
                Do not have an account?{" "}
                <Link href={"/sign-up"} className="text-blue-500 hover:text-blue-800">Register</Link>
              </p>
            </div>
          </div>
      </div>
    </div>
  )
}
