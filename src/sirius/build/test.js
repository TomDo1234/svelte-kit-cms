import { writeFileSync, existsSync, mkdirSync } from 'fs';
import siriusconfig from './siriusconfig';
import path from "path";
function generatePrismaSchema(siriusconfig) {
    let prismaSchema = '';
    prismaSchema += `generator client {
`;
    prismaSchema += `  provider = "prisma-client-js"
`;
    prismaSchema += `}
  
`;
    prismaSchema += `datasource db {
`;
    prismaSchema += `  provider = "${siriusconfig.provider}"
`;
    prismaSchema += `  url = "${siriusconfig.url}"
`;
    prismaSchema += `}

`;
    for (const model of siriusconfig.models) {
        prismaSchema += `model ${model.name} {
`;
        for (const field of model.fields) {
            prismaSchema += `  ${field.name} ${(field?.isCreatedAt || field?.isUpdatedAt) ? 'DateTime' : field.type}${field?.id ? ' @id' : ''}${field?.unique ? ' @unique' : ''}${field?.isCreatedAt ? ' @default(now())' : ''}${field?.isUpdatedAt ? ' @updatedAt' : ''}
`;
        }
        prismaSchema += `}

`;
    }
    return prismaSchema;
}
const prismaSchema = generatePrismaSchema(siriusconfig);
const folderPath = 'prisma';
const filePath = path.join(folderPath, 'schema.prisma');
if (!existsSync(folderPath)) {
    mkdirSync(folderPath, { recursive: true });
}
writeFileSync(filePath, prismaSchema);
function generateRestApiRoutes(siriusconfig) {
    for (const model of siriusconfig.models) {
        const folderPath = `src/routes/api/${model.name.toLowerCase()}`;
        if (!existsSync(folderPath)) {
            mkdirSync(folderPath, { recursive: true });
        }
        const multiple_file = `
import { PrismaClient, type ${model.name} } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({request}: RequestEvent) {
  const { items }: {items: ${model.name}[]} = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.${model.name.toLowerCase()}.createMany({
      data: items
    });

    return {
      status: 200,
      body: { query },
    };
  } catch (error) {
    return {
      status: 500,
      body: { message: 'Error creating ${model.name}, ' + error },
    };
  }
}

export async function GET({request}: RequestEvent) {
  const where_query: ${model.name} = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.${model.name.toLowerCase()}.findMany({
      where: where_query
    });

    return {
      status: 200,
      body: { query },
    };
  } catch (error) {
    return {
      status: 500,
      body: { message: 'Error finding ${model.name}, ' + error },
    };
  }
}
`;
        writeFileSync(`${folderPath}/+server.ts`, multiple_file);
        const singleFolderPath = `src/routes/api/${model.name.toLowerCase()}/single`;
        if (!existsSync(singleFolderPath)) {
            mkdirSync(singleFolderPath, { recursive: true });
        }
        const single_file = `
import { PrismaClient, type ${model.name} } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({request}: RequestEvent) {
  const model: ${model.name} = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.${model.name.toLowerCase()}.create({
      data: model
    });

    return {
      status: 200,
      body: { query },
    };
  } catch (error) {
    return {
      status: 500,
      body: { message: 'Error creating ${model.name}, ' + error },
    };
  }
}
`;
        writeFileSync(`${singleFolderPath}/+server.ts`, single_file);
    }
}
generateRestApiRoutes(siriusconfig);
//# sourceMappingURL=test.js.map