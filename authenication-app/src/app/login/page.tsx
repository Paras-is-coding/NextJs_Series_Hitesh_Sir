"use client";

import Link from 'next/link';
import React, { useState } from 'react'



export default function LoginPage() {
const [loading,setLoading] = useState(false);
const [user,setUser] = useState({
    username:"",
    email:"",
    password:""
});


  return (

    <>
     <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8  ">
        <div className='w-fit shadow-lg h-auto px-10 py-2 sm:px-20  mx-auto rounded-tl-3xl rounded-br-3xl  bg-gradient-to-br from-gray-400  to-white '>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-customDark">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form  className="space-y-6">
          
       
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={user?.email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
             
            </div>
       
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={user?.password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
             
            </div>

            

            <div>
              <button
              disabled={loading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Do not have an account?{' '}
            <Link href={'/login'} className="font-semibold leading-6 text-gray-600 hover:text-gray-500">
              Signup
            </Link>
          </p>
        </div>
        </div>
      </div>
    </>
  )
}
