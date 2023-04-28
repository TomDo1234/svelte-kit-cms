import post from "./models/post";
import user from "./models/user";
const siriusconfig = {
    provider: "postgresql",
    url: "test",
    models: [
        user,
        post
    ],
};
export default siriusconfig;
//# sourceMappingURL=siriusconfig.js.map