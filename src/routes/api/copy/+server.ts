
import { PrismaClient, type Copy } from '@prisma/client';
import { json, type RequestEvent,error } from '@sveltejs/kit';

export async function POST({request}: RequestEvent) {
  const { items }: {items: Copy[]} = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.copy.createMany({
      data: items
    });

    return json({ query })
  } catch (errormsg) {
    throw error(400,{message: 'Error creating Copy, ' + errormsg })
  }
}

export async function GET({request}: RequestEvent) {
  const where_query: Copy = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.copy.findMany({
      where: where_query
    });

    return json({ query })
  } catch (errormsg) {
    throw error(400,{message: 'Error finding Copy, ' + errormsg })
  }
}
