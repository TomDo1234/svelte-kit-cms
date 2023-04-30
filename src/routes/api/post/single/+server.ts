
import { PrismaClient, type Post } from '@prisma/client';
import { json, type RequestEvent } from '@sveltejs/kit';

export async function POST({request}: RequestEvent) {
  const model: Post = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.post.create({
      data: model
    });

    return json({
      status: 200,
      body: { query },
    });
  } catch (error) {
    return json({
      status: 500,
      body: { message: 'Error creating Post, ' + error },
    });
  }
}
