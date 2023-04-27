import { writeFileSync } from 'fs';
import user from './models/user.js';
import post from './models/post.js';
function generatePrismaSchema(jsonSchema) {
    var prismaSchema = '';
    for (var _i = 0, _a = jsonSchema.models; _i < _a.length; _i++) {
        var model = _a[_i];
        prismaSchema += "model ".concat(model.name, " {\n");
        for (var _b = 0, _c = model.fields; _b < _c.length; _b++) {
            var field = _c[_b];
            prismaSchema += "  ".concat(field.name, " ").concat(field.type, " ").concat((field === null || field === void 0 ? void 0 : field.id) ? '@id' : '', "\n");
        }
        prismaSchema += "}\n";
    }
    return prismaSchema;
}
var jsonSchema = {
    models: [
        user,
        post
    ]
};
var prismaSchema = generatePrismaSchema(jsonSchema);
writeFileSync('schema.prisma', prismaSchema);
//# sourceMappingURL=test.js.map