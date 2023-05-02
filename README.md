# svelte-kit-cms

This is a CMS I am working on for sveltekit, simply define a json config and the prisma code will be automatically generated for you + endpoints.

## Creating the Config

create a siriusconfig.ts file in src/sirius of your sveltekit project, if you dont have the folder create it.

the types are exported (SiriusConfig type) from the package so make sure you export it to get type hinting and the structure

## Example Config

```ts
import post from "./models/post";
import user from "./models/user";
import copy from './models/copy';
import type { SiriusConfig } from "@tomdo1234/svelte-kit-cms";

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
```

provider: string is the db provider used for prisma
url: url string
models: is an array of models

## Example Model

```ts
import { Model } from "@tomdo1234/svelte-kit-cms";

const user: Model = {
    name: 'User',
    fields: [
      {
        name: 'id',
        type: 'Int',
        id: true
      },
      {
        name: 'name',
        type: 'String',
      },
      {
        name: 'email',
        type: 'String',
        unique: true
      },
    ],
  };
  
  export default user;
```

each model has a name: property (name of model in prisma)
fields is an array of the Field type which has a name of the column, its type and that is about it at the moment besides other special properties like id, unique 
and createdAt and updatedAt

## Generating the Code and Routes

after making your siriusconfig.ts, run 

```bash
npx siriusgenerate
```

and the prisma schema file + endpoitns and routes for your sveltekit app will be generated