type FieldBase = {
    name: string,
    id?: boolean,
    unique?: boolean,
}

type FieldWithType = FieldBase & {
    type: "Int" | "String" | "DateTime" | "Boolean" | "Float" | "Decimal" | "BigInt" | "Bytes",
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

export type Field = FieldWithType | FieldWithCreatedAt | FieldWithUpdatedAt;
  
export type Model = {
    name: string,
    fields: Field[]
}

export type SiriusConfig = {
    provider: string,
    url: string,
    models: Model[]
}