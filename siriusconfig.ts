import post from "./models/post";
import user from "./models/user";

const siriusconfig: SiriusConfig = {
    provider: "postgresql",
    url: "postgresql://postgres:mysecretpassword@localhost:5432/mydatabase",
    models: [
      user,
      post
    ],
}

export default siriusconfig;