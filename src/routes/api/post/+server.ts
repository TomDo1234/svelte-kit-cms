
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
      body: { message: 'Error creating posts, ' + error },
    };
  }
}
