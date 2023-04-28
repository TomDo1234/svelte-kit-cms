import { writeFileSync } from 'fs';
import siriusconfig from './siriusconfig';



function generatePrismaSchema(siriusconfig: SiriusConfig): string {
  let prismaSchema = '';

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
      prismaSchema += `  ${field.name} ${(field?.isCreatedAt || field?.isUpdatedAt) ? 'DateTime' : field.type}${field?.id ? ' @id' : ''}${field?.unique ? ' @unique': ''}${field?.isCreatedAt ? ' @default(now())': ''}${field?.isUpdatedAt ? ' @updatedAt': ''}
`;
    }

    prismaSchema += `}

`;
  }

  return prismaSchema;
}

const prismaSchema = generatePrismaSchema(siriusconfig);
writeFileSync('prisma/schema.prisma', prismaSchema);

function generateRestApiRoutes(siriusconfig: SiriusConfig): void {

}
