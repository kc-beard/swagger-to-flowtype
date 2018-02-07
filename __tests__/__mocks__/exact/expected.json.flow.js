// @flow
export type Pet = {| id: number |} & NewPet;
export type NewPet = {| name: string, tag: string, category: Category |};
export type ErrorModel = {| code: number, message: string |};
export type IGenericCollectionPet_ = {| items: Array<Pet> |};
export type IGenericCollectionString_ = {| items: Array<string> |};
