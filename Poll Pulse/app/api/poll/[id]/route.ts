import { PrismaClient } from "@prisma/client"
import { NextRequest } from "next/server";

const prisma = new PrismaClient()

export async function GET(request : NextRequest,{params:{id}}:any){
    
    const poll = await prisma.poll.findUnique({
        where : {
            id : id 
        }
    })
    return Response.json(poll)
}
