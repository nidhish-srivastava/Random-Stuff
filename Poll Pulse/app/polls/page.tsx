import Link from "next/link";
import PollCard from "@/components/PollCard";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()


async function Polls() {
  const polls = await prisma.poll.findMany({})

  return (
    <div className="relative dark:bg-slate-800 bg-gray-100 flex flex-col w-screen max-h-max min-h-screen font-sans justify-center gap-4 items-center p-5">
    <div className="absolute text-green-500 dark:text-green-300 top-0 p-2 flex justify-left text-sm items-left w-full lg:w-1/2 md:w-2/3">
      <Link href="/">
          . . /{" "}
          <span className="cursor text-gray-400 dark:text-gray-300">
            polls
          </span>
      </Link>
    </div>
    <div className="h-[10%] w-full lg:w-1/3 md:w-2/3 justify-center items-center flex gap-3 mt-9-3">
      <h2 className="text-md lg:text-2xl md:text-xl dark:text-gray-200 text-gray-800">
        Public Poll List
      </h2>
    </div>
    <div className="min-h-[90%] max-h-max grid grid-cols-1 justify-center items-center w-full lg:w-1/2 md:w-full gap-3 mb-5">
      {
        polls?.map((poll) => {
            return (
              <div className="w-full h-full" key={poll.id}>
                <Link href={`/poll/${poll.id}`}>
                <PollCard poll={poll} />
                </Link>
              </div>
            )
          })
        }
  </div>
      
  </div>
  )
}

export default Polls