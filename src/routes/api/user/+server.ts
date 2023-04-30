
import { PrismaClient, type User } from '@prisma/client';
import { json, type RequestEvent,error } from '@sveltejs/kit';

export async function POST({request}: RequestEvent) {
  const { items }: {items: User[]} = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.user.createMany({
      data: items
    });

    return json({ query })
  } catch (errormsg) {
    throw error(400,{message: 'Error creating User, ' + errormsg })
  }
}

export async function GET({request}: RequestEvent) {
  const where_query: User = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.user.findMany({
      where: where_query
    });

    return json({ query })
  } catch (errormsg) {
    throw error(400,{message: 'Error finding User, ' + errormsg })
  }
}
