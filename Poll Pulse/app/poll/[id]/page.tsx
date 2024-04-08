"use client"
import { Option,Poll } from "@prisma/client"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"


function PollPage({params} : any) {
  const {id} = params
  const [poll,setPoll] = useState<Poll>()
  const [options,setOptions] = useState([])
  const [hasVoted, setHasVoted] = useState(false);
  const [hasUpVoted, setHasUpVoted] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  const addVote = (id: number,pollId:string) =>{
    if(!hasVoted){
      setHasVoted(true)
    }
    else{
      toast.error("You have already voted for this poll!");
    }
  }
  
  const addUpVote = (pollId:string|undefined) =>{
    if(hasUpVoted!=true){
      let toastId
      toastId = toast.loading("Adding your upvote...")
      try {
        fetch("/api/upvote",{
          method : "POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({id : pollId})
        })
        toast.success("Your upvote has been added!", {
          id: toastId,
        });
        setUpvotes((prev)=>prev+1)
        setHasUpVoted(true)
      } catch (error) {
        toast.error("Something went wrong...", {
          id: toastId,
        });
      }
    }
    else{
      toast.error("You have already upvoted this poll!");
    }
  }
  useEffect(()=>{
    const fetchPoll = async()=>{
        const response = await fetch(`/api/poll/${id}`)
        if(response.status==200) {
          const data = await response.json()
          setUpvotes(data?.upvotes)
          setPoll(data)
        }
    }
    const fetchOptions = async() =>{
        const response = await fetch(`/api/option/${id}`)
        if(response.status==200){
          setOptions(await response.json())
        }
    }
    fetchPoll()
    fetchOptions()
  },[])
  
  return (
    <div className="dark:bg-slate-800 bg-gray-100 flex flex-col justify-center items-center w-screen h-screen p-3 font-sans relative">
      <Toaster/>
    <div className="absolute text-green-500 dark:text-green-300 top-0 p-2 flex justify-left text-sm items-left w-full lg:w-2/3 md:w-2/3">
      <Link href="/">
          . . /{" "}
          <span className="cursor text-gray-400 dark:text-gray-300">
            poll / {poll?.id}
          </span>
      </Link>
    </div>
    {
      poll ?
    <div className="flex flex-col justify-center items-left w-full h-full lg:w-2/3 md:w-2/3 lg:h-2/3 p-2 gap-3">
      <h1 className="text-xl dark:text-gray-200 lg:text-2xl font-bold">
        {poll?.title}{" "}
      </h1>
      <div className="grid gap-3 grid-cols-2 w-full">
        {options?.map((option: Option) => {
          return (
            <button
              // onClick={() => addVote(option.id, option.pollId)}
              className="flex duration-300 relative gap-3 text-gray-700 items-center rounded bg-green-300 hover:ring-2 ring-green-400 cursor-pointer px-4 py-2 w-full h-full shadow-md"
              key={option.id}
            >
              <span className="text-sm lg:text-md md:text-md font-sans font-bold">
                {option.number}.
              </span>
              <h2 className="text-sm lg:text-md md:text-md font-sans font-bold">
                {option.text}
              </h2>
            </button>
          );
        })}
      </div>
      <div className="flex gap-2">
        {/* {hasVoted === true && (
          <>
            <p
              className="text-gray-500 dark:text-gray-300 underline decoration-dotted underline-offset-2 cursor-pointer"
              onClick={() => router.push(`/poll/results/${props?.poll?.id}`)}
            >
              view results
            </p>
            {" | "}
          </>
        )} */}
        <p
          className="cursor-pointer dark:text-gray-200"
          onClick={() => addUpVote(poll?.id)}
        >
          {upvotes}△{" "}
          <span className="text-gray-500 dark:text-gray-300 underline decoration-dotted underline-offset-2">
            upvote
          </span>
        </p>
      </div>
      <p className="text-[0.8rem] lg:text-sm md:text-sm flex-wrap justify-center self-center items-center w-screen text-center absolute bottom-8 p-2 text-gray-700 dark:text-gray-200">
        <span className="text-gray-500 dark:text-gray-300 underline decoration-dotted underline-offset-2">
          created by
        </span>{" "}
        {poll?.createdBy}
        {" | "}
        <span className="text-gray-500 dark:text-gray-300 underline decoration-dotted underline-offset-2">
          created on
        </span>{" "}
        {new Date(poll?.createdAt as Date).toLocaleDateString()}{" "}
        {new Date(poll?.createdAt as Date).toLocaleTimeString()}
      </p>
    </div> : <div>
      <span className="text-white">
      Loading...
      </span>
    </div>
    }
  </div>
  )
}

export default PollPage