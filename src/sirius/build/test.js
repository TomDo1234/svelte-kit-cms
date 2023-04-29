import { writeFileSync, existsSync, mkdirSync } from 'fs';
import siriusconfig from './siriusconfig';
import path from "path";
function generatePrismaSchema(siriusconfig) {
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
}
//# sourceMappingURL=test.js.map