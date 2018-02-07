// @flow
export type Pet = { id: number } & NewPet;
export type NewPet = { name: string, tag?: string, category?: Category };
export type ErrorModel = { code: number, message: string };
export type IGenericCollection_Pet_ = { items?: Array<Pet> };
export type IGenericCollection_String_ = { items?: Array<string> };
