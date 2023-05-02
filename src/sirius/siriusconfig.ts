import post from "./models/post";
import user from "./models/user";
import copy from './models/copy';
import type { SiriusConfig } from "./types";

const siriusconfig: SiriusConfig = {
    provider: "postgresql",
    url: "postgresql://postgres:mysecretpassword@localhost:5432/mydatabase",
    models: [
      user,
      post,
      copy,
    ],
}

export default siriusconfig;