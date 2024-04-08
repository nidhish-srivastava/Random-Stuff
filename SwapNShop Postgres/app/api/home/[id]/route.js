
import {  NextResponse } from "next/server";
import { PostModel } from "../../../../models/index"

export async function GET(request,{ params: { id } }) {
    try {
        const id = request.url.split("/")
        const pageNumber = id[id.length-1]
        console.log(pageNumber);
        const allPosts = await PostModel.find().sort({createdAt : -1})
        const page = pageNumber || 1
        const pageSize = 20
        const startIndex = (page-1)*pageSize
        const endIndex = startIndex + pageSize
        const itemsToSend = allPosts.slice(startIndex,endIndex)
        const result =  {itemsToSend,totalPages : Math.ceil(allPosts.length/pageSize)}
        return NextResponse.json(result)
    } catch (error) {
        
    }
}