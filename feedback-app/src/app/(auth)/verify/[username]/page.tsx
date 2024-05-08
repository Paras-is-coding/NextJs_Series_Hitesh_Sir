'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { verifySchema } from '@/schemas/verifySchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function VerifyAccount() {
    const router = useRouter();
    const params = useParams<{username:string}>();
    const {toast} = useToast();
    const [loading,setLoading] = useState(false);

     // zod implementation
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema)
  });


  const onSubmit = async (data:z.infer<typeof verifySchema>)=>{
    try {
        setLoading(true);
        const response = await axios.post(`/api/verify-code?username=${params.username}`,{
            username:params.username,
            verifyCode:data.verifyCode
        })


        toast({
            title:"Success!",
            description:response.data.message
        })
        router.replace(`/login`);
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
            title:"Verification failed!",
            description:axiosError.response?.data.message,
            variant:"destructive"
        })
    }
    finally{
        setLoading(false);
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
            <div className='text-center'>
                <h1 className='text-3xl font-extrabold tracking-tight lg:text-4xl mb-6'>Verify your account</h1>
                <p className='mb-4'>
                    Enter the verification code sent to your email
                </p>
                {/* form is here */}
                  <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="verifyCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter verifyCode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
        {
                    loading?(
                      <>
                      <Loader2 className="mr-2 h-4 w-2 animate-ping" /> Please wait...
                      </>
                    ):("Verify")
                  }
        </Button>
      </form>
    </Form>
            </div>
        </div>
    </div>
  )
}
