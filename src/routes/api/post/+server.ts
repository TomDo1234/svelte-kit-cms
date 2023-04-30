
import { PrismaClient, type Post } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({request}: RequestEvent) {
  const { items }: {items: Post[]} = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.post.createMany({
      data: items
    });

    return {
      status: 200,
      body: { query },
    };
  } catch (error) {
    return {
      status: 500,
      body: { message: 'Error creating Post, ' + error },
    };
  }
}

export async function GET({request}: RequestEvent) {
  const where_query: Post = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.post.findMany({
      where: where_query
    });

    return {
      status: 200,
      body: { query },
    };
  } catch (error) {
    return {
      status: 500,
      body: { message: 'Error finding Post, ' + error },
    };
  }
}
