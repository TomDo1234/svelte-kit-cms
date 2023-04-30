
import { PrismaClient, type Post } from '@prisma/client';
import { json, type RequestEvent,error } from '@sveltejs/kit';

export async function POST({request}: RequestEvent) {
  const { items }: {items: Post[]} = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.post.createMany({
      data: items
    });

    return json({ query })
  } catch (errormsg) {
    throw error(400,{message: 'Error creating Post, ' + errormsg })
  }
}

export async function GET({request}: RequestEvent) {
  const where_query: Post = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.post.findMany({
      where: where_query
    });

    return json({ query })
  } catch (errormsg) {
    throw error(400,{message: 'Error finding Post, ' + errormsg })
  }
}
