
import { PrismaClient, type User } from '@prisma/client';
import { json, type RequestEvent,error } from '@sveltejs/kit';

export async function POST({request}: RequestEvent) {
  const model: User = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.user.create({
      data: model
    });

    return json({ query })
  } catch (errormsg) {
    throw error(400,{message: 'Error creating User, ' + errormsg })
  }
}
