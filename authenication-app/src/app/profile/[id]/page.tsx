import React from 'react'

export default function UserProfile({params}:any) {
  return (
    <div className='min-h-screen min-w-[100vw]'>
        <div className='flex items-center justify-center '>User Profile <span className='bg-orange-600'>{params?.id}</span></div>
    </div>
  )
}
