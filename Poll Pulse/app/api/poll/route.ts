import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export async function POST(req:Request,res:Response){
    const { id, title, options, createdBy } =await req.json();
    const poll = await prisma.poll.create({
        data:{
            id,
            title,
            createdBy,
            options : {
                create : options.map((option:string,index:number)=>({
                    number : index+1,
                    text : option
                }))
            }
        }
    })
    return Response.json({poll})
}