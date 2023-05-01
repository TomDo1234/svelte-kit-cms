#!/usr/bin/env node
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from "path";

import { buildSync } from 'esbuild';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

buildSync({
  entryPoints: [path.resolve(__dirname, '../../../src/sirius/siriusconfig.ts')],
  bundle: true,
  write: true,
  format: 'esm',
  outdir: __dirname
})


const siriusconfig = (await import(__dirname + "/siriusconfig.js")).default

function generatePrismaSchema(siriusconfig: SiriusConfig): string {
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
      prismaSchema += `  ${field.name} ${(field?.isCreatedAt || field?.isUpdatedAt) ? 'DateTime' : field.type}${field?.id ? ' @id @default(autoincrement())' : ''}${field?.unique ? ' @unique' : ''}${field?.isCreatedAt ? ' @default(now())' : ''}${field?.isUpdatedAt ? ' @updatedAt' : ''}
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

function generateRestApiRoutes(siriusconfig: SiriusConfig): void {
  for (const model of siriusconfig.models) {
    const folderPath = `src/routes/api/${model.name.toLowerCase()}`;
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath, { recursive: true });
    }

    const multiple_file = `
import { PrismaClient, type ${model.name} } from '@prisma/client';
import { json, type RequestEvent,error } from '@sveltejs/kit';

export async function POST({request}: RequestEvent) {
  const { items }: {items: ${model.name}[]} = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.${model.name.toLowerCase()}.createMany({
      data: items
    });

    return json({ query })
  } catch (errormsg) {
    throw error(400,{message: 'Error creating ${model.name}, ' + errormsg })
  }
}

export async function GET({request}: RequestEvent) {
  const where_query: ${model.name} = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.${model.name.toLowerCase()}.findMany({
      where: where_query
    });

    return json({ query })
  } catch (errormsg) {
    throw error(400,{message: 'Error finding ${model.name}, ' + errormsg })
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
import { json, type RequestEvent,error } from '@sveltejs/kit';

export async function POST({request}: RequestEvent) {
  const model: ${model.name} = await request.json();

  try {
    const prisma = new PrismaClient();
    const query = await prisma.${model.name.toLowerCase()}.create({
      data: model
    });

    return json({ query })
  } catch (errormsg) {
    throw error(400,{message: 'Error creating ${model.name}, ' + errormsg })
  }
}
`;

    writeFileSync(`${singleFolderPath}/+server.ts`, single_file);

  }
}

generateRestApiRoutes(siriusconfig)