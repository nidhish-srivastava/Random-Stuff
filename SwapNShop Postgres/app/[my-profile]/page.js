"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"

const MyProfile = () => {
    const {data : session} = useSession()
  return (
    <div className="flex flex-col gap-4 mt-8 md:mt-4 lg:mt-8 items-center">
      <div className="w-fit"> 
      <Image
      src = {session?.user?.image}
      alt="dp"
      width={100}
      height={100}
      />
      </div>
      <h2 className="text-center text-lg">
        Hello {session?.user?.name}
      </h2>
      <h3>Email : {session?.user?.email}</h3>
    </div>
  )
}


export default MyProfile