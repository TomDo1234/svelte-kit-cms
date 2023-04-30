
import { PrismaClient, type User } from '@prisma/client';
import { json, type RequestEvent } from '@sveltejs/kit';

export async function POST({request}: RequestEvent) {
  const model: User = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.user.create({
      data: model
    });

    return json({
      status: 200,
      body: { query },
    });
  } catch (error) {
    return json({
      status: 500,
      body: { message: 'Error creating User, ' + error },
    });
  }
}
