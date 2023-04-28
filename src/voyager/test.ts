import { writeFileSync } from 'fs';
import user from './models/user';
import post from './models/post';
import config from './voyagerconfig';



function generatePrismaSchema(jsonSchema: JsonSchema): string {
  let prismaSchema = '';

  prismaSchema += `datasource db {
`;
  prismaSchema += `  provider = "${config.provider}"
`;
  prismaSchema += `  url = "${config.url}"
`;
  prismaSchema += `}
  
`;

  for (const model of jsonSchema.models) {
    prismaSchema += `model ${model.name} {
`;

    for (const field of model.fields) {
      prismaSchema += `  ${field.name} ${(field?.isCreatedAt || field?.isUpdatedAt) ? 'DateTime' : field.type}${field?.id ? ' @id' : ''}${field?.unique ? ' @unique': ''}${field?.isCreatedAt ? ' @default(now())': ''}${field?.isUpdatedAt ? ' @updatedAt': ''}
`;
    }

    prismaSchema += `}

`;
  }

  return prismaSchema;
}

const jsonSchema = {
  models: [
    user,
    post
  ],
};

const prismaSchema = generatePrismaSchema(jsonSchema);
writeFileSync('prisma/schema.prisma', prismaSchema);
