import post from "./models/post";
import user from "./models/user";

const siriusconfig: SiriusConfig = {
    provider: "postgresql",
    url: "test",
    models: [
      user,
      post
    ],
}

export default siriusconfig;