import post from "./models/post";
import user from "./models/user";

const voyagerconfig: VoyagerConfig = {
    provider: "postgresql",
    url: "test",
    models: [
      user,
      post
    ],
}

export default voyagerconfig;