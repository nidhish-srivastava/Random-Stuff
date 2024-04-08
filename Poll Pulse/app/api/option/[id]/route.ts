import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
const prisma = new PrismaClient()
export async function GET(request:Request,{params : {id}}:any){
    const options = await prisma.option.findMany({
        where : {
            pollId : id
        }
    })
    return NextResponse.json(options)
}