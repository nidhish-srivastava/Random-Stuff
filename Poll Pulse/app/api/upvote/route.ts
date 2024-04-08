import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { id } = await req.json();
  const upvote = await prisma.poll.update({
    where: {
      id: id,
    },
    data: {
      upvotes: {
        increment: 1,
      },
    },
  });
  return NextResponse.json(upvote);
}
