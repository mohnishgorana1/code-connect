import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

async function Home() {
  const user = await currentUser();

  if(!user){
    redirect("/sign-up")
  }

  const profileInfo = await fetchProfileAction(user?.id)

  if(user && !profileInfo) redirect("/onboard")
  return (

    <div>Home</div>
  )
}

export default Home