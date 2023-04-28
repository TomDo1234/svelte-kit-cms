import { writeFileSync } from 'fs';
import voyagerconfig from './voyagerconfig';



function generatePrismaSchema(voyagerconfig: VoyagerConfig): string {
  let prismaSchema = '';

  prismaSchema += `datasource db {
`;
  prismaSchema += `  provider = "${voyagerconfig.provider}"
`;
  prismaSchema += `  url = "${voyagerconfig.url}"
`;
  prismaSchema += `}

`;

  for (const model of voyagerconfig.models) {
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

const prismaSchema = generatePrismaSchema(voyagerconfig);
writeFileSync('prisma/schema.prisma', prismaSchema);

function generateRestApiRoutes(voyagerconfig: VoyagerConfig): void {

}
