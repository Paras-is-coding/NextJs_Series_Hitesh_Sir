'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod';

import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signupSchema";
import axios, { AxiosError } from 'axios';
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";


export default function page() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // we'll fire request depending on this variable(in debounced way)
  const debounced = useDebounceCallback(setUsername, 300)
  const { toast } = useToast();
  const router = useRouter();

  // zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    }
  });

  useEffect(() => {

    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage('')
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`)
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username!"
          )
        } finally {
          setIsCheckingUsername(false);
        }

      }
    }

    checkUsernameUnique();
  }, [username])


  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data);

      toast({
        title: "Success",
        description: response.data.message,
      })
      router.replace(`/verify/${username}`)
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in signup of user", error);

      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message

      toast({
        title: "Signup failed!",
        description: errorMessage,
        variant: "destructive"
      })
      setIsSubmitting(false);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className='text-center'>
                <h1 className='text-3xl font-extrabold tracking-tight lg:text-4xl mb-6'>Sign up to send your feedback</h1>
                <p className='mb-4'>
                    Fill the form below!
                </p>
            </div>          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="enter username" {...field}
                        // modification
                        onChange={(e)=>{
                          field.onChange(e)
                          debounced(e.target.value)
                        }}
                         />
                      </FormControl>
                      {isCheckingUsername && <Loader2 className="animate-ping"/>}
                      <p className={`text-sm ${usernameMessage === "Username available!"?"text-green-500":"text-red-500"}`}>
                        {usernameMessage}
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="enter email" {...field}
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
                    ):("Signup")
                  }
                </Button>
              </form>
            </Form>
            <div className="text-center mt-4">
              <p>
                Already a member?{" "}
                <Link href={"/login"} className="text-blue-500 hover:text-blue-800">Login</Link>
              </p>
            </div>
          </div>
      </div>
    </div>
  )
}
