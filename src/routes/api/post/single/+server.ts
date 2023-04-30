
import { PrismaClient, type Post } from '@prisma/client';
import { json, type RequestEvent,error } from '@sveltejs/kit';

export async function POST({request}: RequestEvent) {
  const model: Post = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.post.create({
      data: model
    });

    return json({ query })
  } catch (errormsg) {
    throw error(400,{message: 'Error creating Post, ' + errormsg })
  }
}
