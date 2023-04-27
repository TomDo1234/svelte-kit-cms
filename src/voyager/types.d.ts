interface Field {
    name: string;
    type: string;
    id?: boolean;
}
  
interface Model {
    name: string;
    fields: Field[];
}

interface JsonSchema {
    models: Model[];
}