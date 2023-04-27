import { writeFileSync } from 'fs';
import user from './models/user.js';
import post from './models/post.js';



function generatePrismaSchema(jsonSchema: JsonSchema): string {
  let prismaSchema = '';

  for (const model of jsonSchema.models) {
    prismaSchema += `model ${model.name} {
`;

    for (const field of model.fields) {
      prismaSchema += `  ${field.name} ${field.type} ${field?.id ? '@id' : ''}
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
writeFileSync('schema.prisma', prismaSchema);
