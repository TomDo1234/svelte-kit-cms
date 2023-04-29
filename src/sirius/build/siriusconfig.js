import post from "./models/post";
import user from "./models/user";
const siriusconfig = {
    provider: "postgresql",
    url: "postgresql://postgres:mysecretpassword@localhost:5432/mydatabase",
    models: [
        user,
        post
    ],
};
export default siriusconfig;
//# sourceMappingURL=siriusconfig.js.map