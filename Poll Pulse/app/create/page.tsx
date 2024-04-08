"use client"
import Link from "next/link"
import PollForm from "@/components/PollForm"
import { nanoid } from "nanoid";

function Create() {
  const id = nanoid(6);
  const addPoll = async(poll : any) => {
    fetch(`/api/poll`,{
      method : "POST",
      headers :{"Content-Type" : "application/json"},
      body : JSON.stringify({...poll,id})
    })
  }
  return (
    <div className="dark:bg-slate-800 bg-gray-100 flex flex-col justify-center items-center w-screen min-h-screen p-3 pt-20 pb-10 font-sans relative">
    <div className="absolute text-green-500 dark:text-green-300 top-0 p-2 flex justify-left text-sm items-left w-full lg:w-1/2 md:w-2/3">
      <Link href="/">
          . . /{" "}
          <span className="cursor text-gray-400 dark:text-gray-300">
            create
          </span>
      </Link>
    </div>
    <div className="flex flex-col justify-center items-center w-full lg:w-1/2 md:w-2/3 h-3/4 p-2">
      <h1 className="text-2xl font-bold dark:text-gray-200 text-gray-800">
        Create a poll
      </h1>
      <PollForm onSubmit={addPoll} />
    </div>
  </div>
  )
}

export default Create