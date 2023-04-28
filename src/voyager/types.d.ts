type FieldBase = {
    name: string,
    id?: boolean,
    unique?: boolean,
}

type FieldWithType = FieldBase & {
    type: string,
    isCreatedAt?: false,
    isUpdatedAt?: false,
}

type FieldWithCreatedAt = FieldBase & {
    isCreatedAt: true,
    isUpdatedAt?: false,
    type?: never,
}

type FieldWithUpdatedAt = FieldBase & {
    isCreatedAt?: false,
    isUpdatedAt: true,
    type?: never,
}

type Field = FieldWithType | FieldWithCreatedAt | FieldWithUpdatedAt;

type TableConfig = {
    name: string
    fields: Field[]
}
  
type Model = {
    name: string,
    fields: Field[]
}

type JsonSchema = {
    models: Model[]
}

type VoyagerConfig = {
    provider: string,
    url: string
}