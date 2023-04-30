
import { PrismaClient, type User } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({request}: RequestEvent) {
  const { items }: {items: User[]} = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.user.createMany({
      data: items
    });

    return {
      status: 200,
      body: { query },
    };
  } catch (error) {
    return {
      status: 500,
      body: { message: 'Error creating User, ' + error },
    };
  }
}

export async function GET({request}: RequestEvent) {
  const where_query: User = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.user.findMany({
      where: where_query
    });

    return {
      status: 200,
      body: { query },
    };
  } catch (error) {
    return {
      status: 500,
      body: { message: 'Error finding User, ' + error },
    };
  }
}
