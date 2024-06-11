export interface SchemaProp {
    [key: string]: SchemaProp
};

export default interface Schema {
    schema: string;
    locale_properties: SchemaProp;
};
