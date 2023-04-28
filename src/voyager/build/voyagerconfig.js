import post from "./models/post";
import user from "./models/user";
const voyagerconfig = {
    provider: "postgresql",
    url: "test",
    models: [
        user,
        post
    ],
};
export default voyagerconfig;
//# sourceMappingURL=voyagerconfig.js.map